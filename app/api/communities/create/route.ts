import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const body = await req.json();
  try {
    const post = await prisma.community.create({
      data: {
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
      },
    });
    return new NextResponse(JSON.stringify(post));
  } catch (error) {
    return new NextResponse(JSON.stringify("error"), { status: 401 });
  }
};
