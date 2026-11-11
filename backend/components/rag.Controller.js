
import { extractPdfText } from "../utils/pdf-extract.js"
import { chunksText } from "../utils/chunk.js"
import {ingestRagService} from '../services/rag.service.js'
export const ragController =async(req,res,next)=>{
try{
    const text = await extractPdfText();
    // console.log("from rag controller========",text)
const result= await ingestRagService(text)
}catch(error){

}
}