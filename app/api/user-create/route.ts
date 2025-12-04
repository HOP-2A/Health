import { prisma } from "@/lib/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const saltRound = 10;
  const hashedPassword = await hash(body.password, saltRound);

  const createdUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      clerkId: "",
    },
  });
  return NextResponse.json(createdUser);
};
