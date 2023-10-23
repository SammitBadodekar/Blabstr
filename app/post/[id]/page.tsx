"use client";

import { userState } from "@/state/atoms/userState";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Post from "@/components/ui/posts/post";
import toast from "react-hot-toast";
import Link from "next/link";
import { User } from "@/components/renderPages";
import FeaturedAccount from "@/components/ui/featuredAccount";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PostSkeleton from "@/components/skeletons/postSkeleton";
import MakeComment from "@/components/ui/posts/makeComment";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Comment from "@/components/ui/posts/comment";

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
      <div className=" sticky top-0 z-20  flex justify-around gap-4 bg-lightTransparent p-2 px-4 text-lg font-bold backdrop-blur-md dark:bg-darkTransparent">
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
              return (
                <Comment
                  comment={comment}
                  user={user}
                  setComments={setComments}
                  key={comment.id}
                />
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
