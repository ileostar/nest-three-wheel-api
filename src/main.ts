import { join } from 'node:path'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('前端三轮考核接口')
    .setContact('考核题目链接☛', 'https://dkmjddbh0f.feishu.cn/docx/T7IAdyWpho6ZUhxkSuqciIj1nKQ?from=from_copylink', null)
    .setDescription('师弟师妹们加油🦆~~~')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'LeoStar',
    customfavIcon: 'https://avatars.githubusercontent.com/u/108746194?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  })
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })
  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content-Range',
    credentials: true,
    maxAge: 3600,
  })
  
  setupSwagger(app)

  // 配置静态文件中间件
  app.useStaticAssets(join(__dirname, '..', 'public'))

  await app.listen(3000)
}
bootstrap()
