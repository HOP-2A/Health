import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

<<<<<<< HEAD
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const addMedicine = await prisma.medicine.create({
    data: {
      name: body.name,
      description: body.description,
      ageLimit: body.ageLimit,
      price: body.price,
      stock: body.stock,
      imageUrls: body.imageUrls,
      category: body.category,
    },
  });
  console.log(addMedicine, "aoisdaoisdoji");
  return NextResponse.json(
    { message: "amjilttai", addMedicine },
    { status: 200 }
  );
};
export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const DeleteMedicine = await prisma.medicine.delete({
    where: {
      id: body.id,
    },
  });
=======
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
>>>>>>> 5803c57 (hi)

    const addMedicine = await prisma.medicine.create({
      data: {
        name: body.name,
        description: body.description,
        ageLimit: body.ageLimit,
        price: body.price,
        stock: body.stock,
        imageUrls: body.imageUrls,
      },
    });

    return NextResponse.json(
      { message: "Success", addMedicine },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
};
<<<<<<< HEAD
export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const UpdatedMedicine = await prisma.medicine.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      description: body.description,
      ageLimit: body.ageLimit,
      price: body.price,
      stock: body.stock,
      imageUrls: body.imageUrls,
    },
  });
  return NextResponse.json(UpdatedMedicine);
};
export const GET = async () => {
  const getMedicine = await prisma.medicine.findMany();
  return NextResponse.json(getMedicine);
=======

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();

    const deleted = await prisma.medicine.delete({
      where: { id: body.id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
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
>>>>>>> 5803c57 (hi)
};
