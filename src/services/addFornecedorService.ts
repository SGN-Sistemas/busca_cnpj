import { insertFornedor, nomeBanco } from '../queries'
import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class AddFornService {
  async execute (FORN_NOME: any, FORN_TIPO_COD: any, banco: any): Promise<any> {
    const FORN_COD = await empresaRepository.query(`SELECT ISNULL(MAX(FORN_COD + 1),0) as ID FROM ${nomeBanco(banco)}.[dbo].[FORNECEDOR] `);
    const sql = insertFornedor(FORN_NOME, FORN_COD[0].ID, FORN_TIPO_COD, banco);
    const addPEJU = await empresaRepository.query(sql.sql, sql.params);
    return FORN_COD;
  }
}
