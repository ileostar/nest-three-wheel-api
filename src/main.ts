import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('前端三轮考核接口')
    .setDescription('师弟师妹们加油🦆~~~')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  
  setupSwagger(app)
  await app.listen(3000)
}
bootstrap()
