<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 项目描述

该项目是一个练手项目，使用[Nest](https://github.com/nestjs/nest)框架进行编写，这里因为采用的是serveless服务形式，使用的是vercel服务+远程数据库（阿里云/腾讯云数据库/[ElephantSQL
](https://www.elephantsql.com/)）的形式部署

## 安装

```bash
pnpm install
```

## 更换数据库

在`src/config/configurations.ts`下面更换数据库信息

这里使用了TypeORM，如果远程数据库没有这个表会自动创建，
但是得先要创建一个空的数据库

```typescript
function loadConfig() {
  return {
    db: {
      database: 'three-wheel',      // <-----必须先创建空的数据库three-wheel（也可以改成新的数据库名）
      // ...more
    },
  }
}

## 运行

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 测试

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

export default loadConfig

```

## 部署

```bash
$ vercel login # 登陆vercel

$ pnpm vercel # 部署到vercel

```
