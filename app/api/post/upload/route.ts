import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const body = await req.json();
  console.log(body.post.text);
  try {
    await prisma.posts.create({
      data: {
        text: body.post.text,
        UserEmail: body.email,
        type: "text",
      },
    });
  } catch (error) {}

  return new NextResponse(JSON.stringify("Created New Account"));
};
