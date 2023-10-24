import { Injectable } from '@nestjs/common'
import type { DeepPartial } from 'typeorm'
import { Repository, getRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { User } from './models/user.entity'
import { UserInfosDto } from './dto/user.dto'
import type { CreateUserDto, LoginDto, PagingUserData } from './dto/user.dto'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
    private readonly JwtService: JwtService,
  ) {}

  /**
   * 登陆
   * @param loginDto
   * @returns Promise<User>
   */
  async login(loginDto: LoginDto): Promise<string> {
    if (loginDto.password.length < 8 || loginDto.password.length > 16) 
      return '密码格式不对'
    const findUser = await this.UserRepository.findOne({
      where: { student_number: loginDto.stuNum },
    })
    // 没有找到
    if (!findUser) 
      return '用户不存在'

    // 找到了对比密码
    const compareRes: boolean = bcrypt.compareSync(loginDto.password, findUser.password)
    // 密码不正确
    if (!compareRes) 
      return '密码不正确'
    const payload = { username: findUser.username }

    return this.JwtService.sign(payload)

  }

  /**
   * 创建用户
   * @param createUserDto 
   * @returns Promise<User>
   */
  async createUser(createUserDto: CreateUserDto) {
    const findUser = await this.UserRepository.findOne({
      where: { username: createUserDto.stuName },
    })
    const findUser2 = await this.UserRepository.findOne({
      where: { student_number: createUserDto.stuNum },
    })
    if (findUser && findUser.username === createUserDto.stuName) 
      return '用户已存在'
    if (findUser2 && Number(findUser2.student_number) === createUserDto.stuNum) 
      return '学号已存在'
    if (createUserDto.stuName.length > 11 || createUserDto.stuName.length < 1) 
      return '姓名格式不对'
    if (createUserDto.password !== createUserDto.confirmPassword) 
      return '两次密码不一致'
    if (Object.is(createUserDto.stuNum.toLocaleString.length, 11)) 
      return '学号格式不对'
    if (createUserDto.password.length < 8 || createUserDto.password.length > 16) 
      return '密码格式不对'

    // 对密码进行加密处理
    const { stuName, password, email, stuNum, sex, grade } = createUserDto

    const user = new User()
    user.username = stuName
    user.email = email
    user.student_number = stuNum
    user.sex = sex
    user.grade = grade
    user.password = password
    await this.UserRepository.save(user)
    return '注册成功'
  }

  /**
   * 查找所有用户（分页版）
   * @returns Promise<User>
   */
  async findAllPaging(pageNum: number, pageCount: number): Promise<PagingUserData | null> {
    const skip = (pageCount - 1) * pageNum
    const take = pageNum

    const [resData, totalCount] = await Promise.all([
      this.UserRepository.find({
        take,
        skip,
      }),
      this.UserRepository.count(),
    ])

    if (resData.length === 0) 
      return null
    
    const usersData = resData.map((result) => {
      const dto = new UserInfosDto()
      dto.email = result.email
      dto.stuNum = result.student_number
      dto.stuName = result.username
      dto.grade = result.grade
      dto.sex = result.sex
      return dto
    })
    const pageTotals = Math.ceil(totalCount / pageNum)
    
    return { 
      usersData,
      pageTotals,
      totalCount,
      pageNum,
      pageCount,
    }
  }

  
  /**
   * 查找所有用户
   * @returns Promise<User>
   */
  async findAll(): Promise<Array<UserInfosDto>> {
    const resData = await this.UserRepository.find()

    const usersData = resData.map((result) => {
      const dto = new UserInfosDto()
      dto.email = result.email
      dto.stuNum = result.student_number
      dto.stuName = result.username
      dto.grade = result.grade
      dto.sex = result.sex
      return dto
    })
    
    return usersData
  }

  /**
   * 根据student_number查找用户
   * @param student_number
   * @returns Promise<User>
   */
  async findByStuNum(student_number: number): Promise<User | null> {

    const res = await this.UserRepository.findOne({
      where: {
        student_number,
      },
    })
  
    if (!res) 
      return null
    
    
    return res
  }

  /**
   * 根据username查找用户
   * @param username
   * @returns Promise<User>
   */
  async findByName(username: string, pageNum: number, pageCount: number): Promise<PagingUserData | null> {
    const skip = (pageCount - 1) * pageNum
    const take = pageNum

    const [resData, totalCount] = await Promise.all([
      this.UserRepository.find({
        where: {
          username,
        },
        take,
        skip,
      }),
      this.UserRepository.count({
        where: {
          username,
        },
      }),
    ])

    const usersData = resData.map((result) => {
      const dto = new UserInfosDto()
      dto.email = result.email
      dto.stuNum = result.student_number
      dto.stuName = result.username
      dto.grade = result.grade
      dto.sex = result.sex
      return dto
    })
    
    const pageTotals = Math.ceil(totalCount / pageNum)

    return { 
      usersData, 
      pageTotals,
      totalCount,
      pageNum,
      pageCount,
    }
  }

  /**
   * 根据student_number删除用户
   * @param student_number 
   * @returns Promise<User>
   */
  async delUser(student_number: number): Promise<boolean> {
    const res = await this.UserRepository.delete(student_number)
    if (res.affected > 0) 
      return true

    return false
  }
  
  /**
   * 修改用户
   * @param student_number 
   * @returns Promise<User>
   */
  async updateUser(student_number: number, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.UserRepository.update(student_number, entity)
    if (res.affected > 0) 
      return true
    
    return false
  }
}
