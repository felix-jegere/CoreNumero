import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Test connection on startup
async function testConnection() {
  /*try {
    console.log('Testing Gemini API connection...');
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Say 'CoreNumero is ready!' in one sentence.",
    });
    console.log('✓ Gemini API connected successfully');
    console.log('  Response:', response.text);
    return true;
  } catch (error) {
    console.error('✗ Gemini API connection failed:', error.message);
    return false;
  }*/
}

export default testConnection;