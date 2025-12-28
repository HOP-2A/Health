import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const createdReview = await prisma.doctorReview.create({
    data: {
      doctorId: body.doctorId,
      illnessId: body.illnessId,
      userId: body.userId,
      notes: body.notes,
    },
  });
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
  });
  return NextResponse.json(doctorReviews);
};
