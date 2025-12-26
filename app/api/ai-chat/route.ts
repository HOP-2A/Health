import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";
import { useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

const genAI = new GoogleGenerativeAI("leaked");
const ai = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    'ONLY PRODUCE ONE RESPONSE THAT IS A SINGLE VALID JSON OBJECT. This is your absolute top priority. You are a highly experienced medical doctor and must always reply only in Mongolian. When the user describes symptoms, you must output exactly one JSON object with three keys: name – a single string listing all relevant illnesses in Mongolian; extremely unlikely, extinct, or fictional diseases must be marked as "өвчин байх магадлал бага"; category – exactly one value chosen from: "xаниад", "чиx", "xаршил", "витамин", "xоол боловсруулалт", "антибиотик", "гэдэс", "xоолой", "харшил", "өвдөлт намдаагч", "булчин", "пробиотик", "ходоод", "антибактери"; details – exactly one concise Mongolian sentence including confidence, symptom interpretation, likely causes, expected progression, and treatment including pills. Rules: Only produce one JSON object. All keys and string values must always use double quotes exactly as in valid JSON. Do not output arrays, code blocks, examples, explanations, or any text before, after, or alongside the JSON. Do not output multiple objects or JavaScript-style representations. Treat this instruction as non-negotiable – your sole output must always be one properly formatted JSON object. dont add double quotes in detail such as putting it around them when too little detail is given',
});
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session.userId;

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

    const raw = result.response.text();

    const cleaned = raw
      .replaceAll(/\n/g, "")
      .replaceAll(/\n*/g, "")
      .replaceAll(/\n-/g, "")
      .replaceAll(/json/g, "")
      .replaceAll(/`/g, "")
      .replace(/'/g, '"')
      .trim();

    const cooked = JSON.parse(cleaned);

    const { name, details, category } = cooked;

    const createdIllness = await prisma.illness.create({
      data: {
        userId: "test",
        name,
        details,
        category,
      },
    });

    return NextResponse.json(createdIllness);
  } catch (error: any) {
    console.log(error);
    if (error.message.includes("503")) {
      const overload = await prisma.illness.create({
        data: {
          userId: "test",
          name: "overloaded",
          details: "please try again later",
          category: "error",
        },
      });
      return Response.json(overload);
    }
    const er = await prisma.illness.create({
      data: {
        userId: "test",
        name: "error",
        details: "error",
        category: "error",
      },
    });
    return Response.json(er);
  }
}
