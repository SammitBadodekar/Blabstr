"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const redirectUser = (URL: string) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.push(URL);
  } else {
    router.push("/signin");
  }
};
