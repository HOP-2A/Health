import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server.js";

export const POST = async (req: NextRequest) => {
  const { input } = await req.json();
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: input,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(users);
};
