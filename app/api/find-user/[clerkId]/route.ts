import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server.js";
export const GET = async (
  req: Request,
  context: { params: Promise<{ clerkId: string }> }
) => {
  const params = await context.params;
  const user = await prisma.user.findUnique({
    where: {
      clerkId: params.clerkId,
    },
  });
  return NextResponse.json(user);
};
