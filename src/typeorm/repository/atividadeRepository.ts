import { AppDataSource } from '../index'
import { ATIVIDADE } from '../entities/ativdade'
export const atividadeRepository = AppDataSource.getRepository(ATIVIDADE);
