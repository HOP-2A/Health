import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, description, ageLimit, price, stock, imageUrls, category } =
      body;
    const addMedicine = await prisma.medicine.create({
      data: {
        name,
        description,
        ageLimit,
        price,
        stock,
        imageUrls,
        category,
      },
    });
    console.log(body, "ajsidoajsdioajos");
    return NextResponse.json(
      { message: "Success", addMedicine },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const medicineId = body.id;
    await prisma.orderItem.deleteMany({
      where: { medicineId: medicineId },
    });
    await prisma.doctorReviewToMedicine.deleteMany({
      where: { medicineId: medicineId },
    });
    await prisma.like.deleteMany({
      where: { medicineId: medicineId },
    });
    const deleted = await prisma.medicine.delete({
      where: { id: medicineId },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();

    const updated = await prisma.medicine.update({
      where: { id: body.id },
      data: {
        name: body.name,
        description: body.description,
        ageLimit: body.ageLimit,
        price: body.price,
        stock: body.stock,
        imageUrls: body.imageUrls,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
};
export const GET = async () => {
  try {
    const medicine = await prisma.medicine.findMany();
    return NextResponse.json(medicine);
  } catch (error) {
    return NextResponse.json({ message: "fail" });
  }
};
