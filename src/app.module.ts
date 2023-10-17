 
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import loadConfig from './config/configurations'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
