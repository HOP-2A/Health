import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  context: {
    params: Promise<{ orderItemId: string }>;
  }
) => {
  const params = await context.params;
  const { orderItemId } = params;

  await prisma.orderItem.delete({
    where: {
      id: orderItemId,
    },
  });
  return NextResponse.json({ message: "Succesful deleted" });
};
