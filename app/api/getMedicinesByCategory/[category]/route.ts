import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: Promise<{ category: string }> }
) {
  const { category } = await context.params;

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    const medicines = await prisma.medicine.findMany({
      where: { category },
      select: {
        id: true,
        name: true,
        description: true,
        ageLimit: true,
        price: true,
        stock: true,
        imageUrls: true,
        category: true,
      },
    });

    return NextResponse.json(medicines);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch medicines" },
      { status: 500 }
    );
  }
}
