import express from 'express'
import ClienteControllers from '../../controllers/clienteControllers'
export const routerCliente = express.Router();
const clienteControllers = new ClienteControllers();
routerCliente.get('/:cnpj/:banco', clienteControllers.add);
