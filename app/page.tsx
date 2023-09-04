"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session?.user);
    if (!session?.user) {
      router.push("/signin");
    }
    if (session?.user) {
      router.push("/home");
    }
  }, [session?.user]);

  return (
    <main className=" flex h-screen w-screen flex-col items-center justify-center gap-8 dark:bg-darkTheme">
      <Image
        src="/_6dd78af8-728b-43b4-9083-9b6eb8bb0017-removebg-preview.svg"
        width={500}
        height={500}
        alt="logo"
      />
      <h1 className=" text-3xl font-bold">Blabstr</h1>
    </main>
  );
}
