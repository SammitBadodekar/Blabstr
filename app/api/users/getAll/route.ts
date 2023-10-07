import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const revalidate = 5;

export const GET = async (req: Request) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: [
        {
          isVerified: "desc",
        },
        {
          name: "asc",
        },
      ],
    });
    return new NextResponse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    return new NextResponse("error");
  }
};
