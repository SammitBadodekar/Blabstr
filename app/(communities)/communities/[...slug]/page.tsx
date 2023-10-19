"use client";

import { redirect } from "next/navigation";
import DisplayCommunityPosts, {
  CommunityPost,
} from "@/components/ui/communities/displayCommunityPosts";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import ProfileImage from "@/components/ui/profileImage";
import FeaturedAccount from "@/components/ui/featuredAccount";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import { useEffect, useState } from "react";
import { Community } from "@prisma/client";
import { User } from "@/components/renderPages";
import CommunitySkeleton from "@/components/skeletons/communitySkeleton";

interface community extends Community {
  members: User[];
  communityPosts: CommunityPost[];
  admin: User[];
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const [user, setUser] = useRecoilState(userState);
  const [Community, setCommunity] = useState<community>();

  useEffect(() => {
    const getCommunity = async () => {
      const { data } = await axios.get(`/api/communities/${params.slug[0]}`);
      setCommunity(data);
    };
    getCommunity();
  }, []);

  if (!user) {
    redirect("/");
  }

  if (!Community) {
    return <CommunitySkeleton />;
  }

  return (
    <div className="page flex w-full flex-col">
      <Link
        href="/communities"
        className=" sticky top-0 z-10 bg-lightTransparent p-1 shadow-md backdrop-blur-sm dark:bg-darkTransparent"
      >
        <p className=" flex items-center gap-4 p-2 text-xl font-extrabold ">
          <BiArrowBack /> {Community?.name}
        </p>
      </Link>

      <div className="my-4 flex flex-col items-center justify-center gap-2 pb-2">
        {Community?.imageUrl && (
          <ProfileImage size={100} src={Community?.imageUrl} />
        )}

        <p className=" text-lg font-bold">{Community?.name}</p>
        <p className=" px-4 text-center text-sm text-darkGray dark:text-lightGray sm:px-8">
          {Community?.description}
        </p>
      </div>
      <div className=" mb-2 flex w-full justify-around gap-4 border-b-2 p-2">
        <Tabs communityId={Community?.id} tab={params.slug[1]} text="posts" />
        <Tabs communityId={Community?.id} tab={params.slug[1]} text="members" />
        <Tabs communityId={Community?.id} tab={params.slug[1]} text="admins" />
      </div>

      {(params.slug[1] === "posts" || !params.slug[1]) && (
        <DisplayCommunityPosts
          CommunityPosts={Community?.communityPosts as CommunityPost[]}
          id={params.slug[0]}
          admin={Community.admin}
        />
      )}

      {params.slug[1] === "members" && (
        <div>
          {Community?.members?.map((user: any) => {
            return <FeaturedAccount user={user} />;
          })}
        </div>
      )}

      {params.slug[1] === "admins" && (
        <div>
          {Community?.admin?.map((user: any) => {
            return <FeaturedAccount user={user} />;
          })}
        </div>
      )}

      <Link
        href={`/communityPost?community=${params.slug[0]}`}
        className=" sticky bottom-4 m-4 ml-auto w-fit rounded-full border-2 bg-darkTheme p-2 px-4 text-xl font-extrabold text-lightTheme dark:bg-lightTheme dark:text-darkTheme"
      >
        +
      </Link>
    </div>
  );
}

const Tabs = ({
  communityId,
  tab,
  text,
}: {
  communityId: string | undefined;
  tab: string | undefined;
  text: string;
}) => {
  return (
    <Link
      href={`/communities/${communityId}/${text}`}
      className={`${
        tab === text || (!tab && text === "posts")
          ? "border-b-4 border-b-blue-500"
          : ""
      } `}
      scroll={false}
    >
      <p className=" font-bold capitalize">{text}</p>
    </Link>
  );
};
