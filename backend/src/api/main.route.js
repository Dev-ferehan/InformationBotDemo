import express from 'express';
import { mysqlRouter } from './mysql/routes/mysql.routes.js';
import { chromaDbRouter } from './chroma-db/routes/chroma.routes.js';

export const mainRoute=express.Router();

mainRoute.use('/mysql',mysqlRouter)
mainRoute.use('/chroma-db',chromaDbRouter)

