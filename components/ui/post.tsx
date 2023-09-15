"use client";

import ProfileImage from "./profileImage";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import { useState } from "react";

const Post = ({
  post,
  isAuthor,
  handleDelete,
}: {
  post: any;
  isAuthor: boolean;
  handleDelete: Function;
}) => {
  const date = new Date(post?.createdAt);
  const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });
  const [user, setUser] = useRecoilState(userState);
  const [likes, setLikes] = useState([...Object.values(post.likedBy)]);
  const isLiked = likes.some((users: any) => users.id === user.id);

  const handleLike = (postId: string) => {
    if (!isLiked) {
      axios.put("/api/post/like", { postId, userId: user.id });
      setLikes((prev) => [user, ...prev]);
    }
    if (isLiked) {
      axios.put("/api/post/dislike", { postId, userId: user.id });
      const newLikes = likes.filter((like: any) => like.id !== user.id);
      setLikes(newLikes);
    }
  };

  return (
    <div className=" relative flex w-full  flex-col gap-2" key={post?.id}>
      <div className="flex w-full gap-2 rounded-lg  p-4">
        <Link href={`/${post?.user?.tag}`} className=" h-fit">
          <ProfileImage src={post?.user?.imageUrl} size={50} />
        </Link>

        <div className=" flex w-full flex-col  gap-2 pr-4">
          <Link href={`/${post?.user?.tag}`}>
            <p className=" font-bold">{post?.user?.name}</p>
          </Link>

          <p className=" -mt-2 text-xs text-darkGray dark:text-lightGray">
            {post?.user?.about?.slice(0, 30)}
            {post?.user?.about?.length > 30 ? "..." : ""}
          </p>

          <p className=" max-w-md text-darkTheme dark:text-lightTheme">
            {post?.text}
          </p>
          {post.image && (
            <Image
              src={post.image}
              width={200}
              height={200}
              alt=""
              className="w-full self-start rounded-xl border-2 object-contain"
            />
          )}
        </div>
      </div>

      <div className="  flex justify-around gap-4 pb-2 text-darkGray dark:text-lightGray">
        <div
          onClick={() => handleLike(post.id)}
          className=" flex items-center gap-2"
        >
          {isLiked ? <FcLike /> : <AiOutlineHeart />}
          <p>{likes.length}</p>
        </div>
        <div className=" flex items-center gap-2">
          <FaRegComment />
        </div>
        <div className=" flex items-center gap-2">
          <BsBookmarkPlus />
        </div>
      </div>
      <p className=" border-b-2 px-4 pb-2 text-xs text-darkGray dark:text-lightGray">
        {timeAgo}
      </p>
      {isAuthor && (
        <AlertDialog>
          <AlertDialogTrigger
            className={`absolute right-8 top-4 flex items-center rounded-lg border-2 bg-lightTheme p-2 dark:bg-darkTheme`}
          >
            <MdDeleteOutline /> <p className=" hidden sm:inline">Delete</p>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(post.id, post?.user?.email)}
              >
                Delete Post
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
export default Post;
