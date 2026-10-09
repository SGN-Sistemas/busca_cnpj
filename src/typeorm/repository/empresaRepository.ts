import { AppDataSource } from '../index'
import { EMPRESA } from '../entities/empresa'
export const empresaRepository = AppDataSource.getRepository(EMPRESA);
