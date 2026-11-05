import { StatusCodes } from "http-status-codes";
import { getUploadText } from "../../utils/ingest-text.js"
import {ingestChromaDbService,queryChromaService} from '../services/chroma-db.services.js'

export const postChromaDbController =async(req,res,next)=>{
   try{
    const text = getUploadText(req)
    const result =await ingestChromaDbService(text);
    res.status(StatusCodes.CREATED).json({
        success:true,
        message:"document chunked, embedding, and stored in chroma db",
        data:result
    })
   }catch(error){
    next(error)
   }

}


export const getChromaController=async (req,res,next)=>{
    const {question}=req.body;

try{
    const result= await queryChromaService(question)
    res.status(200).json({
        status:true,
        message:"question answer successfully",
        result
    })

}catch(error){
res.status(200).json({
    status:false,
    message:"something went wrong",
    error


})
}
}