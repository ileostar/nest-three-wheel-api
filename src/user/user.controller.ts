import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { APIResponse } from 'src/response/ApiResponse'
import { ResponseData } from 'src/response/ResponseFormat'
import { CreateUserDto, LoginDto, UserInfosDto } from './dto/user.dto'
import { UserService } from './user.service'
import { User } from './models/user.entity'

@ApiTags('下面是需要用到的接口😀')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @APIResponse(Boolean)
  @ApiOperation({ summary: '用于注册用户', description: '' })
  async registerUser(@Body() CreateUserDto: CreateUserDto) {
    return await this.userService.createUser(CreateUserDto)
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
  @APIResponse(UserInfosDto)
  @ApiOperation({ summary: '用于登录', description: '' })
  async loginUser(@Body() loginDto: LoginDto) {
    const isSuccessMeg = await this.userService.login(loginDto)
    return ResponseData.ok(isSuccessMeg, isSuccessMeg)
  }

  @Get('findAll')
  @ApiQuery({
    name: 'pageNum',
    description: '每页条数',
    required: true,
  })
  @ApiQuery({
    name: 'pageCount',
    description: '当前页数',
    required: true,
  })
  @ApiOperation({ summary: '查询所有学生信息', description: '' })
  @APIResponse([UserInfosDto])
  async findAll(
    @Query('pageNum') pageNum: number,
    @Query('pageCount') pageCount: number,
  ) {
    const res = await this.userService.findAll(pageNum, pageCount)
    return ResponseData.ok(res)
  }


  @Get('findByStuNum')
  @ApiParam({
    name: 'stuNum',
    description: '学号',
    required: true,
  })
  @APIResponse([UserInfosDto])
  @ApiOperation({ summary: '根据学号查找学生信息', description: '学号不会重复，所以只返回一条信息' })
  async findByStuNum(
    @Param('stuNum') stuNum: number,
  ) {
    const res = await this.userService.findByStuNum(stuNum)
    return ResponseData.ok(res)
  }

  @Get('findByStuName')
  @ApiQuery({
    name: 'stuName',
    description: '学生姓名',
    required: true,
  })
  @ApiQuery({
    name: 'pageNum',
    description: '每页条数',
    required: true,
  })
  @ApiQuery({
    name: 'pageCount',
    description: '当前页数',
    required: true,
  })
  @APIResponse([User])
  @ApiOperation({ summary: '根据学生姓名查找学生信息', description: '姓名可能会有重复的' })
  async findByStuName(
    @Query('stuName') username: string,
    @Query('pageNum') pageNum: number,
    @Query('pageCount') pageCount: number,
  ): Promise<ResponseData<User[]>> {
    const res = await this.userService.findByName(username, pageNum, pageCount)
    return ResponseData.ok(res)
  }
}
