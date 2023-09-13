"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

const Page = () => {
  const { data: session } = useSession();
  const [updatedUser, setUpdatedUser] = useState({
    createdAt: "",
    email: "",
    id: "",
    imageUrl: "",
    bgImage: "",
    tag: "",
    name: "",
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

  useEffect(() => {
    const getId = async () => {
      const { data } = await axios.get(`/api/users/${session?.user?.email}`);
      setUpdatedUser((prev) => ({
        ...prev,
        id: data?.id,
        about: data?.about || "",
        name: data?.name,
        email: data?.email,
        imageUrl: `${session?.user?.image}`,
        tag: data?.email?.split("@")[0],
      }));
    };
    if (session?.user?.email) {
      getId();
    }
  }, [session?.user]);

  const inputClassnames =
    "rounded-lg dark:bg-darkTheme border-2 p-2 bg-lightTheme text-darkTheme dark:text-lightTheme";

  return (
    <form
      action=""
      className="flex h-screen flex-col gap-4 p-2 sm:items-center sm:justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          updatedUser?.name &&
          updatedUser?.about &&
          updatedUser?.tag &&
          updatedUser?.id
        ) {
          toast
            .promise(axios.put("/api/users/update", updatedUser), {
              loading: "Saving...",
              success: <p>Successfully saved profile</p>,
              error: (
                <p>
                  @
                  {updatedUser.tag
                    ? updatedUser.tag
                    : updatedUser?.email?.split("@")[0]}{" "}
                  is already taken
                </p>
              ),
            })
            .then((resp) => {
              if (resp.data === "updated") router.push("/home");
            });
        }
      }}
    >
      <div className=" pb-4 pt-4 sm:self-center">
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
            @
          </label>
          <input
            type="text"
            placeholder="Your cool tag"
            value={
              updatedUser.tag
                ? updatedUser.tag
                : updatedUser?.email?.split("@")[0] || ""
            }
            className={`${inputClassnames} w-full`}
            required
            onChange={(e) =>
              setUpdatedUser((prev) => ({
                ...prev,
                tag: e.target.value,
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