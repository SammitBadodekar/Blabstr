import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const session = await getServerSession();
  try {
    if (session?.user?.email) {
      const messages = await prisma.chatRoom.findUnique({
        where: {
          id: id,
        },
        select: {
          members: {
            where: {
              email: { not: session?.user?.email },
            },
            select: {
              name: true,
              imageUrl: true,
              tag: true,
              id: true,
            },
          },
          messages: {
            include: {
              user: {
                select: {
                  name: true,
                  imageUrl: true,
                  tag: true,
                  id: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      return new NextResponse(JSON.stringify(messages));
    }
  } catch (error) {
    return new NextResponse("error");
  }
};
