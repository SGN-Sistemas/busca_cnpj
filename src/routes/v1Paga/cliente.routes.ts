import express from 'express'
import ClienteControllersPaid from '../../controllers/clienteControllersPaid'
export const routerCliente = express.Router();
const clienteControllersPaid = new ClienteControllersPaid();
routerCliente.get('/:cnpj/:banco', clienteControllersPaid.add);
