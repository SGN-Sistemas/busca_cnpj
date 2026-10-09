import { addCliente, nomeBanco } from '../queries'
import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class AddClienteService {
  async execute (CLIE_TIPO_COD: any, CLIE_NOME: any, banco: any): Promise<any> {
    const CLIE_COD = await empresaRepository.query(`SELECT ISNULL(MAX(CLIE_COD + 1),0) as ID FROM ${nomeBanco(banco)}.[dbo].[CLIENTE] `);
    const sql = addCliente(CLIE_TIPO_COD, CLIE_NOME, CLIE_COD[0].ID, banco);
    const addClie = await empresaRepository.query(sql.sql, sql.params);
    return CLIE_COD;
  }
}
