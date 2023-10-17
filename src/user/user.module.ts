import { ConsoleLogger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { UserController } from './user.controller'
import { User } from './models/user.entity'
import { UserService } from './user.service'
import { jwtConstants } from './constants'

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn },
  })],
  controllers: [UserController],
  providers: [UserService, ConsoleLogger, UserService],
  exports: [UserService],
})
export class UserModule {}
