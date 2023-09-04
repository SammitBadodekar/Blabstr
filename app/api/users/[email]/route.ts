import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return new NextResponse(JSON.stringify("hi"));
  } catch (error) {
    return new NextResponse("error");
  }
};
