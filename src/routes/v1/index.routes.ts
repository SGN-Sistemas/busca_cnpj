import express from 'express'
import { routerFornecedor } from './fornecedor.routes'
import { routerCliente } from './cliente.routes'
import { routerEmpresa } from './empresa.routes'
import { routerFilial } from './filial.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../swagger/swagger.json'
export const routerV1 = express.Router();
routerV1.get('', (req, res) => {
  res.status(200).json({
    message: 'Rota principal'
  });
});
routerV1.use('/fornecedor', routerFornecedor);
routerV1.use('/cliente', routerCliente);
routerV1.use('/empresa', routerEmpresa);
routerV1.use('/filial', routerFilial);
routerV1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
