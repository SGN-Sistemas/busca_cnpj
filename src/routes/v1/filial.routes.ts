import express from 'express'
import FilialControllers from '../../controllers/filialControllers'
export const routerFilial = express.Router();
const filialControllers = new FilialControllers();
routerFilial.get('/:cnpj/:banco/:emprCod', filialControllers.add);
