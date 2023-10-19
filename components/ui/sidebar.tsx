"use client";

import ThemeToggleButton from "./ThemeToggleButton";
import { BiHomeCircle, BiSearchAlt, BiBell, BiLogOut } from "react-icons/bi";
import { BsChatDots, BsPeople, BsBookmark } from "react-icons/bs";
import Link from "next/link";
import Logo from "./logo";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import ProfileImage from "./profileImage";

const Sidebar = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <aside className="col-start-1 hidden h-screen w-full flex-col items-center gap-4 overflow-x-hidden overflow-y-scroll border-r-2 border-lightGray bg-lightTheme px-4 py-8 text-xl font-bold dark:border-slate-800 dark:bg-darkTheme sm:col-end-3 sm:flex sm:gap-6 md:col-end-3 lg:col-end-3 lg:items-start">
      <Link href="/home">
        <Logo text={false} />
      </Link>
      <NavLinks text="Home" URL="/home">
        <BiHomeCircle />
      </NavLinks>
      <NavLinks text="Explore" URL="/explore">
        <BiSearchAlt />
      </NavLinks>
      <NavLinks text="Notifications" URL="/notifications">
        <BiBell />
      </NavLinks>
      <NavLinks text="Chats" URL="/chats">
        <BsChatDots />
      </NavLinks>
      <NavLinks text="Communities" URL="/communities">
        <BsPeople />
      </NavLinks>
      {user?.savedPosts && (
        <NavLinks text="Saves" URL="/saves">
          <BsBookmark />
        </NavLinks>
      )}
      {user?.imageUrl && (
        <NavLinks text="Profile" URL={`/${user.tag}`}>
          <ProfileImage src={user?.imageUrl} size={40} />
        </NavLinks>
      )}

      <div className=" grid w-full justify-center gap-4 lg:block">
        <ThemeToggleButton />
        <Link
          href="/post"
          className=" flex w-full items-center justify-center gap-2 rounded-full bg-darkTheme p-2 text-xs text-lightTheme dark:bg-extraLightGray dark:text-darkTheme lg:mt-4"
        >
          <p className=" text-xl font-bold">+</p>
          <p className="hidden  font-medium lg:inline">Post</p>
        </Link>
      </div>

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

export const NavLinks = ({
  children,
  URL,
  text,
}: {
  children: React.ReactNode;
  URL: string;
  text: string;
}) => {
  const pathname = usePathname();
  const active = pathname.split("/")[1];

  return (
    <Link
      href={URL}
      className={` ${
        active === text.toLocaleLowerCase()
          ? " text-2xl font-extrabold sm:text-base"
          : " text-lg font-normal sm:text-sm"
      } flex items-center gap-2 duration-300 ease-out `}
    >
      {children}
      <p className=" hidden lg:inline">{text}</p>
    </Link>
  );
};
