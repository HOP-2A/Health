import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const clerk = await clerkClient();

  const clerkUser = await clerk.users.createUser({
    emailAddress: [body.email],
    password: body.password,
    username: body.username,
    publicMetadata: {
      role: "DOCTOR",
    },
  });

  const createdDoctor = await prisma.doctor.create({
    data: {
      username: body.username,
      email: body.email,
      phoneNumber: body.phoneNumber,
      experienceYears: body.experienceYears,
      clerkId: clerkUser.id,
    },
  });

  return NextResponse.json(createdDoctor);
};
