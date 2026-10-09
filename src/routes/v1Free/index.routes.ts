import express from 'express'
import { routerFornecedor } from './fornecedor.routes'
import { routerCliente } from './cliente.routes'
import { routerEmpresa } from './empresa.routes'
import { routerFilial } from './filial.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../swagger/swagger.json'
export const routerV1Gratis = express.Router();
routerV1Gratis.get('', (req, res) => {
  res.status(200).json({
    message: 'Rota principal'
  });
});
routerV1Gratis.use('/fornecedor', routerFornecedor);
routerV1Gratis.use('/cliente', routerCliente);
routerV1Gratis.use('/empresa', routerEmpresa);
routerV1Gratis.use('/filial', routerFilial);
routerV1Gratis.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
