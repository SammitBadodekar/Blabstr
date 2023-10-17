import React, { useState } from "react";
import { Button } from "../button";
import axios from "axios";
import toast from "react-hot-toast";
import Mention from "../mention";
import EmojiSelector from "../emojiSeletor";

const MakeComment = ({
  postId,
  userEmail,
  setComments,
}: {
  postId: string;
  userEmail: string;
  setComments: Function;
}) => {
  const [comment, setComment] = useState({ text: "" });
  const [isOpen, setIsOpen] = useState(false);

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
          setComment({ text: "" });
        }
      });
  };
  return (
    <>
      <form
        className=" flex items-center gap-2 p-4"
        onSubmit={(e) => {
          handleComment(e);
        }}
      >
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={1}
          value={comment.text}
          onChange={(e) => {
            if (e.target.value.slice(-1) === "@") {
              setIsOpen(true);
            }
            setComment((prev) => ({ ...prev, text: e.target.value }));
          }}
          placeholder="What's your though on this ?"
          className=" w-full rounded-3xl border-2 bg-lightTheme p-4  dark:bg-darkTheme"
        ></textarea>

        <EmojiSelector setPost={setComment} />

        <Button type="submit" className=" rounded-full font-bold" size="sm">
          Post
        </Button>
      </form>
      <div className=" relative grid w-full items-center justify-center">
        <Mention
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setPost={setComment}
          text={comment.text}
        />
      </div>
    </>
  );
};

export default MakeComment;
