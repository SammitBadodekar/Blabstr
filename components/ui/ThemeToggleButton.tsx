import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Toggle
      className={`w-full rounded-lg border-2  border-lightGray hover:bg-lightGray dark:hover:bg-slate-700`}
      onClick={() => {
        if (theme === "dark") setTheme("light");
        if (theme === "light") setTheme("dark");
      }}
    >
      {theme === "light" && (
        <ButtonInterior>
          <BsFillMoonStarsFill />
          <p className=" hidden lg:inline">Dark</p>
        </ButtonInterior>
      )}
      {theme === "dark" && (
        <ButtonInterior>
          <BsFillSunFill />
          <p className=" hidden lg:inline">Light</p>
        </ButtonInterior>
      )}
    </Toggle>
  );
};
export default ThemeToggleButton;

const ButtonInterior = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" -mx-1 flex  items-center gap-2 text-xs">{children}</div>
  );
};
