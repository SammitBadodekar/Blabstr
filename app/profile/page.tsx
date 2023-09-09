"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import ProfileImage from "@/components/ui/profileImage";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import EditProfile from "@/components/edit-profile";

/* dialog import from shadcn */

const Page = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div className=" relative flex w-full flex-col gap-4">
      <EditProfile />
      {user.bgImage ? (
        <Image
          src={
            user?.bgImage ||
            "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?cs=srgb&dl=pexels-francesco-ungaro-281260.jpg&fm=jpg"
          }
          width={100}
          height={50}
          alt=""
          className=" -z-20  h-24 w-full object-cover "
        />
      ) : (
        <div className=" h-24 w-full bg-blue-400"></div>
      )}

      <div className=" mx-4 -mt-16 w-fit rounded-full bg-lightTheme  dark:bg-darkTheme">
        <ProfileImage src={user?.imageUrl} size={120} />
      </div>
      <div className=" flex flex-col gap-4 px-4">
        <p className=" text-2xl font-bold">{user.name}</p>
        <p className=" -mt-4 dark:text-darkGray">@{user.email.split("@")[0]}</p>
        <p>{user.about}</p>
        <div className=" flex items-center gap-2 text-sm text-darkGray">
          <SlCalender /> <p>Joined on {user.createdAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
