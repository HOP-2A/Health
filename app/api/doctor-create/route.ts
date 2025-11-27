import { prisma } from "@/lib/db";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const saltRound = 10;
  const hashedPassword = await hash(body.password, saltRound);
  const createdDoctor = await prisma.doctor.create({
    data: {
      username: body.username,
      email: body.email,
      password: hashedPassword,
      phoneNumber: body.phoneNumber,
      profilePic: body.profilePic,
      experienceYears: body.experienceYears,
    },
  });
  return NextResponse.json(createdDoctor);
};
