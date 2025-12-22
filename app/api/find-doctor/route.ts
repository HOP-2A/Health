import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server.js";

export const POST = async (req: NextRequest) => {
  const { input } = await req.json();
  const filteredDoctors = await prisma.doctor.findMany({
    where: {
      username: {
        contains: input,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(filteredDoctors);
};

// export const GET = async (req: NextRequest) => {
//   const doctors = await prisma.doctor.findMany();

//   return NextResponse.json(doctors);
// };

export const GET = async (req: Request) => {
  const body = await req.json();
  const doctor = await prisma.doctor.findUnique({
    where: {
      clerkId: body.clerkId,
    },
  });
  return NextResponse.json(doctor);
};
