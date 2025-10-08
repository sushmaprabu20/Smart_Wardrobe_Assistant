import { GoogleGenAI, Type } from "@google/genai";
import type { ClothingItem, Category, OutfitRecommendation, Weather } from '../types';
import {
  CATEGORIES_LIST
} from '../constants';


if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
};

export const categorizeClothingItem = async (imageBase64: string, mimeType: string): Promise<{ name: string; category: Category; subCategory: string; }> => {
  try {
    const imagePart = await fileToGenerativePart(imageBase64, mimeType);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          imagePart,
          { text: `Analyze this image of a clothing item. Respond with a single JSON object containing a descriptive name, its primary category, and a specific sub-category. The primary category must be one of the following: ${CATEGORIES_LIST.join(', ')}.` }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "A creative and descriptive name for the clothing item (e.g., 'Classic Blue Denim Jacket')."
            },
            category: {
              type: Type.STRING,
              enum: CATEGORIES_LIST,
              description: "The main category of the clothing item."
            },
            subCategory: {
              type: Type.STRING,
              description: "A specific sub-category for the item (e.g., 'T-Shirt', 'Skinny Jeans', 'Ankle Boots')."
            }
          },
          required: ["name", "category", "subCategory"]
        }
      }
    });

    const text = response.text.trim();
    const result = JSON.parse(text);

    // Validate category
    if (!CATEGORIES_LIST.includes(result.category)) {
      console.warn(`Gemini returned an invalid category: ${result.category}`);
      return { ...result, category: 'Unknown' as Category };
    }

    return result as { name: string; category: Category; subCategory: string; };

  } catch (error) {
    console.error("Error categorizing clothing item:", error);
    throw new Error("Failed to analyze the image. Please try another one.");
  }
};

export const getWeatherForLocation = async (latitude: number, longitude: number): Promise<Weather> => {
  try {
    const prompt = `Based on the coordinates (latitude: ${latitude}, longitude: ${longitude}), provide the current weather. Your response must be a single JSON object with three keys: 1. 'temperature': The current temperature in Celsius (as a number). 2. 'description': A brief, one-or-two-word description of the weather (e.g., "Sunny", "Cloudy with Showers"). 3. 'emoji': A single emoji that best represents the current weather conditions.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            temperature: {
              type: Type.NUMBER,
              description: "Current temperature in Celsius."
            },
            description: {
              type: Type.STRING,
              description: "A brief description of the weather."
            },
            emoji: {
              type: Type.STRING,
              description: "A single emoji for the weather."
            }
          },
          required: ["temperature", "description", "emoji"]
        }
      }
    });
    
    const text = response.text.trim();
    return JSON.parse(text) as Weather;

  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Could not fetch weather information for your location.");
  }
};


export const getOutfitRecommendation = async (wardrobe: ClothingItem[], userPrompt: string, weather?: Weather): Promise<OutfitRecommendation> => {
  try {
    if (wardrobe.length === 0) {
      throw new Error("Wardrobe is empty.");
    }

    const wardrobeForPrompt = wardrobe.map(({ id, name, category, subCategory }) => ({
      id,
      name,
      category,
      subCategory,
    }));

    const weatherPrompt = weather 
      ? `The current weather is ${weather.temperature}°C and it is ${weather.description}. Please consider this when selecting items.`
      : '';

    const prompt = `You are an expert fashion stylist. Based on the following wardrobe items available as a JSON array: ${JSON.stringify(wardrobeForPrompt)}. Create an outfit that would be perfect for: "${userPrompt}". 
    
    ${weatherPrompt}
    
    Your response must be a single JSON object. The outfit should be composed of items from the provided list. The JSON object must have three keys: 
    1. 'title': A creative, catchy name for the outfit (e.g., "Sunset Coffee Date" or "Urban Explorer").
    2. 'itemIds': An array of strings, where each string is the 'id' of a recommended clothing item from the provided list. Ensure you select a logical combination of items (e.g., one top, one bottom, one pair of shoes).
    3. 'reasoning': A short, stylish explanation of why this combination works for the occasion and weather.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A creative name for the outfit."
            },
            itemIds: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "An array of IDs of the recommended items from the provided wardrobe."
            },
            reasoning: {
              type: Type.STRING,
              description: "An explanation for the outfit choice."
            }
          },
          required: ["title", "itemIds", "reasoning"]
        }
      }
    });
    
    const text = response.text.trim();
    return JSON.parse(text) as OutfitRecommendation;

  } catch (error) {
    console.error("Error getting outfit recommendation:", error);
    throw new Error("Failed to generate an outfit. Please try a different prompt.");
  }
};