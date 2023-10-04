import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const body = await req.json();
  try {
    if (body.userEmail === body.commentAuthor) {
      await prisma.comments.delete({
        where: {
          id: body.id,
        },
      });
      return new NextResponse(JSON.stringify("deleted"));
    } else throw new Error("unauthorized");
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 401 });
  }
};
