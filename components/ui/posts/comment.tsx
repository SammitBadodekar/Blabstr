import Link from "next/link";
import React from "react";
import ProfileImage from "../profileImage";
import { MdDeleteOutline, MdVerified } from "react-icons/md";
import { formatDistanceToNowStrict } from "date-fns";
import { User } from "../../renderPages";
import { Button } from "../button";
import toast from "react-hot-toast";
import axios from "axios";
import { highlightMentions } from "./post";

const Comment = ({
  comment,
  user,
  setComments,
}: {
  comment: any;
  user: any;
  setComments?: Function;
}) => {
  const isCommentAuthor = user?.email === comment?.user?.email;
  const date = new Date(comment?.createdAt);
  const timeAgo = formatDistanceToNowStrict(date, {
    addSuffix: true,
  });
  const text = highlightMentions(comment?.text);

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
        if (response.data === "deleted" && setComments) {
          setComments((prev: any) =>
            prev.filter((comment: any) => comment.id !== id)
          );
        }
      });
  };
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

        <p className=" max-w-xl text-darkTheme dark:text-lightTheme">{text}</p>
        <p className="text-xs text-darkGray dark:text-lightGray">{timeAgo}</p>
      </div>

      {isCommentAuthor && setComments && (
        <Button
          className={` ml-auto flex items-center gap-2 `}
          variant="secondary"
          onClick={() => handleCommentDelete(comment?.id, comment?.user?.email)}
        >
          <MdDeleteOutline />
          <p className=" hidden sm:inline">Delete</p>
        </Button>
      )}
    </div>
  );
};

export default Comment;
