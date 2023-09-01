import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  const user = await req.json();

  const existingUser = await prisma.users.findFirst({
    where: { email: user.email },
  });

  if (user && !existingUser) {
    const createUser = await prisma?.users.create({
      data: {
        name: user?.name,
        imageUrl:
          user?.image ||
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010",
        password: user?.password || process.env.NEXTAUTH_SECRET,
        email: user?.email,
      },
    });
    return new NextResponse(JSON.stringify(createUser));
  } else {
    return new NextResponse(null, { status: 409 });
  }
};
