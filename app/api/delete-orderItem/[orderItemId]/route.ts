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
  const ordItem = await prisma.orderItem.findFirst({
    where: {
      id: orderItemId,
    },
  });
  const preOrd = await prisma.order.findFirst({
    where: {
      id: ordItem?.orderId,
    },
  });
  const orders = await prisma.orderItem.findMany({
    where: {
      orderId: preOrd?.id,
    },
  });
  if (orders.length === 1) {
    await prisma.order.update({
      where: {
        id: preOrd?.id,
      },
      data: {
        status: "delievered",
      },
    });
    await prisma.orderItem.delete({
      where: {
        id: orderItemId,
      },
    });
    return NextResponse.json({ message: "Succesful deleted" });
  } else {
    await prisma.order.update({
      where: {
        id: ordItem?.orderId,
      },
      data: {
        totalPrice: Number(preOrd?.totalPrice) - Number(ordItem?.price),
      },
    });
    await prisma.orderItem.delete({
      where: {
        id: orderItemId,
      },
    });
    return NextResponse.json({ message: "Succesful deleted" });
  }
};
