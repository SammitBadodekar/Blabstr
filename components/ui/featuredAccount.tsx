"use client";

import ProfileImage from "./profileImage";
import { Button } from "./button";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import axios from "axios";
import { User } from "../renderPages";
import { useEffect, useState } from "react";

const FeaturedAccount = ({ user }: { user: FeaturedAccount }) => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [following, setFollowing] = useState<any[]>([]);

  useEffect(() => {
    if (currentUser) {
      setFollowing(currentUser.following);
    }
  }, [currentUser]);

  let isFollowed = following?.some((users: User) => users.id === user.id);

  const handleFollow = async () => {
    console.log(isFollowed);
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
    <div className="flex w-full flex-wrap gap-2 p-2">
      <Link href={`/${user.tag}`}>
        <ProfileImage src={user.imageUrl} size={40} />
      </Link>
      <Link href={`/${user.tag}`}>
        <div className=" flex items-center gap-1">
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
      </Link>

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
        <Button className="ml-auto rounded-xl px-5" size="sm" variant="outline">
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
export default FeaturedAccount;

interface FeaturedAccount {
  id: string;
  name: string;
  imageUrl: string;
  tag: string;
  about: string;
  email: string;
  isVerified: boolean;
}
