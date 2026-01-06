import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  await prisma.order.delete({
    where: {
      id,
    },
  });
  return NextResponse.json("successful");
};
