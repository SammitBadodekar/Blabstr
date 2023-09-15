import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { tag: string } }
) => {
  const { tag } = params;
  try {
    const userByTag = await prisma.users.findFirst({
      where: {
        tag: tag,
      },
      include: {
        posts: {
          include: {
            user: true,
            likedBy: true,
            savedby: true,
          },
        },
        followers: true,
        following: true,
        savedPosts: true,
        likedPosts: true,
      },
    });
    return new NextResponse(JSON.stringify(userByTag));
  } catch (error) {
    return new NextResponse("error");
  }
};
