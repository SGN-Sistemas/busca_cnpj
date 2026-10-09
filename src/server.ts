import 'reflect-metadata'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { AppDataSource } from './typeorm/index'
import AppError from './errors/AppError'
import dotenv from 'dotenv'
import { router } from './routes/index.routes'
/* eslint-disable @typescript-eslint/no-unused-vars */

dotenv.config();
AppDataSource.initialize().then(() => {
  const app = express();
  app.use((req, res, next) => {
    // Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header('Access-Control-Allow-Origin', '*');
    // Quais são os métodos que a conexão pode realizar na API
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
  });
  app.use(express.json());
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message);
    }
    return res.status(500).json({
      status: 'error',
      message: 'Internal server'
    });
  });
  app.get('/', (_req, res) => {
    res.json({
      Teste: 'teste'
    });
  });
  app.use('', router);
  // Apenas registra o erro e repassa adiante, sem alterar a resposta
  app.use((error: Error, req: Request, _res: Response, next: NextFunction) => {
    console.error(`[ERRO] ${req.method} ${req.originalUrl} - ${error.message}`);
    next(error);
  });
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`RODANDO NA PORTA ${port}`);
  });
});
