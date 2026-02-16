const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function(event, context) {
  // 1. Vérification de sécurité : on n'accepte que les envois de formulaires (POST)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 2. On récupère le message envoyé par le site
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    // 3. On connecte Gemini avec la clé SECRÈTE de Netlify
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 4. Instructions pour Chronos
    const systemInstruction = `Tu es Chronos, un guide expert en voyages temporels pour TimeTravel Agency.
    Tu es poli, chaleureux et professionnel.
    Nos destinations : Paris 1889 (15k€), Florence 1504 (18.5k€), Crétacé -65M (25k€).
    Réponds de manière concise.`;

    // 5. On génère la réponse
    const result = await model.generateContent(`${systemInstruction}\n\nUtilisateur: ${userMessage}\nChronos:`);
    const response = await result.response;
    const text = response.text();

    // 6. On renvoie la réponse au site
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: text }),
    };

  } catch (error) {
    console.error("Erreur:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur : impossible de joindre Chronos." }),
    };
  }
};
