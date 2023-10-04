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
        comments: {
          include: {
            post: {
              include: {
                user: true,
                likedBy: true,
                savedby: true,
              },
            },
            user: true,
          },
        },
        replies: true,
        followers: true,
        following: true,
        likedPosts: {
          include: {
            user: true,
            likedBy: true,
            savedby: true,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(userByTag));
  } catch (error) {
    return new NextResponse("error");
  }
};
