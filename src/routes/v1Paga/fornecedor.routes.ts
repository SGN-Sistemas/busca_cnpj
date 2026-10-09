import express from 'express'
import FornecedorControllersPaid from '../../controllers/fornecedorControllersPaid'
export const routerFornecedor = express.Router();
const fornecedorControllers = new FornecedorControllersPaid();
routerFornecedor.get('/:cnpj/:banco', fornecedorControllers.add);
