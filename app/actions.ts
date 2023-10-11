"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { options } from "./api/auth/[...nextauth]/options";

export async function CommunityPost(
  post: FormData,
  image: string,
  video: string,
  id: string
) {
  "use server";

  const Pusher = require("pusher");

  const session = await getServerSession(options);
  const text = post.get("text");

  if (session?.user?.email) {
    const data = await prisma.communityPost.create({
      data: {
        text: text as string,
        image: image,
        video: video,
        UserEmail: session?.user?.email,
        communityId: id,
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

    await pusher.trigger(id, "CommunityPost", JSON.stringify(data));
  }
}
