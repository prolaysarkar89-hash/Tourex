import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Answers, Itinerary } from '../types';
import { QUESTIONS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// IMPORTANT: Replace this with your actual Google Apps Script Web App URL.
// This script will receive the lead data and add it to your Google Sheet.
const GOOGLE_SHEET_LEAD_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'A catchy and appealing title for the tour package. Example: "Mystical Himalayan Adventure".',
    },
    summary: {
      type: Type.STRING,
      description: 'A brief, one-paragraph summary of the trip, highlighting the key experiences.',
    },
    days: {
      type: Type.ARRAY,
      description: 'A day-by-day plan for the trip.',
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.INTEGER,
            description: 'The day number, starting from 1.',
          },
          title: {
            type: Type.STRING,
            description: 'A short, descriptive title for the day\'s theme. Example: "Darjeeling Tea Trails & Sunrise".',
          },
          activities: {
            type: Type.ARRAY,
            description: 'A list of detailed activities, sights, and experiences for the day.',
            items: {
              type: Type.STRING,
            },
          },
          imageQuery: {
            type: Type.STRING,
            description: "A concise, descriptive English search query for a beautiful, representative photo for this day's theme. e.g., 'sunrise over Kanchenjunga Darjeeling', 'Teesta river rafting Sikkim', 'monks at Rumtek Monastery Sikkim'."
          }
        },
        required: ['day', 'title', 'activities', 'imageQuery'],
      },
    },
    notes: {
      type: Type.ARRAY,
      description: 'A list of important notes, travel tips, or suggestions for the traveler. Example: "Pack warm clothes for the evenings.".',
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ['title', 'summary', 'days', 'notes'],
};

export const generateItinerary = async (answers: Answers, languageName: string, adjustmentRequest?: string): Promise<Itinerary> => {
  try {
    const preferences = QUESTIONS.map(q => `- ${q.text}: ${answers[q.id]}`).join('\n');
    
    const prompt = `
      Based on the following travel preferences, create a personalized tour itinerary for North Bengal, Dooars, Darjeeling, and Sikkim.
      Pay close attention to the starting location for planning the first day's travel and logistics.
      ${adjustmentRequest ? `The user has requested the following adjustments to the previous plan: "${adjustmentRequest}". Please generate a new plan incorporating these changes.` : ''}
      
      Traveler's Preferences:
      ${preferences}
      
      Make the itinerary sound exciting and well-planned.
      The entire response, including all text and descriptions, must be in the ${languageName} language.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    // Basic validation
    if (!parsedData.title || !Array.isArray(parsedData.days)) {
      throw new Error("Invalid itinerary structure received from API.");
    }
    
    return parsedData as Itinerary;

  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. The model may be unable to provide a plan for the given preferences. Please try again with different answers.");
  }
};

export const generateImageForDay = async (query: string): Promise<string> => {
  try {
    const prompt = `A high-quality, vibrant, professional photograph of: ${query}. Centered, beautiful lighting, cinematic.`
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error(`Error generating image for query "${query}":`, error);
    throw new Error("Failed to generate image from the model.");
  }
};


export const saveLeadToGoogleSheet = async (phone: string, itinerary: Itinerary): Promise<void> => {
  if (!GOOGLE_SHEET_LEAD_URL.includes('YOUR_DEPLOYMENT_ID')) {
    try {
      const payload = {
        phone,
        itineraryTitle: itinerary.title,
        itinerarySummary: itinerary.summary,
        itineraryJSON: JSON.stringify(itinerary, null, 2),
      };
  
      await fetch(GOOGLE_SHEET_LEAD_URL, {
        method: 'POST',
        mode: 'no-cors', // Use 'no-cors' for simple fire-and-forget to Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });
  
      console.log("Lead submission attempted for phone:", phone);
  
    } catch (error) {
      // Log the error but don't re-throw, as failing to save the lead
      // shouldn't prevent the user from getting the itinerary on WhatsApp.
      console.error("Error saving lead to Google Sheet:", error);
    }
  } else {
    console.warn("Google Sheet URL not configured. Skipping lead save.");
  }
};