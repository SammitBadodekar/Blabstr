import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import Pusher from "pusher";

export const PUT = async (req: any) => {
  const body = await req.json();
  try {
    await prisma.messages.delete({
      where: {
        id: body.id,
      },
    });
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_APP_KEY!,
      secret: process.env.PUSHER_APP_SECRET!,
      cluster: "ap2",
      useTLS: true,
    });

    await pusher.trigger(
      body.chatRoomId,
      "Delete-Message",
      JSON.stringify({ id: body.id })
    );

    return new NextResponse(JSON.stringify("deleted"));
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 401 });
  }
};
