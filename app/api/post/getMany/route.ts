import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const revalidate = 10;

export const GET = async () => {
  try {
    const user = await prisma.posts.findMany({
      include: {
        user: true,
        likedBy: true,
      },
    });
    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    return new NextResponse("error");
  }
};
