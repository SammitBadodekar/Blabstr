import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const body = await req.json();

  try {
    const post = await prisma.posts.update({
      where: {
        id: body.postId,
      },
      data: {
        likedBy: {
          disconnect: {
            id: body.userId,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify("disliked"));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("error"));
  }
};
