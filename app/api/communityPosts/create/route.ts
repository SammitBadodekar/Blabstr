import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import Pusher from "pusher";

export const POST = async (req: any) => {
  const body = await req.json();
  try {
    const data = await prisma.communityPost.create({
      data: {
        text: body.text,
        image: body.image,
        video: body.video,
        UserEmail: body.userEmail,
        communityId: body.id,
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

    await pusher.trigger(body.id, "CommunityPost", JSON.stringify(data));
    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("error"), { status: 401 });
  }
};
