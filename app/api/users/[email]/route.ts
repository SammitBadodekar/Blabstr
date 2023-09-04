import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async ({ email }: { email: string }) => {
  console.log(email);
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    return new NextResponse("error occurred while getting user", {
      status: 404,
    });
  }
};
