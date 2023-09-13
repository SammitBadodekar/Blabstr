"use client";

import ProfileImage from "@/components/ui/profileImage";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import EditProfile from "@/components/edit-profile";
import { useSearchParams } from "next/navigation";
import { User } from "@/components/renderPages";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DisplayPost from "@/components/displayPost";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import ProfileSkeleton from "@/components/skeletons/profileSkeleton";

const Page = ({ params }: { params: { tag: string } }) => {
  const [searchUser, SetSearchUser] = useState<User>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  const tab = searchParams.get("tab");

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`/api/users/getByTag/${params.tag}`);
      if (!user.data) router.push("/user-not-found");
      SetSearchUser(user.data);
    };
    getUser();
  }, []);

  const date = new Date(
    searchUser?.createdAt ? searchUser?.createdAt : "2023-09-11T07:14:21.552Z"
  );
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);

  if (!searchUser) {
    return <ProfileSkeleton />;
  }

  return (
    <div className=" relative flex w-full flex-col gap-4">
      {searchUser?.email === user.email && <EditProfile />}
      {searchUser?.bgImage ? (
        <Image
          src={
            searchUser?.bgImage ||
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
        <ProfileImage src={searchUser?.imageUrl || ""} size={120} />
      </div>
      <div className=" flex flex-col gap-4 border-b-2 px-4 pb-4">
        <p className=" text-2xl font-bold">{searchUser?.name}</p>
        <p className=" -mt-4 dark:text-darkGray">@{searchUser?.tag}</p>
        <p>{searchUser?.about}</p>
        <div className=" flex items-center gap-2 text-sm text-darkGray">
          <SlCalender /> <p>Joined on {formattedDate}</p>
        </div>
      </div>
      <div className=" sticky top-0 z-30 -mt-4 flex justify-around gap-4 bg-lightTransparent p-2 px-4 text-lg font-bold backdrop-blur-md dark:bg-darkTransparent">
        <Tabs text="blabs" tab={tab} searchUser={searchUser} />
        <Tabs text="replies" tab={tab} searchUser={searchUser} />
        <Tabs text="likes" tab={tab} searchUser={searchUser} />
      </div>
      {searchUser && (tab == "blabs" || !tab) && (
        <DisplayPost existingPosts={searchUser?.posts} />
      )}
    </div>
  );
};

export default Page;

const Tabs = ({
  searchUser,
  tab,
  text,
}: {
  searchUser: User | undefined;
  tab: string | null;
  text: string;
}) => {
  return (
    <Link
      href={`/${searchUser?.tag}?tab=${text}`}
      className={`${
        tab === text || (!tab && text === "blabs")
          ? "border-b-4 border-b-blue-500"
          : ""
      } `}
    >
      {text}
    </Link>
  );
};
