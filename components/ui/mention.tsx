import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "../renderPages";
import DisplayAllUsers from "./displayAllUsers";

const Mention = ({
  isOpen,
  setIsOpen,
  setPost,
  text,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setPost: Function;
  text: string;
}) => {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className=" invisible absolute -top-12 w-full rounded-full border-2 p-2">
        Mention People
      </PopoverTrigger>
      <PopoverContent className=" h-40 w-full overflow-y-scroll bg-slate-300 dark:bg-gray-700">
        <DisplayAllUsers
          onClick={(user: User) => {
            setPost((prev: any) => ({
              ...prev,
              text: prev.text + user.tag,
            }));
            setIsOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Mention;
