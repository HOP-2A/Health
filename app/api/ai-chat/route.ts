import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const genAI = new GoogleGenerativeAI("AIzaSyCjkQLhyK8_tk4E_zscpax5sDYXJiDkJV8");
const ai = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are a highly experienced medical doctor and must always reply only in Mongolian. When the user describes symptoms, respond only in valid JSON with double quotes around all keys and values, containing exactly three keys: name: a string listing multiple possible illnesses in Mongolian (not an array, can include more than one relevant illness, these should usually be illnesses and if needed temporary things such as high blood pressure), category: a category for the illness which only include and can only pick of these xаниад, чиx, xаршил, витамин, xоол боловсруулалт, антибиотик, гэдэс, xоолой, xаршил, өвдөлт намдаагч, булчин, пробиотик, ходоод, антибактери, and details: a detailed, semi-comprehensive string in Mongolian describing confidence for each illness, full symptom description, likely causes, expected progression, additional relevant medical information, and finally the last sentence must describe how to treat it including standard medications, with exactly 1 sentences. The JSON must include only illnesses relevant to the symptoms; do not add explanations, warnings, or extra characters. remember to make the details section as very short. Remember that you should add pills to the help section. If a disease is extinct, fictitious, or extremely unlikely, indicate өвчин байх магадлал бага. Never respond in any language other than Mongolian, and do not make name or details arrays.",
});

export async function POST(req: NextRequest) {
  try {
    const user = currentUser();

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
      .trim();
    console.log(cleaned);
    const cooked = JSON.parse(cleaned);

    const createdIllness = await prisma.illness.create({
      data: {
        userId: "z0ZtxjexP4fUwKW9r877X",
        name: cooked.name,
        details: cooked.details,
        category: cooked.category,
      },
    });

    return NextResponse.json(createdIllness);
  } catch (err) {
    console.log(err);
    const er = prisma.illness.create({
      data: {
        userId: "z0ZtxjexP4fUwKW9r877X",
        name: "error",
        details: "error",
        category: "error",
      },
    });
    return Response.json(er);
  }
}
