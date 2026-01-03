import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: { params: { userId: string } }
) => {
  const body = await req.json();
  const { userId } = await context.params;
  const illness = await prisma.illness.findFirst({
    where: {
      userId,
    },
  });
  const doctor = await prisma.doctor.findFirst({
    where: {
      username: body.doctorName,
    },
  });

  if (!doctor) throw new Error("doctor not found");

  const createdMessage = await prisma.userMessage.create({
    data: {
      userId: userId,
      illnessId: illness?.id,
      chat: body.chat,
      doctorId: doctor.id,
    },
  });
  return NextResponse.json(createdMessage);
};
export const GET = async (
  req: NextRequest,
  context: { params: { userId: string } }
) => {
  const { userId } = await context.params;
  const messages = await prisma.doctorReview.findMany({
    where: {
      userId,
    },
    include: {
      doctor: true,
    },
  });
  return NextResponse.json(messages);
};
export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  await prisma.doctorReview.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json({ message: "Succesful" });
};
