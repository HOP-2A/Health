import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ doctorId: string }> }
) {
  const { doctorId } = await context.params;
  const Doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!Doctor) {
    return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
  }

  return NextResponse.json(Doctor);
}
