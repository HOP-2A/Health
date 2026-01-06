import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: "delievered",
    },
  });
  return NextResponse.json("successful");
};
