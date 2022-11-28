/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../db'
import sql from 'mssql'
import { formatCep, formatCnpj } from '../utils'
import {
  insertEMPR,
  insertSocio,
  insertRelEMPRSocio,
  insertEndereco,
  insertAtividade,
  insertRelAtvEmpr,
  insertPessoaJuridica,
  insertFornedor
} from '../query'

async function execSQLQuery (
  fantasia: string,
  complemento: any,
  nome: string,
  telefone: string,
  email: string,
  atividades_secundarias: any,
  atividade_principal: any,
  qsa: any,
  situacao: any,
  bairro: any,
  logradouro: any,
  numero: any,
  cep: any,
  municipio: any,
  porte: string,
  natureza_juridica: string,
  uf: any,
  cnpj: string,
  ultima_atualizacao: string | number | Date,
  status: string,
  efr: any,
  motivo_situacao: string,
  situacao_especial: string,
  capital_social: string,
  tipo: string,
  abertura: string,
  res:any
) {
  const cnpjBanco = formatCnpj(cnpj)
  const cepBanco = formatCep(cep)
  const data = new Date(ultima_atualizacao)
  const dateFormat = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate()
  const sqlInsertEmpr = insertEMPR(
    nome,
    fantasia,
    cnpjBanco,
    tipo,
    abertura,
    telefone,
    email,
    motivo_situacao,
    porte,
    natureza_juridica,
    dateFormat,
    status,
    motivo_situacao,
    situacao_especial,
    capital_social
  )
  const connect = await sql.connect(config)
  connect.request()
    .query(`SELECT COUNT(EMPR_COD) as QUANTIDADE FROM EMPRESA WHERE EMPR_CNPJ = ${cnpjBanco}`)
    .then((resp) => {
      if (resp.recordset[0].QUANTIDADE > 0) {
        res.status(400).send({ message: 0 })
      } else {
        connect.request()
          .query(sqlInsertEmpr)
          .then(async (response: any) => {
            const idEmpr = response.recordset[0].ID
            console.log('Inserio o empresa')
            const sqlInsertEndereco = insertEndereco(
              complemento,
              bairro,
              logradouro,
              municipio,
              uf,
              numero,
              cepBanco,
              idEmpr
            )
            connect.request()
              .query(sqlInsertEndereco)
              .then(async (response: any) => {
                console.log('Inserio o endereco')
              })
              .catch(() => { res.send({ message: '0' }) })
            if (atividade_principal.length > 0) {
              atividade_principal.forEach(async (element) => {
                const sqlInsertAtividade = insertAtividade(
                  element.text,
                  element.code,
                  'P'
                )
                connect.request()
                  .query(sqlInsertAtividade)
                  .then(async (response1: any) => {
                    console.log('Inserio o atividade principal')
                    const idAtvP = response1.recordset[0].ID
                    const sqlSnsertRelAtvEmpr = insertRelAtvEmpr(idEmpr, idAtvP)
                    connect.request()
                      .query(sqlSnsertRelAtvEmpr)
                      .then((resp) => {
                        console.log('Inserio o rel atividade principal empresa')
                      })
                      .catch(() => { res.send({ message: '0' }) })
                  })
              })
            }
            if (atividades_secundarias.length > 0) {
              atividades_secundarias.forEach(async (element) => {
                const sqlInsertAtividade = insertAtividade(
                  element.text,
                  element.code,
                  'S'
                )
                connect.request()
                  .query(sqlInsertAtividade)
                  .then(async (response1: any) => {
                    console.log('Inserio o atividade secundaria')
                    const idAtvS = response1.recordset[0].ID
                    const sqlSnsertRelAtvEmpr = insertRelAtvEmpr(idEmpr, idAtvS)
                    connect.request()
                      .query(sqlSnsertRelAtvEmpr)
                      .then((resp) => {
                        console.log('Inserio o rel atividade secundaria empresa')
                      })
                      .catch(() => { res.send({ message: '0' }) })
                  })
              })
            }
            if (qsa.length > 0) {
              qsa.forEach(async (element) => {
                const sqlInserSocio = insertSocio(element.nome, element.qual)
                connect.request()
                  .query(sqlInserSocio)
                  .then((response1: any) => {
                    console.log('Inserio os socios')
                    const idSocio = response1.recordset[0].ID
                    const sqlRelEmprSocio = insertRelEMPRSocio(idSocio, idEmpr)
                    connect.request()
                      .query(sqlRelEmprSocio)
                      .then(() => {
                        console.log('Inserio o rel de socio empresa')
                      })
                  })
                  .catch(() => { res.send({ message: '0' }) })
              })
            }
            connect.request()
              .query('SELECT MAX(PEJU_COD + 1) as ID FROM LEAO.dbo.PESSOA_JURIDICA')
              .then((resp: any) => {
                const idPEJU = resp.recordset[0].ID
                const sqlInsertPessoaJuridica = insertPessoaJuridica(
                  idPEJU,
                  cnpjBanco,
                  email,
                  uf,
                  municipio,
                  nome,
                  fantasia,
                  telefone,
                  logradouro + ' ' + numero + ' ' + complemento,
                  cepBanco,
                  bairro
                )
                connect.request()
                  .query(sqlInsertPessoaJuridica)
                  .then((resp) => {
                    console.log('Pessoa juridica inserido')
                    connect.request()
                      .query('SELECT MAX(FORN_COD + 1) as ID FROM LEAO.dbo.FORNECEDOR')
                      .then(async (resp) => {
                        const fornCod = resp.recordset[0].ID
                        const sqlInsertFornedor = insertFornedor(
                          nome,
                          fornCod,
                          idPEJU
                        )
                        connect.request()
                          .query(sqlInsertFornedor)
                          .then(async (resp) => {
                            const codigoForn = await resp.recordset[0].ID

                            res.status(200).send({ message: codigoForn })
                          })
                          .catch(() => { res.send({ message: '0' }) })
                      })
                      .catch(() => { res.send({ message: '0' }) })
                  })
                  .catch(() => { res.send({ message: '0' }) })
              })
              .catch(() => { res.send({ message: '0' }) })
          })
          .catch(() => { res.send({ message: '0' }) })
      }
    })
    .catch(() => { res.send({ message: '0' }) })
}

export default execSQLQuery
