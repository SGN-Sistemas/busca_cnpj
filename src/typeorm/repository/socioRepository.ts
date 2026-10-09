import { AppDataSource } from '../index'
import { SOCIOS } from '../entities/socio'
export const socioRepository = AppDataSource.getRepository(SOCIOS);
