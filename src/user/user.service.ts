import { Injectable } from '@nestjs/common'
import type { DeepPartial } from 'typeorm'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './models/user.entity'
import type { CreateUserDto, LoginDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  /**
   * 登陆
   * @param loginDto
   * @returns Promise<User>
   */
  async login(loginDto: LoginDto): Promise<string> {
    // 这里可以进行登录验证逻辑，比如检查数据库中的用户名和密码是否匹配
    // 如果验证通过，返回true，否则返回false
    if (loginDto.studentNumber.toString.length !== 11 || loginDto.password.toString.length < 8 || loginDto.password.toString.length > 16) 
      return '数据格式化有误'
    
    return '登陆成功'
  }

  /**
   * 创建用户
   * @param createUserDto 
   * @returns Promise<User>
   */
  createUser(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto

    const user = new User()
    user.username = username
    user.password = password
    user.email = email

    return this.UserRepository.save(user)
  }

  /**
   * 查找所有用户
   * @returns Promise<User>
   */
  async findAll(pageNum: number, pageCount: number): Promise<User[]> {
    const skip = (pageCount - 1) * pageNum
    const take = pageNum
    return this.UserRepository.find({
      take,
      skip,
    })
  }

  /**
   * 根据student_number查找用户
   * @param student_number
   * @returns Promise<User>
   */
  async findByStuNum(student_number: number): Promise<User> {

    const res = await this.UserRepository.findOne({
      where: {
        student_number,
      },
    })
    return res
  }

  /**
   * 根据username查找用户
   * @param username
   * @returns Promise<User>
   */
  async findByName(username: string, pageNum: number, pageCount: number): Promise<User[]> {
    const skip = (pageCount - 1) * pageNum
    const take = pageNum

    const users = await this.UserRepository.find({
      where: {
        username,
      },
      take,
      skip,
    })

    return users
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
