import React, { useState } from "react";
import { Button } from "./button";
import axios from "axios";
import toast from "react-hot-toast";

const MakeComment = ({
  postId,
  userEmail,
  setComments,
}: {
  postId: string;
  userEmail: string;
  setComments: Function;
}) => {
  const [comment, setComment] = useState("");
  const handleComment = (e: any) => {
    e.preventDefault();

    toast
      .promise(
        axios.post("/api/comments/new", {
          id: postId,
          email: userEmail,
          text: e.target[0].value,
        }),
        {
          loading: "posting...",
          success: <p>posted</p>,
          error: <p>Could not post</p>,
        }
      )
      .then((resp) => {
        if (resp.status === 200) {
          setComments((prev: Array<object>) => [resp.data, ...prev]);
          setComment("");
        }
      });
  };
  return (
    <form
      className=" flex items-center gap-4 p-4"
      onSubmit={(e) => {
        handleComment(e);
      }}
    >
      <textarea
        name="comment"
        id="comment"
        cols={30}
        rows={1}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What's your though on this ?"
        className=" w-full rounded-3xl border-2 bg-lightTheme p-4  dark:bg-darkTheme"
      ></textarea>
      <Button type="submit" className=" rounded-full font-bold" size="sm">
        Post
      </Button>
    </form>
  );
};

export default MakeComment;
