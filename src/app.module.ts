/* eslint-disable n/prefer-global/process */
 
import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import loadConfig from './config/configurations'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    ConfigModule.forRoot({
      load: [loadConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host, port, username, password, database } =
          configService.get('db')
  
        return {
          type: 'mysql',
          // .env 获取
          host,
          port,
          username,
          password,
          database,
          // entities
          // eslint-disable-next-line n/no-path-concat
          entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
          synchronize: true,
          autoLoadEntities: true,
        }
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
