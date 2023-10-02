"use client";

import ProfileImage from "@/components/ui/profileImage";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { MdVerified } from "react-icons/md";
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
import MultiplePostsSkeleton from "@/components/skeletons/multiplePostSkeleton";
import Comment from "@/components/ui/comment";
import Post from "@/components/ui/post";
import FeaturedAccount from "@/components/ui/featuredAccount";

const Page = ({ params }: { params: { tag: string } }) => {
  const [searchUser, SetSearchUser] = useState<User>();
  const [additionalUserInfo, SetAdditionalUserInfo] =
    useState<AdditionalUserInfo>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  const tab = searchParams.get("tab");

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(`/api/users/getByTag/${params.tag}`);
      if (!user.data) router.push("/user-not-found");
      SetSearchUser(user.data);
      const { data } = await axios.get(`/api/users/getPosts/${params.tag}`);
      SetAdditionalUserInfo(data);
    };
    getUser();
  }, [user]);

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
    <div className="page relative flex w-full flex-col gap-4">
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
        <div className=" flex items-center gap-2">
          <p className=" text-2xl font-bold">{searchUser?.name}</p>
          {searchUser.isVerified && (
            <div className=" text-2xl font-extrabold text-yellow-400">
              <MdVerified />
            </div>
          )}
        </div>

        <p className=" -mt-4 dark:text-darkGray">@{searchUser?.tag}</p>
        <p>{searchUser?.about}</p>
        <div className=" flex items-center gap-2 text-sm text-darkGray">
          <SlCalender /> <p>Joined on {formattedDate}</p>
        </div>
        <div className=" flex w-full gap-4 px-4">
          <Link
            className=" flex items-center gap-2"
            href={`/${searchUser?.tag}?tab=following`}
          >
            <span className=" text-xl font-bold">
              {searchUser.following?.length}
            </span>
            Following
          </Link>
          <Link
            className=" flex items-center gap-2"
            href={`/${searchUser?.tag}?tab=followers`}
          >
            <span className=" text-xl font-bold">
              {searchUser.followers?.length}
            </span>
            Followers
          </Link>
        </div>
      </div>

      <div
        className={`sticky top-0 z-30 -mt-4 flex justify-around gap-4 bg-lightTransparent p-2 px-4 text-lg font-bold backdrop-blur-md dark:bg-darkTransparent`}
      >
        <Tabs text="blabs" tab={tab} searchUser={searchUser} />
        <Tabs text="likes" tab={tab} searchUser={searchUser} />
        <Tabs text="replies" tab={tab} searchUser={searchUser} />
      </div>

      {tab === "following" && (
        <div>
          {searchUser.following?.map((users) => {
            return <FeaturedAccount user={users} />;
          })}
        </div>
      )}

      {tab === "followers" && (
        <div>
          {searchUser.followers?.map((users) => {
            return <FeaturedAccount user={users} />;
          })}
        </div>
      )}

      {additionalUserInfo && (tab == "blabs" || !tab) && (
        <DisplayPost existingPosts={additionalUserInfo?.posts} />
      )}
      {!additionalUserInfo && <MultiplePostsSkeleton />}
      {additionalUserInfo && tab == "likes" && (
        <DisplayPost existingPosts={additionalUserInfo?.likedPosts} />
      )}
      {additionalUserInfo?.comments && tab == "replies" && (
        <div>
          {additionalUserInfo.comments.map((comment: any) => {
            return (
              <div>
                <div className="">
                  <Post post={comment.post} isAuthor={false} />
                </div>

                <div className=" flex p-4">
                  <div className="">
                    <div className=" line-width h-20 bg-darkGray dark:bg-darkGray"></div>
                    <div className=" line-height w-8 bg-darkGray dark:bg-darkGray"></div>
                  </div>
                  <Comment comment={comment} user={user} />
                </div>
              </div>
            );
          })}
        </div>
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
      scroll={false}
    >
      {text}
    </Link>
  );
};

interface AdditionalUserInfo {
  posts: [];
  followers: [];
  following: [];
  savedPosts: [];
  likedPosts: [];
  comments: [];
}
