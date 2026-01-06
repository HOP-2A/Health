import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server.js";
export const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany({
    include: {
      illnesses: true,
      likes: {
        include: {
          medicine: true,
        },
      },
      orders: {
        where: {
          status: "pending",
        },
        include: {
          items: {
            include: {
              medicine: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(users);
};
