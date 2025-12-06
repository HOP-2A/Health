import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user) {
    const isValid = true;
    if (isValid) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "Wrong password" });
    }
  } else {
    return NextResponse.json({ message: "Please register" });
  }
};
