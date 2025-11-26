import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";

const genAI = new GoogleGenerativeAI("AIzaSyBy8u_Fks0RbeEBZS2IwDCnqriDEbvKXZA");
const ai = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",  
  systemInstruction: "You are a highly experienced medical doctor, you understand every langauge, remember to respond in ONLY the language you are spoken to in, also say what pills and foods they should use."
   });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = await ai.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: ` ${prompt}`,
            },
          ],
        },
      ],
    });
    const text = result.response.text();
    return NextResponse.json(text);
  } catch (err) {
    console.log(err);
    return Response.json("error");
  }
}
