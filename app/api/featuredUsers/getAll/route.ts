import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async () => {
  try {
    const FeaturedUsers = await prisma.featuredUsers.findMany();
    return new NextResponse(JSON.stringify(FeaturedUsers));
  } catch (error) {
    return new NextResponse("error", { status: 404 });
  }
};
