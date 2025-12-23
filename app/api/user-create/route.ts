import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const clerk = await clerkClient();
  const clerkUser = await clerk.users.createUser({
    emailAddress: [body.email],
    password: body.password,
    publicMetadata: {
      role: "USER",
    },
  });
  console.log(clerkUser);
  const createdUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      clerkId: clerkUser.id,
    },
  });
  return NextResponse.json(createdUser);
};
