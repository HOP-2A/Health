import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { category } = body;

    const medicine = await prisma.medicine.findMany({
      where: { category: category },
    });

    return NextResponse.json(medicine);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "fail" }, { status: 500 });
  }
};
