import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import Pusher from "pusher";

export const POST = async (req: any) => {
  const body = await req.json();
  try {
    const message = await prisma.messages.create({
      data: {
        chatRoomId: body.id,
        UserEmail: body.email,
        text: body.text,
        image: body.image,
        video: body.video,
      },
      include: {
        user: true,
      },
    });

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_APP_KEY!,
      secret: process.env.PUSHER_APP_SECRET!,
      cluster: "ap2",
      useTLS: true,
    });

    await pusher.trigger(body.id, "Message", JSON.stringify(message));

    await prisma.chatRoom.update({
      where: {
        id: body.id,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return new NextResponse(JSON.stringify(message));
  } catch (error) {
    return new NextResponse(JSON.stringify("error"));
  }
};
