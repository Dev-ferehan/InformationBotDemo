import express from 'express'
import { serviceRoute } from './service.route.js';
export const mainRouter=express.Router();
mainRouter.use('/categories',serviceRoute)