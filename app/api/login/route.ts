import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  const body = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user) {
    if (user?.password === body.password) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "Wrong password" });
    }
  } else {
    return NextResponse.json({ message: "Register" });
  }
};
