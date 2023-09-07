"use client";

import MakePost from "@/components/ui/makePost";
import Logo from "@/components/ui/logo";
import Post from "@/components/ui/post";

export default function Home() {
  return (
    <div className=" page w-full">
      <div className="sticky top-0 hidden w-full bg-lightTransparent p-2 text-center font-bold backdrop-blur-sm dark:bg-darkTransparent sm:block">
        Home
      </div>
      <div className=" flex justify-center sm:hidden">
        <Logo text={true} />
      </div>
      <MakePost />
      {/*  {Array(30).fill(<Post />)} */}
    </div>
  );
}
