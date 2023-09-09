import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const user = await req.json();
  try {
    await prisma.users.update({
      where: {
        id: user?.id,
      },
      data: {
        name: user?.name,
        imageUrl: user?.imageUrl,
        about: user?.about,
        bgImage: user?.bgImage,
      },
    });
  } catch (error) {}

  return new NextResponse(JSON.stringify("Created New Account"));
};
