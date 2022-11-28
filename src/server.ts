import express from 'express'
import dotenv from 'dotenv'
import cnpjRoutes from './routes/busca.routes'
import config from './db'
import sql from 'mssql'

dotenv.config()

sql.connect(config)
  .then(
    (conn: any) => {
      // eslint-disable-next-line no-return-assign
      return global.conn = conn
    }
  )
  .catch(
    (err: any) => {
      console.log(err)
    }
  )
const port = process.env.PORT

const app = express()

app.use('/buscaCNPJ', cnpjRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
