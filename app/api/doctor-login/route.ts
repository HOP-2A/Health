import { prisma } from "@/lib/db";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const doctor = await prisma.doctor.findUnique({
    where: {
      email: body.email,
    },
  });
  if (doctor) {
    const isValid = await compare(body.password, doctor.password);
    if (isValid) {
      return NextResponse.json(doctor);
    } else {
      return NextResponse.json({ message: "Wrong password" });
    }
  } else {
    return NextResponse.json({ message: "Please register" });
  }
};
