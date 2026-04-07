import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is missing from the environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function askGemini(prompt: string, context: string = "") {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are EduLens AI, an intelligent assistant for school administrators and teachers. You specialize in student analytics, learning gap detection, attendance patterns, and personalized education. Keep responses practical, concise, and educator-focused.",
  });

  const result = await model.generateContent(`${context}\n\nUser Question: ${prompt}`);
  return result.response.text();
}

export async function extractQuestionsAndAnswerKey(base64Image: string, mimeType: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    You are an advanced computer vision and educational AI.
    1. Read and extract all text from this question paper image precisely.
    2. Identify and list all questions with their original numbering.
    3. Generate a comprehensive and accurate answer key for every question identified.
    
    Provide the response in the following JSON format:
    {
      "questions": ["Question 1...", "Question 2..."],
      "answerKey": "Detailed answer key text with explanations..."
    }
  `;
  
  try {
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      },
      { text: prompt }
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse AI response as JSON");
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export async function gradeAnswerSheet(base64Image: string, mimeType: string, questions: string[], answerKey: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    You are an expert teacher. Grade this student's answer sheet based on the following questions and the provided answer key.
    
    Questions:
    ${questions.join('\n')}
    
    Answer Key:
    ${answerKey}
    
    Provide a structured response in JSON format:
    {
      "feedback": "Detailed feedback for the student, mentioning specific strengths and weaknesses",
      "score": 85,
      "maxScore": 100,
      "percentage": 85
    }
  `;
  
  try {
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      },
      { text: prompt }
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Failed to parse AI response as JSON");
  } catch (error) {
    console.error("Gemini Grading Error:", error);
    throw error;
  }
}
