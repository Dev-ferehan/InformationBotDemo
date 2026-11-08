import express from 'express'
import { articleComponent } from '../components/article.component.js';
export const articleRouter = express.Router();
articleRouter.get('/',articleComponent)
