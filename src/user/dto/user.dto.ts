import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '学生姓名' })
  stuName: string

  @ApiProperty({ description: '密码' })
  password: string
  
  @ApiProperty({ description: '校验密码' })
  confirmPassword: string
  
  @ApiProperty({ description: '学号' })
  stuNum: number
  
  @ApiProperty({ description: '性别' })
  sex: string
  
  @ApiProperty({ description: '年级' })
  grade: number

  @ApiProperty({ description: '邮箱' })
  email: string
}

export class UserInfosDto {
  @ApiProperty({ description: '学生姓名' })
  stuName: string
  
  @ApiProperty({ description: '学号' })
  stuNum: number
  
  @ApiProperty({ description: '性别' })
  sex: string

  @ApiProperty({ description: '年级' })
  grade: number

  @ApiProperty({ description: '邮箱' })
  email: string
}

export class LoginDto {
  @ApiProperty({ description: '学号' })
  stuNum: number

  @ApiProperty({ description: '密码' })
  password: string
}

export class LoginRes {
  @ApiProperty({ description: '认证Token' })
  token: string
}
