"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import { inputClassnames } from "@/components/inputClassNames";
import { User } from "@/components/renderPages";

const Page = () => {
  const { data: session } = useSession();
  const [user, setUser] = useRecoilState(userState);
  const [updatedUser, setUpdatedUser] = useState<User>({
    createdAt: new Date(),
    email: "",
    id: "",
    imageUrl: "",
    bgImage: "",
    tag: "",
    name: "",
    about: "",
    password: "",
    updatedAt: new Date(),
    posts: [],
    followers: [],
    following: [],
    savedPosts: [],
    likedPosts: [],
    isVerified: false,
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
        imageUrl: `${
          data?.imageUrl
            ? data?.imageUrl
            : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
        }`,
        tag: data.tag,
      }));
    };
    if (session?.user?.email) {
      getId();
    }
  }, [session?.user]);

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
              if (resp.data === "updated") {
                setUser(updatedUser);
                router.push("/home");
              }
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
            value={updatedUser.tag}
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
