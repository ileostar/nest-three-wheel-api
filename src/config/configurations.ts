function loadConfig() {
  // eslint-disable-next-line n/prefer-global/process
  const { env } = process

  return {
    db: {
      database: env.TYPEORM_DATABASE,
      host: env.TYPEORM_HOST,
      port: Number.parseInt(env.TYPEORM_PORT, 10) || 3306,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
    },
  }
}

export default loadConfig
