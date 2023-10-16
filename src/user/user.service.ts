import { Injectable } from '@nestjs/common'
import type { DeepPartial } from 'typeorm'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './models/user.entity'
import type { CreateUserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  /**
   * 创建用户
   * @param createUserDto 
   * @returns Promise<User>
   */
  async createUser(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto

    const user = new User()
    user.username = username
    user.password = password
    user.email = email

    return this.UserRepository.save(user)
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
  async findByName(username: string): Promise<User> {
    const res = await this.UserRepository.findOne({
      where: {
        username,
      },
    })
    return res
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
