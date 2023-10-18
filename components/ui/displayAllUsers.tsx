"use client";

import axios from "axios";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import ProfileImage from "./profileImage";
import { MdVerified } from "react-icons/md";
import { User } from "../renderPages";

const DisplayAllUsers = ({ onClick }: { onClick: Function }) => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSearch = (searchInput: string) => {
    const searchResult: any[] = [];
    users.map((input: User) => {
      if (
        input?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        input?.tag?.toLowerCase().includes(searchInput.toLowerCase())
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
    <>
      <input
        type="text"
        className=" w-full rounded-full border-2 bg-lightTheme p-2 px-4 dark:bg-darkTheme"
        placeholder="Search People"
        onChange={(e) => debounceSearch(e.target.value)}
      />
      <div className=" mt-4 grid w-full ">
        {searchUsers.map((user) => {
          return (
            <button
              key={user?.id}
              onClick={() => {
                onClick(user);
                setSearchUsers(users);
              }}
              className="flex w-full flex-wrap gap-2 p-2"
            >
              <ProfileImage src={user.imageUrl} size={40} />
              <div className="flex flex-col items-start justify-start gap-0">
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
            </button>
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
    </>
  );
};

export default DisplayAllUsers;
