import { addFilial, nomeBanco } from '../queries'
import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class AddFilialService {
  async execute (banco: any, FILI_UNFE_SIGLA: any, FILI_EMPR_COD: any, FILI_NOME_FANTASIA: any, FILI_CGC: any, FILI_ENDERECO: any, FILI_CIDADE: any, FILI_TELEFONE: any, FILI_CEP: any, FILI_BAIRRO: any, FILI_EMAIL: any): Promise<any> {
    const FILI_COD = await empresaRepository.query(`SELECT ISNULL(MAX(FILI_COD + 1),0) as ID FROM ${nomeBanco(banco)}.[dbo].[FILIAL]`);
    const sql = addFilial(banco, FILI_COD[0].ID, FILI_UNFE_SIGLA, FILI_EMPR_COD, FILI_NOME_FANTASIA, FILI_CGC, FILI_ENDERECO, FILI_CIDADE, FILI_TELEFONE, FILI_CEP, FILI_BAIRRO, FILI_EMAIL);
    const execAddFilia = await empresaRepository.query(sql.sql, sql.params);
    return FILI_COD;
  }
}
