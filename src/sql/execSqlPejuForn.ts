import config from '../db'
import sql from 'mssql'
import { Response } from 'express-serve-static-core'
import { selectEmpresaEndereco, insertPessoaJuridica, insertFornedor } from '../query'
const execSqlPejuForn = async (
    res: Response,
    cnpj: string,
    banco : string
) => {
    const query = selectEmpresaEndereco(cnpj)
    const connect = await sql.connect(config)
    connect.request()
        .query(query)
        .then((resp) => {
            const EMPR_CNPJ = resp.recordset[0].EMPR_CNPJ
            const EMPR_EMAIL = resp.recordset[0].EMPR_EMAIL
            const ENDE_UF = resp.recordset[0].ENDE_UF
            const ENDE_MUNICIPIO = resp.recordset[0].ENDE_MUNICIPIO
            const EMPR_RAZAO_SOCIAL = resp.recordset[0].EMPR_RAZAO_SOCIAL
            const EMPR_FANTASIA = resp.recordset[0].EMPR_FANTASIA
            const EMPR_TELEFONE = resp.recordset[0].EMPR_TELEFONE
            const ENDE_COMPLEMENTO = resp.recordset[0].ENDE_COMPLEMENTO
            const ENDE_CEP = resp.recordset[0].ENDE_CEP
            const ENDE_BAIRRO = resp.recordset[0].ENDE_BAIRRO
            connect.request()
                .query('SELECT MAX(PEJU_COD + 1) as ID FROM LEAO.dbo.PESSOA_JURIDICA')
                .then((resp2: any) => {
                    const PEJU_COD = resp2.recordset[0].ID
                    
                    const queryInsertPeju = insertPessoaJuridica(
                        PEJU_COD,
                        EMPR_CNPJ,
                        EMPR_EMAIL,
                        ENDE_UF,
                        ENDE_MUNICIPIO,
                        EMPR_RAZAO_SOCIAL,
                        EMPR_FANTASIA,
                        EMPR_TELEFONE,
                        ENDE_COMPLEMENTO,
                        ENDE_CEP,
                        ENDE_BAIRRO,
                        banco
                    );

                    connect.request()
                        .query(queryInsertPeju)
                        .then((resp2: any) => {
                            connect.request()
                                .query('SELECT MAX(FORN_COD + 1) as ID FROM LEAO.dbo.FORNECEDOR')
                                .then((resp3) => { 
                                    const FORN_COD = resp3.recordset[0].ID
                                    const queryFornecedor = insertFornedor(
                                        EMPR_RAZAO_SOCIAL,
                                        FORN_COD,
                                        PEJU_COD,
                                        banco
                                    )
                                    connect.request()
                                        .query(queryFornecedor)
                                        .then((resp3) => {
                                            res.status(200).send({ message: FORN_COD })
                                        })
                                        .catch(() => {
                                            res.status(400).json({ message: 'Erro ao inserir fornecedor' })
                                        })
                                    
                                })
                                .catch(() => {
                                    res.status(400).json({ message: 'Erro em fornecedor' })
                                })
                         })
                        .catch(() => {
                            res.status(400).json({ message: 'Erro ao inserir pessoa juridica' })
                        })
                })
                .catch(() => {
                    res.status(400).json({ message: 'Erro em pessoa juridica' })
                })

        })
        .catch((err) => {
            console.log(query)
            res.status(400).json({ message: err })
        })
}

export default execSqlPejuForn
