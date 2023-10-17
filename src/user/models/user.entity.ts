import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { bcrypt } from 'bcryptjs'

@Entity('user')
export class User {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    comment: '学生姓名',
    length: 100,
    default: '',
  })
  @IsNotEmpty()
  username: string

  @Column({
    comment: '学号',
  })
  student_number: number

  @Column({
    comment: '密码',
  })
  password: number

  @Column({
    comment: '邮箱',
    length: 100,
    default: '',
  })
  email: string

  @Column({
    comment: '性别',
    length: 2,
    default: '男',
  })
  sex: string

  @Column({
    comment: '年级',
  })
  grade: number

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date

  /**
   * 插入密码前加密
   * @return {void} 
   */
  @BeforeInsert() 
  async encryptPwd() { 
    this.password = await bcrypt.hashSync(this.password)
  } 
}
