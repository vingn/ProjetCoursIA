export const handler = async (event, context) => {
  // 1. Sécurité
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
 
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;
    const apiKey = process.env.GEMINI_API_KEY;
 
    // 2. Vérif Clé
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "Clé API manquante." }) };
    }
 
    // 3. APPEL DIRECT SANS LIBRAIRIE (Méthode Brute)
    // On tape directement sur l'URL de Google. Plus de problème de version de package.
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiK…,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `Tu es Chronos, guide temporel. Réponds de façon concise.\n\nUtilisateur: ${userMessage}` }]
            }
          ]
        })
      }
    );
 
    const data = await response.json();
 
    // 4. Gestion des erreurs Google explicites
    if (!response.ok) {
      console.error("Erreur Google API:", data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Erreur API: ${data.error?.message || response.statusText}` })
      };
    }
 
    // 5. Extraction de la réponse
    const text = data.candidates[0].content.parts[0].text;
 
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: text }),
    };
 
  } catch (error) {
    console.error("Crash complet:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
