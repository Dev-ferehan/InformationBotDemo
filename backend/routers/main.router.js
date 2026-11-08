import express from 'express'
import { serviceRoute } from './service.route.js';
import { articleRouter } from './article.router.js';
import { chatRouter } from './chat.router.js';
export const mainRouter=express.Router();
mainRouter.use('/categories',serviceRoute)
mainRouter.use('/articles',articleRouter)
mainRouter.use('/chat',chatRouter)