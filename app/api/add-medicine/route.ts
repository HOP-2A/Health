import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json(DeleteMedicine);
};
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
};
