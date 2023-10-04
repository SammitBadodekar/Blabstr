"use client";

import { User } from "@/components/renderPages";
import axios from "axios";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import FeaturedAccount from "@/components/ui/featuredAccount";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [pageCounter, setPageCounter] = useState(21);

  const showUsers = (pageStart: number, pageEnd: number) => {
    setSearchUsers(users?.slice(pageStart, pageEnd));
  };

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
    if (searchInput.length === 0) {
      showUsers(pageCounter - 20, pageCounter);
    }
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
    <div className="page flex flex-col items-center justify-center gap-8 p-2 py-4 sm:p-8">
      <input
        type="text"
        className=" w-full rounded-full border-2 bg-lightTheme p-2 px-4 dark:bg-darkTheme"
        placeholder="Search People"
        onChange={(e) => debounceSearch(e.target.value)}
      />
      <div className=" w-full">
        {searchUsers.map((user) => {
          return <FeaturedAccount user={user} key={user.id} />;
        })}
      </div>
      <p
        className={`${
          searchUsers.length !== 0 ? "hidden" : ""
        } text-center text-xl font-extrabold `}
      >
        No one With That Name
      </p>
    </div>
  );
};
export default Page;
