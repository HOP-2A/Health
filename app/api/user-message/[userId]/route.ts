import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: { params: { userId: string } }
) => {
  const body = await req.json();
  const { userId } = await context.params;
  const createdMessage = await prisma.userMessage.create({
    data: {
      userId: userId,
      illnessId: body.illnessId,
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
    include: {
      doctor: true,
    },
  });
  return NextResponse.json(messages);
};
