import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: {
    params: Promise<{ userId: string }>;
  }
) => {
  const params = await context.params;
  const { userId } = params;
  const order = await prisma.order.findFirst({
    where: {
      userId: userId,
    },
  });
  const orderedItems = await prisma.orderItem.findMany({
    where: {
      orderId: order?.id,
    },
    include: {
      medicine: true,
    },
  });
  const final = {
    items: orderedItems,
    order: order,
  };
  return NextResponse.json(final);
};
