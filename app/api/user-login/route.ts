import { prisma } from "@/lib/db";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user) {
    const isValid = await compare(body.password, user.password);
    if (isValid) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "Wrong password" });
    }
  } else {
    return NextResponse.json({ message: "Please register" });
  }
};
