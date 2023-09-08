import ThemeToggleButton from "./ThemeToggleButton";
import { BiHomeCircle, BiSearchAlt, BiBell, BiLogOut } from "react-icons/bi";
import { BsChatDots, BsPeople } from "react-icons/bs";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import ProfileImage from "./profileImage";

const MobileMenu = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div className=" flex h-screen w-full flex-col gap-4 bg-lightTheme p-4 dark:bg-darkTheme">
      {user?.imageUrl && (
        <NavLinks text="Profile" URL="/profile">
          <ProfileImage src={user?.imageUrl} size={40} />
        </NavLinks>
      )}
      <NavLinks text="Home" URL="/home">
        <BiHomeCircle />
      </NavLinks>
      <NavLinks text="Explore" URL="/explore">
        <BiSearchAlt />
      </NavLinks>
      <NavLinks text="Notifications" URL="/">
        <BiBell />
      </NavLinks>
      <NavLinks text="Chats" URL="/">
        <BsChatDots />
      </NavLinks>
      <NavLinks text="Communities" URL="/">
        <BsPeople />
      </NavLinks>

      <div className=" grid w-full   gap-4">
        <ThemeToggleButton />
        <Link
          href="/post"
          className=" flex w-full items-center justify-center gap-2 rounded-full bg-darkGray p-2 text-xs text-lightTheme dark:bg-extraLightGray dark:text-darkTheme"
        >
          <p className=" text-xl font-bold">+</p>
          <p className="hidden  font-medium lg:inline">Post</p>
        </Link>
      </div>

      <button className=" flex items-center gap-2" onClick={() => signOut()}>
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
    <Link href={URL} className=" flex items-center gap-3 text-lg">
      {children}
      <p>{text}</p>
    </Link>
  );
};
