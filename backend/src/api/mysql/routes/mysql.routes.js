import express from "express";
import {handleTextUpload} from '../../middleware/handleTextUpload.js'
import { postMysqlController,getMysqlController } from "../controller/mysql.controller.js";
import { queryAssistantValidation } from "../validation/mysql-validater.js";
export const mysqlRouter = express.Router();


mysqlRouter.get('/',queryAssistantValidation,getMysqlController)



mysqlRouter.post('/',handleTextUpload,postMysqlController)

