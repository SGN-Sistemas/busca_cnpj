import { AppDataSource } from '../index'
import { REL_EMPR_ATIV } from '../entities/rel_empresa_atividade'
export const relEmpresaAtividadeRepository = AppDataSource.getRepository(REL_EMPR_ATIV);
