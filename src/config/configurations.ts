function loadConfig() {
  // eslint-disable-next-line n/prefer-global/process
  const { env } = process

  return {
    db: {
      database: 'three-wheel',
      host: 'rm-cn-9lb3fu86r000zd1o.rwlb.rds.aliyuncs.com',
      port: Number.parseInt(env.TYPEORM_PORT, 10) || 3306,
      username:'liuxingyu',
      password: 'Liu20020820',
    },
  }
}

export default loadConfig
