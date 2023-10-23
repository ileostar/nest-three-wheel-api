import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { APIResponse } from 'src/response/ApiResponse'
import { ResponseData } from 'src/response/ResponseFormat'
import { CreateUserDto, LoginDto, LoginRes, PagingUserData, UserInfosDto } from './dto/user.dto'
import { UserService } from './user.service'

@ApiTags('下面是需要用到的接口😀')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @APIResponse()
  @ApiOperation({ summary: '用于注册用户', description: '需要输入学生姓名、密码、确认密码、学号、性别、年级、邮箱' })
  async registerUser(@Body() CreateUserDto: CreateUserDto) {
    const res = await this.userService.createUser(CreateUserDto)
    if (res === '注册成功') 
      return ResponseData.ok(null, res) 
    else
      return ResponseData.fail(res, 40001)
  }

  @Post('login')
  @APIResponse(LoginRes)
  @ApiOperation({ summary: '用于登录', description: '使用学号和密码登录（返回的Token添加在请求头Header中）' })
  async loginUser(@Body() loginDto: LoginDto) {
    const res = await this.userService.login(loginDto)
    if (res === '用户不存在' || res === '密码不正确' || res === '密码格式不对') 
      return ResponseData.fail(res, 40001)
    else 
      return ResponseData.ok({ token: res }, '登陆成功')
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
  @ApiOperation({ summary: '查询所有学生信息', description: '这里需要做一个分页，请传入pageNum每页页数,pageCount当前页数' })
  @APIResponse(PagingUserData)
  async findAll(
    @Query('pageNum') pageNum: number,
    @Query('pageCount') pageCount: number,
  ): Promise<ResponseData<PagingUserData>> {
    const res = await this.userService.findAll(pageNum, pageCount)
    return ResponseData.ok(res, '查询成功')
  }

  @Get('findByStuNum')
  @ApiQuery({
    name: 'stuNum',
    description: '学号',
    required: true,
  })
  @APIResponse(UserInfosDto)
  @ApiOperation({ summary: '根据学号查找学生信息', description: '学号不会重复，所以只返回一条信息' })
  async findByStuNum(
    @Query('stuNum') stuNum: number,
  ) {
    const res = await this.userService.findByStuNum(stuNum)
    const dto = new UserInfosDto()
    if (res) {
      dto.email = res.email
      dto.stuNum = res.student_number
      dto.stuName = res.username
      dto.grade = res.grade
      dto.sex = res.sex
    }
    return ResponseData.ok(dto, '查询结果为空')
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
  @APIResponse(PagingUserData)
  @ApiOperation({ summary: '根据学生姓名查找学生信息', description: '姓名可能会有重复的，所以会有分页' })
  async findByStuName(
    @Query('stuName') username: string,
    @Query('pageNum') pageNum: number,
    @Query('pageCount') pageCount: number,
  ): Promise<ResponseData<PagingUserData>> {
    const res = await this.userService.findByName(username, pageNum, pageCount)
    return ResponseData.ok(res, '查询成功')
  }
}
