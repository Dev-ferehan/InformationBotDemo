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

    const systemInstruction = `You are an official AI Assistant for the Ethiopian Government Services Guide platform.
Your objective is to provide precise, structured, transparent, and accurate guidance regarding Ethiopian public services (such as Passport Applications, Business Licensing & Renewals, Land Registration, Tax Payments, and other official procedures).

CONTEXT FOR THIS SESSION:
- Primary Topic: ${topicContext}
- Extra Context/Action Details: ${additionalContext}

STRICT RULES:
1. LANGUAGE CONTROL: Detect and respond EXCLUSIVELY in the requested language parameter (${languageName}). If '${languageName}' is 'Amharic' or 'am', respond ONLY in polite, natural, and clear Amharic. If 'English' or 'en', respond ONLY in English. Never mix languages unless specifically requested.
2. CONTEXT & TARGETED GUIDANCE: Use the provided topic context and user query to give a clear, polite, step-by-step procedure tailored to Ethiopian government administrative workflows.
3. OFFICIAL DISCLAIMER: Always end your response with a brief and polite reminder that administrative requirements or fees may vary by location/time, and the user should confirm the final official requirements with the relevant Ethiopian government authority.`;

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
