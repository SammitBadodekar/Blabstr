import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const body = await req.json();
  try {
    await prisma.users.update({
      where: {
        id: body.followedById,
      },
      data: {
        following: {
          disconnect: {
            id: body.followedToId,
          },
        },
      },
    });

    await prisma.users.update({
      where: {
        id: body.followedToId,
      },
      data: {
        followers: {
          disconnect: {
            id: body.followedById,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify("followed"));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 403 });
  }
};
