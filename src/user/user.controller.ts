import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/user.dto'
import { UserService } from './user.service'
import { User } from './models/user.entity'

@ApiTags('下面是需要用到的接口😀')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({ type: User })
  @ApiResponse({ type: Boolean })
  @ApiOperation({ summary: '用于注册用户', description: '' })
  async registerUser(@Body() User: User) {
    return await this.userService.createUser(User)
  }

  @Post('login')
  @ApiParam({
    name: 'student_number',
    description: '学号',
    required: true,
  })
  @ApiParam({
    name: 'password',
    description: '密码',
    required: true,
  })
  @ApiResponse({ type: User })
  @ApiOperation({ summary: '用于登录', description: '' })
  loginUser() {
    return '111'
  }

  @Get('findByStuNum')
  @ApiParam({
    name: 'student_number',
    description: '学号',
    required: true,
  })
  @ApiParam({
    name: 'pageNum',
    description: '每页条数',
    required: true,
  })
  @ApiParam({
    name: 'pageCount',
    description: '当前页数',
    required: true,
  })
  @ApiResponse({ type: Array<User> })
  @ApiOperation({ summary: '根据学号查找学生信息', description: '' })
  findByStuNum() {
    return 'createUserDto'
  }

  @Get('findByName')
  @ApiParam({
    name: 'username',
    description: '学生姓名',
    required: true,
  })
  @ApiParam({
    name: 'pageNum',
    description: '每页条数',
    required: true,
  })
  @ApiParam({
    name: 'pageCount',
    description: '当前页数',
    required: true,
  })
  @ApiResponse({ type: Array<User> })
  @ApiOperation({ summary: '根据学生姓名查找学生信息', description: '' })
  findByName() {
    return 'createUserDto'
  }

}
