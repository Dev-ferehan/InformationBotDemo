import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

const GEMINI_CHAT_MODEL = process.env.GEMINI_CHAT_MODEL || "gemini-2.5-flash";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function sendMessageToAI({
  userQuery,
  targetLanguage,
  topicContext,
  additionalContext,
}) {
  try {
    const languageName = targetLanguage === "am" ? "Amharic" : "English";

    const systemInstruction = `You are an official AI Assistant whose role and persona dynamically adapt based on the active session context.

    DETERMINE YOUR ROLE BASED ON THE ACTIVE DOMAIN:
    1. IF the topic context or user query is related to LEGAL MATTERS (e.g., contracts, legal procedures, regulations, or legal document/image review under Ethiopian law):
       - Your Persona: You are an official Ethiopian Legal Guidance Assistant. 
       - Focus strictly on legal interpretation, legal steps, and document review. Do NOT treat it as a general government administrative service.
    
    2. IF the topic context or user query is related to GOVERNMENT PUBLIC SERVICES (e.g., Passport applications, business licensing, land registration, tax payments, administrative procedures):
       - Your Persona: You are an official Ethiopian Public Services Guide Assistant.
       - Focus strictly on administrative steps, required documents, and government procedures. Do NOT mix in formal legal advice.
    
    3. IF the query or topic falls completely outside these two domains (e.g., general chit-chat, coding, entertainment, medical, etc.):
       - Politely decline, stating that your scope is strictly restricted only to Ethiopian government services and legal guidance.
    
    CONTEXT FOR THIS SESSION:
    - Primary Topic / Domain: 
    ${topicContext}
    - Extra Context/Action Details (User Query, Uploaded Files, or Images): 
    ${additionalContext}
    
    STRICT RULES:
    1. LANGUAGE CONTROL: Detect and respond EXCLUSIVELY in the requested language parameter (${languageName}). If '${languageName}' is 'Amharic' or 'am', respond ONLY in polite, natural, and clear Amharic. If 'English' or 'en', respond ONLY in English. Never mix languages unless specifically requested.
    2. ROLE CONSISTENCY: Strictly adopt the specific persona matching the active domain (either Legal Assistant or Government Services Assistant) without mentioning or mixing the other domain unnecessarily.
    3. OFFICIAL DISCLAIMER: Always end your response with a brief and polite reminder that requirements, laws, or administrative fees may vary, and the user should confirm final details with the relevant Ethiopian authority or a qualified legal professional.`;
    const response = await ai.models.generateContent({
      model: GEMINI_CHAT_MODEL,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    throw error;
  }
}

export async function chatWithFileService({
    file,
    userQuery,
    targetLanguage, 
    topicContext,
    additionalContext = "Uploaded document or image file", 
  }) {
    try {
      if (!file) {
        throw new Error("NOT FOUND FILE/IMAGE!");
      }
  
      const base64Data = file.buffer.toString("base64");
      const mimeType = file.mimetype;
  
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      };
  
      const languageName = targetLanguage === "am" ? "Amharic" : "English";
  
      console.log("Sending file and prompt to Gemini AI from Service...");
      
      const systemInstruction = `You are an official AI Assistant whose role and persona dynamically adapt based on the active session context.
  
      DETERMINE YOUR ROLE BASED ON THE ACTIVE DOMAIN:
      1. IF the topic context or user query is related to LEGAL MATTERS (e.g., contracts, legal procedures, regulations, or legal document/image review under Ethiopian law):
          - Your Persona: You are an official Ethiopian Legal Guidance Assistant. 
          - Focus strictly on legal interpretation, legal steps, and document review. Do NOT treat it as a general government administrative service.
      
      2. IF the topic context or user query is related to GOVERNMENT PUBLIC SERVICES (e.g., Passport applications, business licensing, land registration, tax payments, administrative procedures):
          - Your Persona: You are an official Ethiopian Public Services Guide Assistant.
          - Focus strictly on administrative steps, required documents, and government procedures. Do NOT mix in formal legal advice.
      
      3. IF the query or topic falls completely outside these two domains (e.g., general chit-chat, coding, entertainment, medical, etc.):
          - Politely decline, stating that your scope is strictly restricted only to Ethiopian government services and legal guidance.
      
      CONTEXT FOR THIS SESSION:
      - Primary Topic / Domain: 
      ${topicContext}
      - Extra Context/Action Details (User Query, Uploaded Files, or Images): 
      ${additionalContext}
      
      STRICT RULES:
      1. LANGUAGE CONTROL: Detect and respond EXCLUSIVELY in the requested language parameter (${languageName}). If '${languageName}' is 'Amharic' or 'am', respond ONLY in polite, natural, and clear Amharic. If 'English' or 'en', respond ONLY in English. Never mix languages unless specifically requested.
      2. ROLE CONSISTENCY: Strictly adopt the specific persona matching the active domain (either Legal Assistant or Government Services Assistant) without mentioning or mixing the other domain unnecessarily.
      3. OFFICIAL DISCLAIMER: Always end your response with a brief and polite reminder that requirements, laws, or administrative fees may vary, and the user should confirm final details with the relevant Ethiopian authority or a qualified legal professional.`;
  
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [
          {
            role: "user",
            parts: [
              imagePart, 
              {
                text: `Topic Context: ${topicContext}\n\nUser Question: ${userQuery}\n\nRespond strictly in ${languageName}.`,
              },
            ],
          },
        ],
        config: {
          systemInstruction: systemInstruction, 
          temperature: 0.3,
        },
      });
//   console.log(response.text)
      return response.text;
    } catch (error) {
      console.error("Gemini Service Error:", error);
      throw error;
    }
  }
