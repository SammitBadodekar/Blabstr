"use client";

import { userState } from "@/state/atoms/userState";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Post from "@/components/ui/post";
import toast from "react-hot-toast";
import Link from "next/link";
import { User } from "@/components/renderPages";
import FeaturedAccount from "@/components/ui/featuredAccount";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PostSkeleton from "@/components/skeletons/postSkeleton";
import MakeComment from "@/components/ui/makeComment";
import ProfileImage from "@/components/ui/profileImage";
import { MdDeleteOutline, MdVerified } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formatDistanceToNowStrict } from "date-fns";

const Page = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [post, setPost] = useState<any>({});
  const [comments, setComments] = useState<any[]>([]);
  const [parent, enableAnimations] = useAutoAnimate();

  useEffect(() => {
    const getUser = async () => {
      const post = await axios.get(`/api/post/getOne/${params.id}`);
      setPost(post.data);
      const sortedComments = post.data.comments.sort(
        (a: any, b: any): number => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      );
      setComments(sortedComments);
    };
    getUser();
  }, []);

  const handleDelete = async (id: string, postAuthor: string) => {
    toast
      .promise(
        axios.put("/api/post/delete", {
          id,
          userEmail: user.email,
          postAuthor,
        }),
        {
          loading: "deleting...",
          success: <p>Post deleted</p>,
          error: <p>Unable to delete post</p>,
        }
      )
      .then((response) => {
        if (response.data === "deleted") {
          router.push("/home");
        }
      });
  };

  const handleCommentDelete = async (id: string, commentAuthor: string) => {
    toast
      .promise(
        axios.put("/api/comments/delete", {
          id,
          userEmail: user.email,
          commentAuthor,
        }),
        {
          loading: "deleting...",
          success: <p>comment deleted</p>,
          error: <p>Unable to delete post</p>,
        }
      )
      .then((response) => {
        if (response.data === "deleted") {
          setComments(comments.filter((comment) => comment.id !== id));
        }
      });
  };

  const tab = searchParams.get("tab");
  const isAuthor = post?.user?.email === user?.email;

  if (!post.id) {
    return <PostSkeleton />;
  }

  return (
    <div>
      <div
        className=" flex items-center gap-3 p-4 font-bold"
        onClick={() => router.push("/home")}
      >
        <AiOutlineArrowLeft />
        <p>Post</p>
      </div>
      {post.createdAt && (
        <Post post={post} isAuthor={isAuthor} handleDelete={handleDelete} />
      )}
      <div className=" sticky top-0  flex justify-around gap-4 bg-lightTransparent p-2 px-4 text-lg font-bold backdrop-blur-md dark:bg-darkTransparent">
        <Tabs text="likes" tab={tab} post={post} />
        <Tabs text="comments" tab={tab} post={post} />
      </div>
      {(!tab || tab === "likes") &&
        post?.likedBy?.map((user: User) => {
          return <FeaturedAccount user={user} />;
        })}
      {tab === "comments" && (
        <div ref={parent}>
          <MakeComment
            userEmail={user.email}
            postId={post.id}
            setComments={setComments}
          />
          <div className="flex w-full flex-col">
            {comments.map((comment) => {
              const isCommentAuthor = user?.email === comment?.user?.email;
              const date = new Date(comment?.createdAt);
              const timeAgo = formatDistanceToNowStrict(date, {
                addSuffix: true,
              });

              return (
                <div
                  className="flex w-full gap-2 rounded-lg  border-b-2 p-4"
                  key={comment?.id}
                >
                  <Link href={`/${comment?.user?.tag}`} className=" h-fit">
                    <ProfileImage src={comment?.user?.imageUrl} size={50} />
                  </Link>

                  <div className=" flex w-full flex-col  gap-2 pr-4">
                    <Link
                      href={`/${comment?.user?.tag}`}
                      className=" flex items-center gap-2"
                    >
                      <p className=" font-bold">{comment?.user?.name}</p>
                      {comment?.user?.isVerified && (
                        <div className=" text-lg font-extrabold text-yellow-400">
                          <MdVerified />
                        </div>
                      )}
                    </Link>

                    <p className=" -mt-2 text-xs text-darkGray dark:text-lightGray">
                      {comment?.user?.about?.slice(0, 30)}
                      {comment?.user?.about?.length > 30 ? "..." : ""}
                    </p>

                    <p className=" max-w-5xl text-darkTheme dark:text-lightTheme">
                      {comment?.text}
                    </p>
                    <p className="text-xs text-darkGray dark:text-lightGray">
                      {timeAgo}
                    </p>
                  </div>

                  {isCommentAuthor && (
                    <Button
                      className={` ml-auto flex items-center gap-2 `}
                      variant="secondary"
                      onClick={() =>
                        handleCommentDelete(comment?.id, comment?.user?.email)
                      }
                    >
                      <MdDeleteOutline />
                      <p className=" hidden sm:inline">Delete</p>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

const Tabs = ({
  post,
  tab,
  text,
}: {
  post: any;
  tab: string | null;
  text: string;
}) => {
  return (
    <Link
      href={`/post/${post?.id}?tab=${text}`}
      className={`${
        tab === text || (!tab && text === "likes")
          ? "border-b-4 border-b-blue-500"
          : ""
      } `}
      scroll={false}
    >
      {text}
    </Link>
  );
};
