import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const doctors = await prisma.doctor.findMany();

  return NextResponse.json(doctors);
};
