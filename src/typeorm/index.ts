import { DataSource } from 'typeorm'
import 'reflect-metadata'
import dotenv from 'dotenv'
/* eslint-disable n/no-path-concat */

dotenv.config({
  path: __dirname + '/../../.env'
});
export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.SERVER + '',
  username: process.env.USER_NAMES + '',
  password: process.env.PASSWORDS + '',
  database: process.env.DATABASE + '',
  synchronize: true,
  logging: false,
  extra: {
    encrypt: false,
    trustServerCertificate: false
  },
  entities: [__dirname + '/entities/*.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}']
});
