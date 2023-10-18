"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className=" flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <p className=" text-3xl font-extrabold sm:text-4xl">
        Welcome to your Chats!
      </p>
      <p className="  text-darkGray dark:text-lightGray">
        Drop a line, share posts and more with private conversation between you
        and others on Blabstr
      </p>

      <Button
        className=" rounded-full text-lg font-extrabold"
        onClick={() => router.push("/create-chatRoom")}
      >
        Write a message
      </Button>
    </div>
  );
};

export default Page;
