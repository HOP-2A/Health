import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  context: { params: { clerkId: string } }
) => {
  const { clerkId } = await context.params;
  console.log(clerkId, "adfadfafadsfsdf");
  const users = await prisma.user.findUnique({
    where: { clerkId },
  });

  const doctors = await prisma.doctor.findUnique({
    where: { clerkId },
  });

  if (users) {
    return NextResponse.json(users);
  }

  if (doctors) {
    return NextResponse.json(doctors);
  }
};
