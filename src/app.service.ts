import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi, I\'m LeoStar, Welcome to the third round of hclab assessment'
  }
}
