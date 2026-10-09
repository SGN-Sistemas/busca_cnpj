import { addEmpresa } from '../queries'
import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class AddEmpresaService {
  async execute (banco: any, EMPR_NOME: any, EMPR_FONE: any, EMPR_BAIRRO: any, EMPR_UNFE_SIGLA: any, EMPR_END: any, EMPR_CIDADE: any, EMPR_CGC: any, EMPR_CEP: any, EMPR_EMAIL: any): Promise<any> {
    const EMPR_COD = await empresaRepository.query(`SELECT ISNULL(MAX(EMPR_COD + 1),0) as ID FROM [${banco}].[dbo].[EMPRESA]`);
    const sql = addEmpresa(banco, EMPR_COD[0].ID, EMPR_NOME, EMPR_FONE, EMPR_BAIRRO, EMPR_UNFE_SIGLA, EMPR_END, EMPR_CIDADE, EMPR_CGC, EMPR_CEP, EMPR_EMAIL);
    const execAddEmpresa = await empresaRepository.query(sql);
    return EMPR_COD;
  }
}
