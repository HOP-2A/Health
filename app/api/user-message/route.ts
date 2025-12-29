import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const createdMessage = await prisma.userMessage.create({
    data: {
      userId: body.userId,
      illness: body.illnessId,
      chat: body.chat,
      doctorId: body.doctorId,
    },
  });
  return NextResponse.json(createdMessage);
};
export const GET = async (
  req: NextRequest,
  context: { params: { userId: string } }
) => {
  const { userId } = context.params;
  const messages = await prisma.userMessage.findMany({
    where: {
      userId,
    },
  });
  return NextResponse.json(messages);
};
