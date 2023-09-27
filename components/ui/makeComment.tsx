import React from "react";
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
        console.log(resp);
        if (resp.status === 200) {
          setComments((prev: Array<object>) => [resp.data, ...prev]);
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
        rows={2}
        placeholder="What's your though on this ?"
        className=" w-full rounded-2xl border-2 bg-lightTheme p-2 dark:bg-darkTheme"
      ></textarea>
      <Button type="submit" className=" rounded-full font-bold">
        Comment
      </Button>
    </form>
  );
};

export default MakeComment;
