import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const body = await req.json();
  try {
    prisma.users.update({
      where: {
        id: body.followedBy.id,
      },
      data: {
        following: body.followedBy.following,
      },
    });

    prisma.users.update({
      where: {
        id: body.followedTo.id,
      },
      data: {
        following: body.followedTo.following,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 403 });
  }
  return new NextResponse(JSON.stringify("updated"));
};
