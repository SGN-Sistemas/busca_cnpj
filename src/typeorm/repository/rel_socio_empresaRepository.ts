import { AppDataSource } from '../index'
import { REL_EMPR_SOCI } from '../entities/rel_socio_empresa'
export const relSocioEmpresaRepository = AppDataSource.getRepository(REL_EMPR_SOCI);
