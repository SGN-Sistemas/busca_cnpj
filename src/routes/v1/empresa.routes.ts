import express from 'express'
import EmpresaControllers from '../../controllers/empresaControllers'
export const routerEmpresa = express.Router();
const empresaControllers = new EmpresaControllers();
routerEmpresa.get('/:cnpj/:banco', empresaControllers.add);
