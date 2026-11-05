import { GoogleGenAI } from "@google/genai"
const GEMINI_API_KEY= process.env.GEMINI_API_KEY
const GEMINI_EMBEDDING_MODEL=process.env.GEMINI_MODELS
const GEMINI_CHAT_MODEL=process.env.GEMINI_CHAT_MODEL
const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY})

export const getDocumentEmbedding =async (text)=>{
const result=await ai.models.embedContent({
    model:GEMINI_EMBEDDING_MODEL,
    contents:text,
    config:{
        taskType:'RETRIEVAL_DOCUMENT'
    }
})
return result.embeddings[0].values

}


export const getQuestionEmbedding =async (question)=>{
    const result=await ai.models.embedContent({
        model:GEMINI_EMBEDDING_MODEL,
        contents:question,
        config:{
            taskType:'QUESTION_ANSWERING'
        }
    })
    return result.embeddings[0].values
    
    }

export const generateAnswer=async({question,context})=>{

const contextChunk=Array.isArray(context) ? context :[context];

const contextBlock=contextChunk.map((chunk,index)=>`[${index+1}] ${chunk}`).join('\n\n');

const prompt = `You are a friendly Evangadi assistant.
Your role is to help users find accurate information from the organization's knowledge base.

Answer the user's question using ONLY the retrieved context below.

Rules:
- Be warm, approachable, and conversational - like a helpful front-desk assistant.
- Ground every fact in the numbered passages. Do not use outside knowledge.
- If the context does not fully answer the question:
  - Say so politely in your own words (do not use a fixed phrase).
  - Gently steer the user back: suggest 1-2 related topics you can help with, based on the retrieved passages.
  - Invite them to ask about Evangadi - courses, programs, team, location, and similar topics.
  - Never invent facts to fill the gap.
- If the context is partial, share what is supported and kindly note what is unavailable.
- If passages conflict, note the conflict and prefer the most specific passage.
- Keep answers short, clear, and easy to read.
- Do not invent names, dates, numbers, or policies.

Retrieved context:
${contextBlock}

User question: ${question}

Answer:`;
const result=await ai.models.generateContent({
    model:GEMINI_CHAT_MODEL,
    contents:prompt
})
console.log("result text answer ",{question:question, answer:result.text, contextBlock:contextBlock})
return result.text
}
