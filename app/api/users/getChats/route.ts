import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession();
    const chats = await prisma.users.findFirst({
      where: {
        email: session?.user?.email!,
      },
      select: {
        chatRooms: {
          include: {
            members: {
              where: {
                email: { not: session?.user?.email! },
              },
              select: {
                name: true,
                imageUrl: true,
                tag: true,
                email: true,
              },
            },
            messages: {
              take: 1,
              orderBy: {
                createdAt: "desc",
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(chats));
  } catch (error) {
    return new NextResponse("error");
  }
};
