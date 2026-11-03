import express from "express";
import { handleTextUpload } from "../../middleware/handleTextUpload.js";
import {postChromaDbController,getChromaController} from '../controller/chroma-db.controller.js'
import { queryAssistantValidation } from "../validation/chroma-validater.js";
export const chromaDbRouter = express.Router();
chromaDbRouter.get('/',queryAssistantValidation,getChromaController)
chromaDbRouter.post('/',handleTextUpload,postChromaDbController)


