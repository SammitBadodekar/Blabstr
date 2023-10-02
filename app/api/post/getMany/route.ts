import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const revalidate = 5;

export const GET = async () => {
  try {
    const posts = await prisma.posts.findMany({
      include: {
        user: true,
        likedBy: true,
        savedby: true,
        comments: true,
      },
    });
    return new NextResponse(JSON.stringify(posts));
  } catch (error) {
    return new NextResponse("error");
  }
};
