"use client";

import Link from "next/link";
import toast from "react-hot-toast";

const Page = () => {
  return (
    <div className=" flex flex-col gap-4 p-4 sm:p-8">
      <Link
        href="/create-community"
        className=" w-full rounded-full border-2 bg-darkTheme p-2 px-4 text-lg font-extrabold text-lightTheme dark:bg-lightTheme dark:text-darkTheme"
        /* onClick={() => toast("communities is in development")} */
      >
        Create a new community
      </Link>
    </div>
  );
};

export default Page;
