import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import { ResponseData } from './response/ResponseFormat'

@ApiTags('欢迎进入环创三轮🎉')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello, I\'m LeoStar', description: '这是一个测试接口' })
  getHello() {
    const res = this.appService.getHello()
    return ResponseData.ok(res)
  }
}
