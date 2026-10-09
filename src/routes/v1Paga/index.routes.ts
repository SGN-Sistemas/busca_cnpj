import express from 'express'
import { routerFornecedor } from './fornecedor.routes'
import { routerCliente } from './cliente.routes'
import { routerEmpresa } from './empresa.routes'
import { routerFilial } from './filial.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../swagger/swagger.json'
export const routerV1Pago = express.Router();
routerV1Pago.get('', (req, res) => {
  res.status(200).json({
    message: 'Rota principal'
  });
});
routerV1Pago.use('/fornecedor', routerFornecedor);
routerV1Pago.use('/cliente', routerCliente);
routerV1Pago.use('/empresa', routerEmpresa);
routerV1Pago.use('/filial', routerFilial);
routerV1Pago.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
