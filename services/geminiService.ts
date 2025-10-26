
import { GoogleGenAI, Chat } from "@google/genai";
import { PRODUCTS, SERVICES } from '../constants';

// IMPORTANT: Do NOT configure an API key here. It is assumed to be set in the environment.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat | null = null;

const getProductInfo = () => PRODUCTS.map(p => `- ${p.name} (${p.price} SEK): ${p.description}`).join('\n');
const getServiceInfo = () => SERVICES.map(s => `- ${s.name} (${s.category} - ${s.price}): ${s.description}`).join('\n');

const systemInstruction = `You are "ForgeBot", a friendly and energetic AI assistant for FitForge, an online store for fitness gear and services. Your goal is to help users find products, understand services, and answer their questions enthusiastically.

Do not mention you are an AI model. You are part of the FitForge team.

Here is the current inventory and service list:
---
**Products:**
${getProductInfo()}
---
**Sessions & Services:**
${getServiceInfo()}
---

Keep your answers concise and helpful. Use emojis to add personality! 🏋️‍♂️🔥💪 If a user asks a question you can't answer from the provided information, politely guide them to contact human support at support@fitforge.com. Do not make up information.`;

const initializeChat = () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini AI:", error);
    // This could be due to a missing API key.
    throw new Error("Could not connect to the AI assistant. Please check the configuration.");
  }
};

export const getChatResponse = async (message: string): Promise<string> => {
  if (!chat) {
    initializeChat();
  }
  
  if (!chat) {
      return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }

  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'An unexpected error occurred. Please try again later.';
  }
};