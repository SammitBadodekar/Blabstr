import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const body = await req.json();
  try {
    const post = await prisma.posts.create({
      data: {
        text: body.post.text,
        image: body.post.image,
        video: body.post.video,
        UserEmail: body.email,
        type: "text",
      },
      include: {
        likedBy: true,
        savedby: true,
      },
    });
    return new NextResponse(JSON.stringify(post));
  } catch (error) {
    return new NextResponse(JSON.stringify("error"));
  }
};
