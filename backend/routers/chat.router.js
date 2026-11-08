import express from 'express'
import { chatComponent } from '../components/chat.component.js';
export const chatRouter = express.Router();
chatRouter.post('/',chatComponent)
