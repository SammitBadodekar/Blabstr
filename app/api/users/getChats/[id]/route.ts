import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const chats = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        chatRooms: {
          include: {
            members: {
              where: {
                id: { not: id },
              },
              select: {
                name: true,
                imageUrl: true,
                tag: true,
                id: true,
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
