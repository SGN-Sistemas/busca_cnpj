import { insertPessoaJuridica } from '../queries'
import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class AddPejuService {
  async execute (PEJU_CGC: any, PEJU_EMAIL: any, PEJU_UNFE_SIGLA: any, PEJU_CIDADE: any, PEJU_RAZAO_SOCIAL: any, PEJU_NOME_FANTASIA: any, PEJU_TEL: any, PEJU_END: any, PEJU_CEP: any, PEJU_BAIRRO: any, banco: any): Promise<any> {
    const PEJU_COD = await empresaRepository.query(`SELECT ISNULL(MAX(PEJU_COD + 1),0) as ID FROM [${banco}].[dbo].[PESSOA_JURIDICA] `);
    const sql = insertPessoaJuridica(PEJU_COD[0].ID, PEJU_CGC, PEJU_EMAIL, PEJU_UNFE_SIGLA, PEJU_CIDADE, PEJU_RAZAO_SOCIAL, PEJU_NOME_FANTASIA, PEJU_TEL, PEJU_END, PEJU_CEP, PEJU_BAIRRO, banco);
    await empresaRepository.query(sql);
    return PEJU_COD;
  }
}
