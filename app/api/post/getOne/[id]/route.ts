import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const user = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    return new NextResponse("error");
  }
};
