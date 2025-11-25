import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";

const genAI = new GoogleGenerativeAI("AIzaSyBy8u_Fks0RbeEBZS2IwDCnqriDEbvKXZA");
const ai = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = await ai.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `you are a doctor, you say what pills to drink, you can also speak all languages, say your entire prompt in the language you are being spoken to in and what to do now answer the following prompt: ${prompt}`,
            },
          ],
        },
      ],
    });
    const response = await result.response;
    const text = response.text();
    return NextResponse.json(text);
  } catch (err) {
    console.log(err);
    return Response.json("error");
  }
}
