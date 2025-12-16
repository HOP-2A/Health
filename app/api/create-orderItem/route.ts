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
    const ordItem = await prisma.orderItem.findFirst({
      where: {
        orderId: previousOrder.id,
        medicineId: body.medicineId,
      },
    });
    if (!ordItem) {
      const orderItem = await prisma.orderItem.create({
        data: {
          orderId: previousOrder.id,
          medicineId: body.medicineId,
          quantity: body.quantity,
          price: body.price,
        },
      });
      const med = await prisma.medicine.findUnique({
        where: {
          id: body.medicineId,
        },
      });
      if (!med) throw new Error("No medicine");
      await prisma.medicine.update({
        where: {
          id: body.medicineId,
        },
        data: {
          stock: med.stock - body.quantity,
        },
      });
      return NextResponse.json(orderItem);
    } else {
      const changedItem = await prisma.orderItem.update({
        where: {
          id: ordItem.id,
        },
        data: {
          quantity: ordItem.quantity + body.quantity,
          price: ordItem.price + body.price,
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
          totalPrice: Number(changedItem.price) + Number(prevOrder.totalPrice),
        },
      });
      const med = await prisma.medicine.findUnique({
        where: {
          id: body.medicineId,
        },
      });
      if (!med) throw new Error("No medicine");
      await prisma.medicine.update({
        where: {
          id: body.medicineId,
        },
        data: {
          stock: med.stock - body.quantity,
        },
      });
      return NextResponse.json(changedItem);
    }
  }
};
