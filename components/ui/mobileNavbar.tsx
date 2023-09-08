import ThemeToggleButton from "./ThemeToggleButton";
import { BiHomeCircle, BiSearchAlt, BiBell, BiLogOut } from "react-icons/bi";
import { BsChatDots, BsPeople } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavbar = () => {
  return (
    <div className="flex items-center justify-around gap-2 bg-lightTheme p-3 dark:bg-darkTheme sm:hidden">
      <Link
        href="/home"
        className=" flex flex-col items-center justify-center gap-2"
      >
        <BiHomeCircle />
      </Link>
      <Link
        href="/explore"
        className=" flex flex-col items-center justify-center gap-2"
      >
        <BiSearchAlt />
      </Link>
      <Link
        href="/post"
        className=" rounded-full bg-lightGray p-2 px-4 text-lightTheme dark:bg-lightTheme dark:text-darkTheme"
      >
        <p className=" font-bold">+</p>
      </Link>
      <Link
        href="/"
        className=" flex flex-col items-center justify-center gap-2"
      >
        <BsChatDots />
      </Link>
      <Link
        href="/"
        className=" flex flex-col items-center justify-center gap-2"
      >
        <BsPeople />
      </Link>
    </div>
  );
};
export default MobileNavbar;
