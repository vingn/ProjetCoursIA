import { GoogleGenerativeAI } from "@google/generative-ai";
 
export const handler = async (event, context) => {
  // 1. Sécurité HTTP
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
 
  try {
    // 2. Parsing
    const body = JSON.parse(event.body);
    const userMessage = body.message;
 
    // 3. Vérif Clé
    if (!process.env.GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "Clé API manquante" }) };
    }
 
    // 4. Config IA
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // --- LE FIX EST ICI ---
    // On utilise "gemini-pro" car c'est le seul modèle garanti sans erreur 404
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
 
    // 5. Envoi
    const result = await model.generateContent(`Tu es Chronos, guide temporel (Paris 1889, Florence 1504, Crétacé). Réponds de façon concise.\n\nUtilisateur: ${userMessage}`);
    const response = await result.response;
    const text = response.text();
 
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: text }),
    };
 
  } catch (error) {
    console.error("Erreur:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
