import dotenv from 'dotenv'

dotenv.config()

const config = {

  server: process.env.SERVER,
  user: process.env.USERTESTE,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  trustServerCertificate: true,
  encrypt: false

}

export default config
