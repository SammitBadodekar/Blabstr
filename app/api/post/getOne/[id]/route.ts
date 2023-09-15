import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const post = await prisma.posts.findFirst({
      where: {
        id: id,
      },
      include: {
        likedBy: true,
        savedby: true,
        user: true,
      },
    });
    return new NextResponse(JSON.stringify(post));
  } catch (error) {
    return new NextResponse("error");
  }
};
