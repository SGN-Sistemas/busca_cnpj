import { AppDataSource } from '../index'
import { QUANTIDADE_PESQUISA } from '../entities/quantidade_consulta'
export const quantidadeConsultaRepository = AppDataSource.getRepository(QUANTIDADE_PESQUISA);
