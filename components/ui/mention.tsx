import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import debounce from "lodash.debounce";
import { User } from "../renderPages";
import FeaturedAccount from "./featuredAccount";
import { MdVerified } from "react-icons/md";
import ProfileImage from "./profileImage";

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
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSearch = (searchInput: string) => {
    const searchResult: any[] = [];
    users.map((input: User) => {
      if (
        input.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        input.tag.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        searchResult.push(input);
      }
    });
    setSearchUsers(searchResult);
  };

  const debounceSearch = debounce((searchInput) => {
    handleSearch(searchInput);
    setInput(searchInput);
  }, 500);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axios.get("/api/users/getAll");
      setSearchUsers(data);
      setUsers(data);
    };
    getAllUsers();
  }, []);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className=" invisible absolute -top-12 w-full rounded-full border-2 p-2">
        Mention People
      </PopoverTrigger>
      <PopoverContent className=" h-40 w-full overflow-y-scroll bg-slate-300 dark:bg-gray-700">
        <input
          type="text"
          className=" w-full rounded-full border-2 bg-lightTheme p-2 px-4 dark:bg-darkTheme"
          placeholder="Search People"
          onChange={(e) => debounceSearch(e.target.value)}
        />
        <div className=" mt-4 grid w-full ">
          {searchUsers.map((user) => {
            return (
              <div
                key={user?.id}
                onClick={() => {
                  setPost((prev: any) => ({
                    ...prev,
                    text: prev.text + user.tag,
                  }));
                  setIsOpen(false);
                  setSearchUsers(users);
                }}
                className="flex w-full flex-wrap gap-2 p-2"
              >
                <ProfileImage src={user.imageUrl} size={40} />
                <div>
                  <div className=" flex items-center gap-1" key={user.id}>
                    <p className=" text-xs font-bold">{user?.name}</p>
                    {user.isVerified && (
                      <div className=" text-lg text-yellow-400">
                        <MdVerified />
                      </div>
                    )}
                  </div>
                  <p className=" text-xs text-darkGray dark:text-lightGray">
                    @{user.tag}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className={`${
            searchUsers.length !== 0 ? "hidden" : ""
          } text-center text-xl font-extrabold `}
        >
          No one With That Name
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default Mention;
