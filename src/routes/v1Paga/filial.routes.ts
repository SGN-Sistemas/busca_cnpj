import express from 'express'
import FilialControllersPaid from '../../controllers/filialControllersPaid'
export const routerFilial = express.Router();
const filialControllers = new FilialControllersPaid();
routerFilial.get('/:cnpj/:banco/:emprCod', filialControllers.add);
