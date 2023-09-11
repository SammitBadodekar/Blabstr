"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";

const Page = () => {
  const { data: session } = useSession();
  const [user, setUser] = useRecoilState(userState);
  const [updatedUser, setUpdatedUser] = useState({
    createdAt: "",
    email: session?.user?.email || "",
    id: "",
    imageUrl:
      session?.user?.image ||
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010",
    bgImage: "",
    tag: "",
    name: session?.user?.name || "",
    about: "",
    password: "",
    updatedAt: "",
    posts: [],
    followers: [],
    following: [],
    savedPosts: [],
    likedPosts: [],
  });

  const router = useRouter();

  const inputClassnames =
    "rounded-lg dark:bg-darkTheme border-2 p-2 bg-lightTheme text-darkTheme dark:text-lightTheme";

  return (
    <form
      action=""
      className="flex h-screen flex-col gap-4 p-2 sm:items-center sm:justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (updatedUser?.name && updatedUser?.about) {
          setUser(updatedUser);
          toast.promise(axios.put("/api/users/update", updatedUser), {
            loading: "Saving...",
            success: <b>Successfully Updated profile</b>,
            error: <b>Could not Update profile</b>,
          });
          setTimeout(() => {
            router.push("/home");
          }, 1000);
        }
      }}
    >
      <div className=" pb-10 pt-1 sm:self-center">
        <Logo text={true} />
      </div>
      <div className=" absolute right-4 top-4">
        <ThemeToggleButton />
      </div>

      <div className="flex flex-col gap-2">
        <div className={` grid `}>
          <label htmlFor="" className=" text-darkGray dark:text-lightGray ">
            Username
          </label>
          <input
            type="text"
            placeholder="Your cool username"
            value={updatedUser.name || ""}
            className={`${inputClassnames} w-full`}
            required
            onChange={(e) =>
              setUpdatedUser((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className={` grid `}>
          <label htmlFor="" className=" text-darkGray dark:text-lightGray ">
            About
          </label>
          <textarea
            name="about"
            id=""
            cols={30}
            rows={3}
            className={`${inputClassnames}`}
            required
            placeholder="Anything about you"
            value={updatedUser?.about}
            onChange={(e) =>
              setUpdatedUser((prev) => ({
                ...prev,
                about: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className=" mt-10 flex items-center justify-between">
          <Button
            type="submit"
            className=" w-fit rounded-lg border-2 p-2 dark:bg-slate-300 dark:text-darkTheme"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Page;
