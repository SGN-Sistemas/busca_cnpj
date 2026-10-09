import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class SearchEmpresaAuxService {
  async execute ({
    EMPR_CNPJ
  }: any): Promise<any> {
    const empresaExists = await empresaRepository.findOneBy({
      EMPR_CNPJ
    });
    if (empresaExists) {
      return true;
    }
    return false;
  }
}
