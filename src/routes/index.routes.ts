import express from 'express'
import { routerV1Gratis } from './v1Free/index.routes'
import { routerV1Pago } from './v1Paga/index.routes'
export const router = express.Router();
router.use('/v1Gratis', routerV1Gratis);
router.use('/v1Paga', routerV1Pago);
