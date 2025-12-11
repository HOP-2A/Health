import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const order = await prisma.order.create({
    data: {
      userId: body.userId,
      totalPrice: body.totalPrice,
    },
  });

  const orderItem = await prisma.orderItem.create({
    data: {
      orderId: order.id,
      medicineId: body.medicineId,
      quantity: body.quantity,
      price: body.price,
    },
  });

  return NextResponse.json(orderItem);
};
