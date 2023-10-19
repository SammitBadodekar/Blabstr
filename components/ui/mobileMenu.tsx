import ThemeToggleButton from "./ThemeToggleButton";
import { BiHomeCircle, BiSearchAlt, BiBell, BiLogOut } from "react-icons/bi";
import { BsBookmark, BsChatDots, BsPeople } from "react-icons/bs";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import ProfileImage from "./profileImage";

const MobileMenu = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div className=" dvh flex w-full flex-col gap-6 overflow-y-scroll bg-lightTheme p-4 px-8 dark:bg-darkTheme">
      {user?.imageUrl && (
        <NavLinks text="Profile" URL={`/${user?.tag}`}>
          <ProfileImage src={user?.imageUrl} size={40} />
        </NavLinks>
      )}

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

      <div className=" grid w-full gap-4">
        <ThemeToggleButton />
        <Link
          href="/post"
          className=" flex w-full items-center justify-center gap-2 rounded-full bg-darkTheme p-2 text-xs text-lightTheme dark:bg-extraLightGray dark:text-darkTheme"
        >
          <p className=" text-xl font-bold">+</p>
          <p className="font-medium ">Post</p>
        </Link>
      </div>

      <button
        className=" mt-auto flex items-center gap-2 text-lg font-extrabold"
        onClick={() => signOut()}
      >
        <BiLogOut />
        <p>SignOut</p>
      </button>
    </div>
  );
};

export default MobileMenu;

export const NavLinks = ({
  children,
  URL,
  text,
}: {
  children: React.ReactNode;
  URL: string;
  text: string;
}) => {
  return (
    <Link href={URL} className=" flex items-center gap-3 text-lg font-semibold">
      {children}
      <p>{text}</p>
    </Link>
  );
};
