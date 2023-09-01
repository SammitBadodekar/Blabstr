"use client";

import Image from "next/image";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className=" flex h-screen w-screen flex-col items-center justify-center gap-8 dark:bg-darkTheme">
      <Image
        src="/_6dd78af8-728b-43b4-9083-9b6eb8bb0017-removebg-preview.svg"
        width={300}
        height={300}
        alt="logo"
      />
      <h1 className=" text-3xl font-bold">Blabstr</h1>
      <ThemeToggleButton />
      <button onClick={() => signOut()}>signOut</button>
    </main>
  );
}
