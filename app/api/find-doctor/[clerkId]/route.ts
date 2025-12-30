import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server.js";

export const POST = async (req: NextRequest) => {
  const { input } = await req.json();
  const filteredDoctors = await prisma.doctor.findMany({
    where: {
      username: {
        contains: input,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(filteredDoctors);
};

export const GET = async (
  _req: Request,
  context: { params: Promise<{ clerkId: string }> }
) => {
  const params = await context.params;

  const doctor = await prisma.doctor.findUnique({
    where: {
      clerkId: params.clerkId,
    },
  });

  return NextResponse.json(doctor);
};
