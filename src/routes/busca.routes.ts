/* eslint-disable camelcase */
import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import execSQLQuery from '../sql/execSqlQuery'
import config from '../db'
import sql from 'mssql'
import execSqlPejuForn from '../sql/execSqlPejuForn'
dotenv.config()

const Router = express.Router()

Router.get('/:cnpj/:banco', async (req, res) => {
  const { cnpj, banco } = req.params

  const options = {
    method: 'GET',
    url: `https://receitaws.com.br/v1/cnpj/${cnpj}`,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const connect = await sql.connect(config)

  connect.request()
    .query(`SELECT COUNT(EMPR_COD) as QUANTIDADE FROM EMPRESA WHERE EMPR_CNPJ = '${cnpj}'`)
    .then((resp) => {
      if (resp.recordset[0].QUANTIDADE > 0) {

        execSqlPejuForn(res, cnpj, banco)
      }
      else {
        axios.request(options)
          .then(async (response) => {
            const
              {
                fantasia,
                complemento,
                nome,
                telefone,
                email,
                atividades_secundarias,
                atividade_principal,
                qsa,
                situacao,
                bairro,
                logradouro,
                numero,
                cep,
                municipio,
                porte,
                natureza_juridica,
                uf,
                cnpj,
                ultima_atualizacao,
                status,
                efr,
                motivo_situacao,
                situacao_especial,
                capital_social,
                tipo,
                abertura
              } = response.data

            execSQLQuery(
              fantasia,
              complemento,
              nome,
              telefone,
              email,
              atividades_secundarias,
              atividade_principal,
              qsa,
              situacao,
              bairro,
              logradouro,
              numero,
              cep,
              municipio,
              porte,
              natureza_juridica,
              uf,
              cnpj,
              ultima_atualizacao,
              status,
              efr,
              motivo_situacao,
              situacao_especial,
              capital_social,
              tipo,
              abertura,
              res,
              banco
            )
          }).catch((error) => {
            console.log(error)
            if (error.response.status === 429) {
              res.status(429).send({ message: error.response.statusText, status: error.response.status, error: true })
            } else {
              res.status(400).send({ message: 'Erro desconhecido' })
            }
          })
      }
    })
})

export default Router
