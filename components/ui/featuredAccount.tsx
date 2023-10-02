"use client";

import ProfileImage from "./profileImage";
import { Button } from "./button";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import toast from "react-hot-toast";
import axios from "axios";
import { User } from "../renderPages";

const FeaturedAccount = ({ user }: { user: FeaturedAccount }) => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  let isFollowed = currentUser?.following?.some(
    (users: User) => users.id === user.id
  );

  const handleFollow = async () => {
    isFollowed = true;
    const { data } = await axios.put("/api/follow", {
      followedByEmail: currentUser.email,
      followedToEmail: user.email,
    });
    console.log(data);
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
        <p className="ml-auto rounded-xl border-2 px-3 text-center">
          Following
        </p>
      ) : user.email === currentUser.email ? (
        <p className="ml-auto rounded-xl px-3 text-center">You</p>
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
