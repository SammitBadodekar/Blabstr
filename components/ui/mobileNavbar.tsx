import ThemeToggleButton from "./ThemeToggleButton";
import { BiHomeCircle, BiSearchAlt, BiBell, BiLogOut } from "react-icons/bi";
import { BsChatDots, BsPeople } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "./sidebar";

const MobileNavbar = () => {
  return (
    <div className=" fixed bottom-0 flex w-full items-center justify-around gap-2 bg-lightTheme p-2 dark:bg-darkTheme sm:hidden">
      <NavLinks text="Home" URL="/home">
        <BiHomeCircle />
      </NavLinks>
      <NavLinks text="Explore" URL="/explore">
        <BiSearchAlt />
      </NavLinks>
      <Link
        href="/post"
        className=" rounded-full bg-darkTheme p-2 px-4 text-lightTheme dark:bg-lightTheme dark:text-darkTheme"
      >
        <p className=" font-bold">+</p>
      </Link>
      <NavLinks text="Chats" URL="/chats">
        <BsChatDots />
      </NavLinks>
      <NavLinks text="Communities" URL="/communities">
        <BsPeople />
      </NavLinks>
    </div>
  );
};
export default MobileNavbar;
