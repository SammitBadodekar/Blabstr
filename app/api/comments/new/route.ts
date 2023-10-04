import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const body = await req.json();
  try {
    const post = await prisma.comments.create({
      data: {
        postId: body.id,
        UserEmail: body.email,
        text: body.text,
      },
      include: {
        user: true,
      },
    });
    return new NextResponse(JSON.stringify(post));
  } catch (error) {
    return new NextResponse(JSON.stringify("error"));
  }
};
