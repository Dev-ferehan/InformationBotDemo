import { chunksText } from "../utils/chunk.js"
import { GoogleGenAI } from "@google/genai";
import { safeExecute} from "../db/db.config.js"
const ApiKEY=process.env.API_KEY;
const GEMINI_EMBEDDING_MODEL=process.env.GEMINI_EMBEDDING_MODEL
const ai=new GoogleGenAI({apiKey:ApiKEY})


const  embeddingResult =async (text)=>{
    const response = await ai.models.embedContent({
        model:GEMINI_EMBEDDING_MODEL,
        contents:text
    })
    // console.log(response?.embeddings[0]?.values);
    return response?.embeddings[0]?.values
}
export const ingestRagService=async(text)=>{
  
const cleanedText = text.replace(/(\r\n|\n|\r)/gm, " "); 
    // console.log( cleanedText)
const chunks= chunksText( cleanedText);
if(chunks.length ===0 ){
    const error=new Error ("No text chunk found in the up loaded file");
    error.statusCode=400;    
}
// console.log("chunks================",chunks)
console.log("save on db and embedding")
try{
    for(const chunk of chunks ){
    const embeddedChunk = await embeddingResult(chunk)
    // console.log(embeddedChunk)
    await safeExecute(
        "INSERT INTO constitution_chunks (chunk_text, embedding) VALUES (?, ?)",
        [chunk, JSON.stringify(embeddedChunk )]
    );
}
return {
"chunkCount":chunks.length,"store":"mysql"
}
}catch(error){
    console.log("something wrong insert table",error)
}










console.log("ooooooooo",chunk)
}