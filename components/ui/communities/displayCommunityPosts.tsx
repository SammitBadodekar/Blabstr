"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { User } from "@/components/renderPages";
import Link from "next/link";
import ProfileImage from "../profileImage";
import { MdVerified } from "react-icons/md";
import { InView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { highlightMentions } from "../posts/post";
import { userState } from "@/state/atoms/userState";
import { useRecoilState } from "recoil";
import { formatDistanceToNowStrict } from "date-fns";
import { Button } from "../button";
import { DeleteCommunityPosts } from "@/app/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export interface CommunityPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  text?: string;
  image?: string;
  video?: string;
}

export default function DisplayCommunityPosts({
  CommunityPosts,
  id,
}: {
  CommunityPosts: CommunityPost[];
  id: string;
}) {
  const [user, setUser] = useRecoilState(userState);
  const [parent, enableAnimations] = useAutoAnimate();
  const router = useRouter();

  const [totalCommunityPosts, setTotalCommunityPosts] =
    useState(CommunityPosts);
  const messageTopRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    var pusher = new Pusher("fc45a802ecadfdc7433a", {
      cluster: "ap2",
    });
    scrollToTop();

    var channel = pusher.subscribe(id);
    channel.bind("CommunityPost", function (data: any) {
      console.log(data);
      setTotalCommunityPosts((prev) => [data, ...prev]);
    });

    return () => {
      channel.unbind("CommunityPost");
      pusher.unsubscribe("Community");
    };
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [totalCommunityPosts.length]);

  const scrollToTop = () => {
    messageTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-full w-full flex-col items-start gap-4" ref={parent}>
      {totalCommunityPosts.map((communityPost: CommunityPost, index) => {
        let text;
        const date = new Date(communityPost?.createdAt);
        const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });

        const isAuthor = user.email === communityPost.user.email;

        if (communityPost.text) {
          text = highlightMentions(communityPost?.text);
        }

        return (
          <div
            className={`${
              isAuthor ? " self-end" : ""
            }  flex w-full  max-w-sm gap-2 rounded-lg px-4 py-1`}
            ref={index === 0 ? messageTopRef : null}
          >
            <Link href={`/${communityPost?.user?.tag}`} className=" h-fit">
              <ProfileImage src={communityPost?.user?.imageUrl} size={50} />
            </Link>

            <div
              className={`relative flex w-full flex-col  gap-2 rounded-lg rounded-tl-none bg-slate-200 p-2 dark:bg-gray-800`}
            >
              <Link
                href={`/${communityPost?.user?.tag}`}
                className=" flex items-center gap-2"
              >
                <p className=" font-bold">{communityPost?.user?.name}</p>
                {communityPost?.user?.isVerified && (
                  <div className=" text-lg font-extrabold text-yellow-400">
                    <MdVerified />
                  </div>
                )}
              </Link>

              <p className=" -mt-2 text-xs text-darkGray dark:text-lightGray">
                @{communityPost?.user?.tag}
              </p>

              <p className=" max-w-xl text-darkTheme dark:text-lightTheme">
                {text}
              </p>

              {communityPost.image && (
                <Link href={`/preview?src=${communityPost.image}`}>
                  <Image
                    src={communityPost.image}
                    width={200}
                    height={200}
                    alt=""
                    className="w-full max-w-lg self-start rounded-xl border-2 object-contain"
                  />
                </Link>
              )}

              {communityPost.video && (
                <InView>
                  {({ inView, ref, entry }) => (
                    <div className=" flex justify-center rounded-xl" ref={ref}>
                      <ReactPlayer
                        url={communityPost.video}
                        playing={inView}
                        controls={true}
                        width="auto"
                        height="auto"
                      />
                    </div>
                  )}
                </InView>
              )}
              {isAuthor && (
                <Button
                  variant="secondary"
                  size="sm"
                  className=" absolute right-2 top-2 border-2 border-gray-500 p-2"
                  onClick={async () => {
                    toast
                      .promise(DeleteCommunityPosts(communityPost.id), {
                        loading: "Deleting...",
                        success: <p>Deleted</p>,
                        error: <p>Could not delete</p>,
                      })
                      .then(() => {
                        const updatedPosts = totalCommunityPosts.filter(
                          (post) => post.id !== communityPost.id
                        );
                        setTotalCommunityPosts(updatedPosts);
                      });
                  }}
                >
                  Delete
                </Button>
              )}

              <p className=" pt-2 text-xs text-darkGray dark:text-lightGray">
                {timeAgo}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
