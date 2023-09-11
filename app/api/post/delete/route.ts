import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const body = await req.json();
  console.log(body.id);
  try {
    await prisma.posts.delete({
      where: {
        id: body.id,
      },
    });
  } catch (error) {}

  return new NextResponse(JSON.stringify("Created New Account"));
};
