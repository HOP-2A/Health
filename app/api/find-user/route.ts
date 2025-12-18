import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server.js";

export const POST = async (req: NextRequest) => {
  const { input } = await req.json();
  const medicines = await prisma.medicine.findMany({
    where: {
      name: {
        contains: input,
        mode: "insensitive",
      },
    },
  });
  return NextResponse.json(medicines);
};
