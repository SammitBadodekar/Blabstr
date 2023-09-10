"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    } else {
      router.push("/signin");
    }
  }, [status]);

  return (
    <main className=" flex h-screen w-screen flex-col items-center justify-center gap-8 overflow-hidden dark:bg-darkTheme">
      <Image
        src="/_6dd78af8-728b-43b4-9083-9b6eb8bb0017-removebg-preview.svg"
        width={300}
        height={300}
        alt="logo"
        className=" animate-pulse"
      />
      <h1 className=" text-3xl font-bold">Blabstr</h1>
    </main>
  );
}
