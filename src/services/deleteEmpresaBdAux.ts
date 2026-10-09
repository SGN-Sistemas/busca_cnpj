import { empresaRepository } from '../typeorm/repository/empresaRepository'
export class DeleteEmpresaBdAux {
  async execute (emprCod: any): Promise<any> {
    await empresaRepository.delete({
      EMPR_COD: emprCod
    });
  }
}
