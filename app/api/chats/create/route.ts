import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const body = await req.json();

  try {
    const members = [body.userId, body.personId];

    const existingChatRoom = await prisma.chatRoom.findFirst({
      where: {
        members: {
          every: {
            id: {
              in: members,
            },
          },
        },
      },
    });
    if (!existingChatRoom) {
      const chatRoom = await prisma.chatRoom.create({
        data: {
          members: {
            connect: [
              {
                id: body.userId,
              },
              {
                id: body.personId,
              },
            ],
          },
        },
      });
      return new NextResponse(JSON.stringify(`/chats/${chatRoom.id}`));
    }
    return new NextResponse(JSON.stringify(`/chats/${existingChatRoom.id}`));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("error"), { status: 401 });
  }
};
