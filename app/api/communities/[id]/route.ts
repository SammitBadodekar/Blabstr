import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const community = await prisma.community.findUnique({
      where: {
        id: id,
      },
      include: {
        communityPosts: {
          include: {
            user: true,
          },
        },
        members: true,
        admin: true,
      },
    });
    return new NextResponse(JSON.stringify(community));
  } catch (error) {
    return new NextResponse("error");
  }
};
