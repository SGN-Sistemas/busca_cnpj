import config from '../db'
import sql from 'mssql'
import { Response } from 'express-serve-static-core'

const execTeste = async (
  res: Response<any, Record<string, any>, number>
) => {
  const connect = await sql.connect(config)
  connect.request()
    .query('SELECT MAX(FORN_COD + 1) as ID FROM [LEAO].[dbo].[FORNECEDOR]')
    .then((resp) => {
      resp.status(200).send({ message: resp.recprdset[0].ID })
    })
    .catch((err) => {
      res.status(err.response.statusCode).send({ message: err.response.message })
    })
}

export default execTeste
