import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const revalidate = 5;

export const GET = async () => {
  try {
    const communities = await prisma.community.findMany();
    return new NextResponse(JSON.stringify(communities));
  } catch (error) {
    return new NextResponse("error");
  }
};
