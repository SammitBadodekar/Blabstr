"use client";

import React, { useEffect, useState } from "react";
import { User } from "../renderPages";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FeaturedAccount, { FeaturedAccountType } from "./featuredAccount";
import MultiplePostsSkeleton from "../skeletons/multiplePostSkeleton";
import DisplayPost from "../displayPost";
import Post from "./posts/post";
import Comment from "./posts/comment";
import NothingHere from "./nothingHere";
import axios from "axios";

const AdditionalUserInfo = ({
  searchUser,
  tag,
}: {
  searchUser: User;
  tag: string;
}) => {
  const [additionalUserInfo, SetAdditionalUserInfo] =
    useState<AdditionalUserInfo>();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    const getAdditionalUserInfo = async () => {
      const { data } = await axios.get(`/api/users/getPosts/${tag}`);
      SetAdditionalUserInfo(data);
    };
    getAdditionalUserInfo();
  }, [searchUser]);

  return (
    <div>
      <div
        className={`sticky top-0 z-30 -mt-4 flex justify-around gap-4 bg-lightTransparent p-2 px-4 text-lg font-bold backdrop-blur-md dark:bg-darkTransparent`}
      >
        <Tabs text="blabs" tab={tab} searchUser={searchUser} />
        <Tabs text="likes" tab={tab} searchUser={searchUser} />
        <Tabs text="replies" tab={tab} searchUser={searchUser} />
      </div>

      {tab === "following" && (
        <div className=" grid gap-2">
          <p className=" p-4 text-2xl font-bold">Following:</p>
          {searchUser.following?.map((user: FeaturedAccountType) => {
            return <FeaturedAccount user={user} key={user.id} />;
          })}
          {searchUser.following?.length === 0 && <NothingHere variant="dog" />}
        </div>
      )}

      {tab === "followers" && (
        <div className=" grid gap-2">
          <p className="p-4 text-2xl font-bold">Followers:</p>
          {searchUser.followers?.map((user: FeaturedAccountType) => {
            return <FeaturedAccount user={user} key={user.id} />;
          })}
          {searchUser.followers?.length === 0 && <NothingHere variant="dog" />}
        </div>
      )}

      {additionalUserInfo && (tab == "blabs" || !tab) && (
        <DisplayPost existingPosts={additionalUserInfo?.posts} />
      )}
      {!additionalUserInfo &&
        (tab == "blabs" || tab === "likes" || tab === "replies" || !tab) && (
          <MultiplePostsSkeleton />
        )}
      {additionalUserInfo && tab == "likes" && (
        <DisplayPost existingPosts={additionalUserInfo?.likedPosts} />
      )}
      {additionalUserInfo?.comments && tab == "replies" && (
        <div>
          {additionalUserInfo.comments.map((comment: any) => {
            return (
              <div key={comment.id}>
                <div className="">
                  <Post post={comment.post} isAuthor={false} />
                </div>

                <div className=" flex p-4">
                  <div className="">
                    <div className=" line-width h-20 bg-darkGray dark:bg-darkGray"></div>
                    <div className=" line-height w-8 bg-darkGray dark:bg-darkGray"></div>
                  </div>
                  <Comment comment={comment} user={searchUser} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdditionalUserInfo;

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
  posts: any[];
  followers: any[];
  following: any[];
  likedPosts: any[];
  comments: any[];
}
