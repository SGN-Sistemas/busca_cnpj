import { AppDataSource } from '../index'
import { ENDERECO } from '../entities/endereco'
export const enderecoRepository = AppDataSource.getRepository(ENDERECO);
