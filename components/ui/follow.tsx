"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import { FeaturedAccount } from "./featuredAccount";
import { User } from "../renderPages";
import axios from "axios";

const Follow = ({ user }: { user: FeaturedAccount }) => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [following, setFollowing] = useState<any[]>([]);

  useEffect(() => {
    if (currentUser) {
      setFollowing(currentUser.following);
    }
  }, [currentUser]);

  let isFollowed = following?.some((users: User) => users.id === user.id);

  const handleFollow = async () => {
    if (!isFollowed) {
      setFollowing((prev) => [user, ...prev]);
      await axios.put("/api/follow", {
        followedById: currentUser.id,
        followedToId: user.id,
      });
    }
    if (isFollowed) {
      const updatedFollow = following.filter(
        (users: User) => users.id !== user.id
      );
      setFollowing(updatedFollow);
      await axios.put("/api/unfollow", {
        followedById: currentUser.id,
        followedToId: user.id,
      });
    }
  };
  return (
    <div className=" ml-auto ">
      {isFollowed ? (
        <Button
          className="ml-auto rounded-xl border-2 border-lightGray px-2 dark:border-darkGray"
          size="sm"
          variant="secondary"
          onClick={handleFollow}
        >
          Following
        </Button>
      ) : user.email === currentUser.email ? (
        <Button
          className="ml-auto rounded-xl px-5"
          size="sm"
          variant="outline"
          disabled={true}
        >
          You
        </Button>
      ) : (
        <Button
          className="ml-auto rounded-xl px-3"
          size="sm"
          onClick={handleFollow}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default Follow;
