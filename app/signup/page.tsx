"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" flex h-screen w-screen flex-col justify-center gap-4 dark:bg-darkTheme md:flex-row ">
      <div className=" -mt-20 flex flex-col items-center justify-center md:-ml-32">
        <Image
          src="/_6dd78af8-728b-43b4-9083-9b6eb8bb0017-removebg-preview.svg"
          width={300}
          height={300}
          alt="logo"
          className=" md:h-96 md:w-96"
        />
        <h1 className=" -mt-14 text-3xl font-bold">Blabstr</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-2">
        <form
          className=" flex flex-col items-center justify-center gap-4 p-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="email"
            className=" min-w-0 rounded-lg border-2 border-darkGray bg-transparent p-2"
            placeholder="Email"
          />
          <input
            type="password"
            className=" min-w-0 rounded-lg border-2 border-darkGray bg-transparent p-2"
            placeholder="Password"
          />
          <button
            type="submit"
            className=" mt-4 rounded-lg bg-lightGray p-2 px-14 font-semibold dark:bg-darkGray md:w-full"
            onClick={() => signIn("credential")}
          >
            Create Account
          </button>
        </form>
        <p className=" -my-3 text-xl font-semibold">or</p>
        <button
          className=" flex items-center gap-2 rounded-md bg-extraLightGray p-2 font-bold shadow-xl dark:bg-lightTheme dark:text-darkTheme md:w-full"
          onClick={() => signIn("google")}
        >
          <FcGoogle />
          SignUp with Google
        </button>
      </div>

      <div className=" absolute right-4 top-4">
        <ThemeToggleButton />
      </div>
    </main>
  );
}
