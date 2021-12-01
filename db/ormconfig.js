module.exports = {
  type: 'sqlite',
  synchronize: true,
  database: 'cache/laureate.sqlite',
  entities: ['./entities/*.entity.ts'],
  migrations: ['./migrations/*.ts'],
  logging: true,
  cli: {
    entitiesDir: './entities',
    migrationsDir: './migrations',
  },
}
