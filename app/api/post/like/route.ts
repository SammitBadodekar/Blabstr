import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const body = await req.json();

  try {
    console.log("hi , inside try");
    const post = await prisma.posts.update({
      where: {
        id: body.postId,
      },
      data: {
        likedBy: {
          connect: {
            id: body.userId,
          },
        },
      },
    });
    console.log(post, "hello");
    return new NextResponse(JSON.stringify("liked"));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("error"));
  }
};
