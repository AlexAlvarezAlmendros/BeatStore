
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Product, GeminiSuggestionRequest, Genre } from '../types';
import { GEMINI_API_MODEL_TEXT, MOCK_PRODUCER_NAME } from '../constants';

// Ensure API_KEY is accessed correctly. In a real Vite/Create React App setup, 
// this would be import.meta.env.VITE_API_KEY or process.env.REACT_APP_API_KEY.
// For this environment, we assume process.env.API_KEY is directly available.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn(
    "Gemini API key not found. AI features will be disabled. " +
    "Please set the API_KEY environment variable."
  );
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const generateTitlePrompt = (keywords?: string): string => {
  return `Suggest 3 catchy and professional titles for a music beat with the following characteristics or keywords: "${keywords || 'versatile, modern'}". Titles should be concise, memorable, and suitable for a digital music marketplace. Return as a JSON array of strings. For example: ["Vibez", "City Lights", "Lofi Dreams"]`;
};

const generateDescriptionPrompt = (title: string, keywords?: string, genre?: string): string => {
  return `Write a short, engaging promotional description (2-3 sentences, max 150 characters) for a digital music product titled "${title}". 
Keywords: "${keywords || 'unique sound'}". Genre: "${genre || 'Electronic'}". 
Highlight its unique sound and potential uses for artists (e.g., vlogs, gaming, background music, independent films).
Example: "Immerse yourself in '${title}', a ${genre || 'dynamic'} track perfect for content creators. Its captivating melody and ${keywords || 'modern'} vibe will elevate your projects."`;
};


export const getAiSuggestions = async (request: GeminiSuggestionRequest): Promise<string | string[]> => {
  if (!ai) {
    // Simulate a delay and return mock data if API key is not available
    await new Promise(resolve => setTimeout(resolve, 500));
    if (request.type === "title") {
      return ["Mock Title 1", "Mock Title 2", "Creative Beat Name"];
    } else {
      return `This is a mock description for ${request.productInfo.title || 'your amazing beat'}. It's truly fantastic!`;
    }
  }

  let prompt: string;
  let expectJson = false;

  if (request.type === "title") {
    prompt = generateTitlePrompt(request.keywords);
    expectJson = true;
  } else {
    prompt = generateDescriptionPrompt(request.productInfo.title || "Untitled Beat", request.keywords, request.productInfo.genre);
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_API_MODEL_TEXT,
      contents: prompt,
      config: expectJson ? { responseMimeType: "application/json" } : {}
    });

    let text = response.text;

    if (expectJson) {
      let jsonStr = text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }
      try {
        const parsedData = JSON.parse(jsonStr);
        return Array.isArray(parsedData) ? parsedData.map(String) : [String(parsedData)];
      } catch (e) {
        console.error("Failed to parse JSON response for titles:", e, "Raw text:", text);
        // Fallback: try to extract titles if JSON parsing fails but it looks like a list
        if (text.includes(",")) return text.split(",").map(t => t.trim().replace(/["\[\]]/g, ''));
        return [text.trim().replace(/["\[\]]/g, '')]; // Single title if not a list
      }
    }
    return text;

  } catch (error) {
    console.error(`Error calling Gemini API for ${request.type}:`, error);
    // Provide a generic fallback on error
    if (request.type === "title") {
      return ["AI Suggestion Error - Title 1", "AI Suggestion Error - Title 2"];
    }
    return "Error generating AI description. Please try again or write one manually.";
  }
};

// Example of how to generate a product using AI (simulated)
export const generateAiProduct = async (keywords: string): Promise<Partial<Product>> => {
    if (!ai) {
        // Mock AI product generation if API is not available
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            title: "AI Generated Dreamscape",
            description: "A dreamy and atmospheric track, perfect for relaxation or study sessions. Created by AI.",
            price: parseFloat((Math.random() * 10 + 10).toFixed(2)),
            genre: Genre.AMBIENT,
            tags: ["dreamy", "atmospheric", "chill", "ai"],
            producer: MOCK_PRODUCER_NAME,
            coverImageUrl: `https://picsum.photos/seed/${Date.now()}/400/400`,
            audioFileUrl: "mock_audio.mp3"
        };
    }

    const prompt = `Generate details for a new music beat based on these keywords: "${keywords}". 
    I need a title, a short description (2 sentences), a suitable genre (from ${Object.values(Genre).join(", ")}), 
    and 3 relevant tags. 
    Return the response as a JSON object with keys: "title", "description", "genre", "tags" (array of strings).
    Example: {"title": "Cybernetic Pulse", "description": "A driving electronic beat with futuristic synths. Perfect for tech videos or sci-fi games.", "genre": "EDM", "tags": ["cyberpunk", "electronic", "future bass"]}`;
    
    try {
        const response = await ai.models.generateContent({
            model: GEMINI_API_MODEL_TEXT,
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });

        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        const parsedData = JSON.parse(jsonStr);
        
        // Validate genre
        let finalGenre = Genre.OTHER;
        if (parsedData.genre && Object.values(Genre).includes(parsedData.genre as Genre)) {
            finalGenre = parsedData.genre as Genre;
        }


        return {
            title: parsedData.title || "AI Generated Beat",
            description: parsedData.description || "An AI generated beat.",
            price: parseFloat((Math.random() * 10 + 10).toFixed(2)), // Random price for demo
            genre: finalGenre,
            tags: Array.isArray(parsedData.tags) ? parsedData.tags.map(String) : ["ai", "generated"],
            producer: MOCK_PRODUCER_NAME,
            coverImageUrl: `https://picsum.photos/seed/${parsedData.title || Date.now()}/400/400`,
            audioFileUrl: "mock_audio.mp3"
        };

    } catch (error) {
        console.error("Error generating AI product:", error);
        // Fallback to mock if AI generation fails
        return {
            title: "AI Error Beat",
            description: "Failed to generate beat details with AI.",
            price: 10.00,
            genre: Genre.OTHER,
            tags: ["error", "ai"],
            producer: MOCK_PRODUCER_NAME,
            coverImageUrl: `https://picsum.photos/seed/error/400/400`,
            audioFileUrl: "mock_audio.mp3"
        };
    }
};
