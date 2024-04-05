import { GoogleGenerativeAI } from '@google/generative-ai';
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = gemini.getGenerativeModel({ model: "gemini-pro"});