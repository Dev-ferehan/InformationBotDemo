import {getUploadText} from '../../utils/ingest-text.js'
import {ingestMysqlService,questionAnswerMysqlService} from '../services/mysql.service.js'
export const getMysqlController=async (req,res,next)=>{
const {question}=req.body;
const result= await questionAnswerMysqlService(question)
res.status(200).json({
    success:true,
    message:"question answered successfully",
    result
})
 
}
export const postMysqlController=(req,res,next)=>{
const text= getUploadText(req)
const response=ingestMysqlService(text)
res.status(200).json({message:"text ingested successfully",response})

}