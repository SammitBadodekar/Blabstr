import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  const { email } = params;
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      const userByTag = await prisma.users.findFirst({
        where: {
          tag: email,
        },
        include: {
          posts: {
            include: {
              user: true,
            },
          },
          followers: true,
          following: true,
          savedPosts: true,
          likedPosts: true,
        },
      });
      return new NextResponse(JSON.stringify(userByTag));
    }
    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    return new NextResponse("error");
  }
};
