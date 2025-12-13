import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const previousOrder = await prisma.order.findFirst({
    where: {
      userId: body.userId,
    },
  });

  if (!previousOrder) {
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
  } else {
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: previousOrder.id,
        medicineId: body.medicineId,
        quantity: body.quantity,
        price: body.price,
      },
    });
    const prevOrder = await prisma.order.findFirst({
      where: {
        id: previousOrder.id,
      },
    });
    if (!prevOrder) throw new Error("prev order not found");

    await prisma.order.update({
      where: {
        id: previousOrder.id,
      },
      data: {
        totalPrice: Number(orderItem.price) + Number(prevOrder.totalPrice),
      },
    });
    return NextResponse.json(orderItem);
  }
};
