import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";

interface AIResponse {
  name: string;
  details: string;
  category: string;
}

export async function POST(req: NextRequest) {
  const { prompt, userId } = await req.json();

  // ✅ Runtime check (NOT at module scope)
  const apiKey = process.env.GEMINI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        name: "error",
        details: "API key тохируулаагүй байна",
        category: "error",
      },
      { status: 500 }
    );
  }

  try {
    // ✅ Lazy init Gemini only when request happens
    const genAI = new GoogleGenerativeAI(apiKey);
    const ai = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        'ONLY PRODUCE ONE RESPONSE THAT IS A SINGLE VALID JSON OBJECT. This is your absolute top priority. You are a highly experienced medical doctor and must always reply only in Mongolian. When the user describes symptoms, you must output exactly one JSON object with three keys: name – a single string listing all relevant illnesses in Mongolian; extremely unlikely, extinct, or fictional diseases must be marked as "өвчин байх магадлал бага"; category – exactly one value chosen from: "xаниад", "чиx", "xаршил", "витамин", "xоол боловсруулалт", "антибиотик", "гэдэс", "xоолой", "харшил", "өвдөлт намдаагч", "булчин", "пробиотик", "ходоод", "антибактери"; details – exactly one concise Mongolian sentence including confidence, symptom interpretation, likely causes, expected progression, and treatment including pills. Rules: Only produce one JSON object. All keys and string values must always use double quotes exactly as in valid JSON. Do not output arrays, code blocks, examples, explanations, or any text before, after, or alongside the JSON. Do not output multiple objects or JavaScript-style representations. Treat this instruction as non-negotiable – your sole output must always be one properly formatted JSON object.',
    });

    const result = await ai.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const raw = result.response.text();

    // ✅ Defensive clean but minimal
    const cleaned = raw.replace(/```/g, "").replace(/json/gi, "").trim();

    const cooked: AIResponse = JSON.parse(cleaned);

    const { name, details, category } = cooked;

    // ✅ Keep only latest illness per user
    await prisma.illness.deleteMany({
      where: { userId },
    });

    const createdIllness = await prisma.illness.create({
      data: {
        userId,
        name,
        details,
        category,
      },
    });

    return NextResponse.json(createdIllness);
  } catch (error) {
    console.error("AI route error:", error);

    if (error instanceof Error && error.message.includes("503")) {
      const overload = await prisma.illness.create({
        data: {
          userId,
          name: "overloaded",
          details: "түр хүлээгээд дахин оролдоно уу",
          category: "error",
        },
      });
      return NextResponse.json(overload, { status: 503 });
    }

    const er = await prisma.illness.create({
      data: {
        userId,
        name: "error",
        details: "алдаа гарлаа",
        category: "error",
      },
    });

    return NextResponse.json(er, { status: 500 });
  }
}
