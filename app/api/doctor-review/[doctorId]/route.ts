import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  context: { params: { doctorId: string } }
) => {
  const body = await req.json();
  const { doctorId } = await context.params;
  const createdReview = await prisma.doctorReview.create({
    data: {
      doctorId,
      illnessId: body.illnessId,
      userId: body.userId,
      notes: body.notes,
    },
  });
  if (createdReview) {
    await prisma.userMessage.update({
      where: {
        id: body.messageId,
      },
      data: {
        replied: true,
      },
    });
  } else {
    return NextResponse.json({ message: "didnt created review" });
  }
  return NextResponse.json(createdReview);
};
export const GET = async (
  _req: NextRequest,
  context: { params: Promise<{ doctorId: string }> }
) => {
  const { doctorId } = await context.params;
  const doctorReviews = await prisma.doctorReview.findMany({
    where: {
      doctorId,
    },
    include: {
      user: true,
      illness: true,
    },
  });
  return NextResponse.json(doctorReviews);
};
