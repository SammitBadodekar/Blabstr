import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Toggle
      className={`rounded-lg border-2 border-lightGray px-4 hover:bg-lightGray dark:hover:bg-slate-700`}
      onClick={() => {
        if (theme === "dark") setTheme("light");
        if (theme === "light") setTheme("dark");
      }}
    >
      {theme === "light" && (
        <ButtonInterior>
          <BsFillMoonStarsFill />
        </ButtonInterior>
      )}
      {theme === "dark" && (
        <ButtonInterior>
          <BsFillSunFill />
        </ButtonInterior>
      )}
    </Toggle>
  );
};
export default ThemeToggleButton;

const ButtonInterior = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex items-center gap-2 font-semibold">{children}</div>
  );
};
