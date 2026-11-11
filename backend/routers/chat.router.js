import express from 'express'
import { chatComponent ,chatWithFileController} from '../components/chat.component.js';
import { ragController} from '../components/rag.Controller.js'
import {handleDocumentUpload } from '../middleware/upload.js'
export const chatRouter = express.Router();
chatRouter.post('/',chatComponent)
chatRouter.post('/with-file',handleDocumentUpload,chatWithFileController )
chatRouter.get('/', ragController)
