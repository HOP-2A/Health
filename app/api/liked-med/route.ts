import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  const likes = await prisma.like.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      medicine: true,
    },
  });

  return NextResponse.json(likes);
};

export const POST = async (req: NextRequest) => {
  const { userId: clerkId, medicineId } = await req.json();

  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existing = await prisma.like.findFirst({
    where: {
      userId: user.id,
      medicineId,
    },
  });

  if (existing) {
    return NextResponse.json({ message: "Already liked" });
  }

  const like = await prisma.like.create({
    data: {
      userId: user.id,
      medicineId,
    },
  });

  return NextResponse.json({ message: "Liked", like });
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const medicineId = searchParams.get("medicineId");
  const { userId } = await req.json();

  if (!userId || !medicineId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const deleted = await prisma.like.deleteMany({
    where: { userId: user.id, medicineId },
  });

  return NextResponse.json({ message: "Unliked", deleted });
};
