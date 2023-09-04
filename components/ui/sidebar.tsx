"use client";

import ThemeToggleButton from "./ThemeToggleButton";
import { BiHomeCircle, BiSearchAlt, BiBell, BiLogOut } from "react-icons/bi";
import { BsChatDots, BsPeople } from "react-icons/bs";
import Link from "next/link";
import Logo from "./logo";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  return (
    <aside className="col-start-1 hidden h-screen flex-col items-center gap-4 overflow-x-hidden overflow-y-scroll border-r-2 border-lightGray p-4 px-6 text-xl font-bold dark:border-slate-800 sm:col-end-3 sm:flex md:col-end-3 md:w-full lg:col-end-3 lg:items-start">
      <Logo text={false} />
      <Link href="/home" className=" flex items-center gap-2">
        <BiHomeCircle />
        <p className=" hidden text-xs font-medium lg:inline">Home</p>
      </Link>
      <Link href="/explore" className=" flex items-center gap-2">
        <BiSearchAlt />
        <p className=" hidden text-xs font-medium lg:inline">Explore</p>
      </Link>
      <Link href="/" className=" flex items-center gap-2">
        <BiBell />
        <p className=" hidden text-xs font-medium lg:inline">Notifications</p>
      </Link>
      <Link href="/" className=" flex items-center gap-2">
        <BsChatDots />
        <p className=" hidden text-xs font-medium lg:inline">Chats</p>
      </Link>
      <Link href="/" className=" flex items-center gap-2">
        <BsPeople />
        <p className=" hidden text-xs font-medium lg:inline">Communities</p>
      </Link>

      <ThemeToggleButton />
      <Link
        href="/post"
        className=" flex w-full items-center justify-center gap-2 rounded-full bg-darkGray p-1 text-xs text-lightTheme dark:bg-extraLightGray dark:text-darkTheme"
      >
        <p className=" text-xl font-bold">+</p>
        <p className="hidden text-xs font-medium lg:inline">Post</p>
      </Link>

      <button
        className=" mt-auto flex items-center gap-2"
        onClick={() => signOut()}
      >
        <BiLogOut />
        <p className=" hidden text-xs font-medium lg:inline">SignOut</p>
      </button>
    </aside>
  );
};
export default Sidebar;
