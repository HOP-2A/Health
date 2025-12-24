import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ medicineId: string }> }
) {
  const { medicineId } = await context.params;
  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId },
  });

  if (!medicine) {
    return NextResponse.json(
      { message: "Medicine not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(medicine);
}
