import express from 'express'
import FornecedorControllers from '../../controllers/fornecedorControllers'
export const routerFornecedor = express.Router();
const fornecedorControllers = new FornecedorControllers();
routerFornecedor.get('/:cnpj/:banco', fornecedorControllers.add);
