"use client";

import { User } from "@/components/renderPages";
import MultiplePostsSkeleton from "@/components/skeletons/multiplePostSkeleton";
import ProfileImage from "@/components/ui/profileImage";
import { communityState } from "@/state/atoms/communityState";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useRecoilState } from "recoil";

const Page = () => {
  const [communities, setCommunities] = useRecoilState(communityState);
  const [parent, enableAnimations] = useAutoAnimate();
  const [isLoading, setIsLoading] = useState<string>();

  useEffect(() => {
    const getCommunities = async () => {
      const { data } = await axios.get("/api/communities/getAll");
      setCommunities(data);
    };
    getCommunities();
  }, []);

  return (
    <div className=" flex flex-col gap-4 p-4 sm:p-8">
      <Link
        href="/create-community"
        className=" w-full rounded-full border-2 bg-darkTheme p-2 px-4 text-lg font-extrabold text-lightTheme dark:bg-lightTheme dark:text-darkTheme"
      >
        Create a new community
      </Link>

      {communities.length === 0 && <MultiplePostsSkeleton />}

      {communities.length > 0 && (
        <div className=" mt-4 grid gap-4" ref={parent}>
          {communities.map((community: Community) => {
            return (
              <div className=" gap-2 sm:flex" key={community.id}>
                <Link
                  href={`/communities/${community.id}`}
                  className=" flex gap-2"
                  onClick={() => setIsLoading(community.id)}
                >
                  <ProfileImage src={community.imageUrl} size={80} />
                  <div className=" w-full">
                    <p className=" text-lg font-bold">{community.name}</p>
                    <p className=" text-sm text-darkGray dark:text-lightGray">
                      {community.description}
                    </p>
                  </div>

                  {isLoading === community.id && (
                    <div className=" flex h-full items-center justify-center text-3xl">
                      <div className=" animate-spin">
                        <LiaSpinnerSolid />
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;

export interface Community {
  id?: string;
  name: string;
  members: User[];
  description: string;
  imageUrl: string;
}
