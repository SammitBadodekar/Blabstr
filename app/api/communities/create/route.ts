import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const body = await req.json();
  try {
    const community = await prisma.community.create({
      data: {
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        admin: {
          connect: {
            id: body.userId,
          },
        },
        members: {
          connect: {
            id: body.userId,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(community));
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("error"), { status: 401 });
  }
};
