import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Define interface for WordPress global configuration
declare global {
  interface Window {
    WPSPEEDMASTER_CONFIG?: {
      apiKey: string;
    };
  }
}

// Initialize the Gemini API client
// We check process.env for local dev, and window.WPSPEEDMASTER_CONFIG for WordPress production
const apiKey = process.env.API_KEY || window.WPSPEEDMASTER_CONFIG?.apiKey || '';

if (!apiKey) {
  console.warn("Gemini API Key is missing. Please check environment variables or WordPress settings.");
}

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "SpeedBot", a virtual assistant for a WordPress Speed Optimization Expert portfolio website. 
Your goal is to demonstrate technical expertise in WordPress performance.
You speak professionally, concisely, and technically but make it easy to understand for business owners.

Key Knowledge Areas:
1. Core Web Vitals (LCP, CLS, INP).
2. Caching (Object Cache, Page Cache, Browser Cache).
3. Image Optimization (WebP, Lazy Loading).
4. Database Optimization (Transient cleanup, InnoDB).
5. CDN integration (Cloudflare, BunnyCDN).
6. Plugin auditing (identifying bloated plugins).

Constraints:
- Keep answers under 100 words unless asked for a deep dive.
- Always emphasize that achieving 90+ requires a holistic approach, not just one plugin.
- If asked about pricing, say "Please use the contact form below for a custom quote."
`;

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model', content: string }[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Format history for the API if needed, but for simple stateless chat or single turn:
    // We will use generateContent with system instruction for simplicity in this context, 
    // effectively treating it as a fresh query with context if we wanted to pass full history manually.
    // Ideally, for multi-turn, we use ai.chats.create. Let's use chat for better context.

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "I'm optimizing my thoughts... could you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection speed bump! Please try again later or contact me directly via the form.";
  }
};