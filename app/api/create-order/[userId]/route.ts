import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { context }: { context: { params: { userId: string } } }
) => {
  const params = await context.params;
  const { userId } = params;
  const order = prisma.order.findFirst({
    where: {
      userId: userId,
    },
  });
  return NextResponse.json(order);
};
