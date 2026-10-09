import { selectEmpresaEndereco } from '../queries'
import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class SearchEmpresaPejuFornService {
  async execute ({
    cnpj
  }: any): Promise<any> {
    const sql = selectEmpresaEndereco(cnpj);
    const empresaExists = await empresaRepository.query(sql.sql, sql.params);
    if (!empresaExists) {
      return 'Erro empresa não existe';
    }
    return empresaExists;
  }
}
