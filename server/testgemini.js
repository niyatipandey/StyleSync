require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  try {
    console.log("Key exists:", !!process.env.GEMINI_API_KEY);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Say hello in one sentence.",
    });

    console.log(response.text);
  } catch (err) {
    console.error("STATUS:", err.status);
    console.error("MESSAGE:", err.message);
    console.error(err);
  }
}

main();