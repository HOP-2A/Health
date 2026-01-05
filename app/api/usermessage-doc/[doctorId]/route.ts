import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ doctorId: string }> }
) => {
  const { doctorId } = await context.params;
  const messages = await prisma.userMessage.findMany({
    where: {
      doctorId,
    },
    include: {
      illness: true,
      user: true,
    },
  });
  return NextResponse.json(messages);
};
