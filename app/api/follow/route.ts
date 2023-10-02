import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const body = await req.json();
  console.log(body);
  try {
    await prisma.follow.create({
      data: {
        followedbyEmail: body.followedByEmail,
        followedToEmail: body.followedToEmail,
      },
    });
    /* prisma.users.update({
      where: {
        id: body.followedById,
      },
      data: {
        following: {
          connect: {
            id: body.followedToId,
          },
        },
      },
    });

    prisma.users.update({
      where: {
        id: body.followedToId,
      },
      data: {
        followers: {
          connect: {
            id: body.followedById,
          },
        },
      },
    }); */
    return new NextResponse(JSON.stringify("updated"));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 403 });
  }
};
