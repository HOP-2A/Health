import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, medicineId } = body;
    const existing = await prisma.like.findUnique({
      where: {
        userId_medicineId: { userId, medicineId },
      },
    });

    if (existing) {
      return NextResponse.json({ message: "Already liked" }, { status: 400 });
    }
    const like = await prisma.like.create({
      data: { userId, medicineId },
    });
    return NextResponse.json({ message: "Liked", like }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to like" }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const likes = await prisma.like.findMany({
      where: { userId },
      include: {
        medicine: true,
      },
    });
    return NextResponse.json(likes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to load liked items" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, medicineId } = body;
    const deleted = await prisma.like.delete({
      where: {
        userId_medicineId: { userId, medicineId },
      },
    });
    return NextResponse.json({ message: "Unliked", deleted });
  } catch (error) {
    return NextResponse.json({ error: "Failed to unlike" }, { status: 500 });
  }
};
