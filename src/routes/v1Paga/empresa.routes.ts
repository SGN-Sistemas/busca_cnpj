import express from 'express'
import EmpresaControllersPaid from '../../controllers/empresaControllersPaid'
export const routerEmpresa = express.Router();
const empresaControllers = new EmpresaControllersPaid();
routerEmpresa.get('/:cnpj/:banco', empresaControllers.add);
