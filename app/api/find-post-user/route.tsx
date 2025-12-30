import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server.js";

export const POST = async (req: NextRequest) => {
  const { input } = await req.json();
  const filteredUsers = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: input, mode: "insensitive" } },
        { email: { contains: input, mode: "insensitive" } },
      ],
    },
  });

  return NextResponse.json(filteredUsers);
};
