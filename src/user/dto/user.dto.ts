import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '学生姓名' })
  username: string

  @ApiProperty({ description: '密码' })
  password: number
  
  @ApiProperty({ description: '校验密码' })
  confirmPassword: number
  
  @ApiProperty({ description: '学号' })
  studentNumber: string
  
  @ApiProperty({ description: '性别' })
  sex: string
  
  @ApiProperty({ description: '年级' })
  grade: number

  @ApiProperty({ description: '邮箱' })
  email: string
}

export class UserInfosDto {
  @ApiProperty({ description: '学生姓名' })
  username: string
  
  @ApiProperty({ description: '学号' })
  studentNumber: string
  
  @ApiProperty({ description: '性别' })
  sex: string

  @ApiProperty({ description: '年级' })
  grade: number

  @ApiProperty({ description: '邮箱' })
  email: string
}

export class LoginDto {
  @ApiProperty({ description: '学号' })
  studentNumber: number

  @ApiProperty({ description: '密码' })
  password: string
}


