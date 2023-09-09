"use client";

import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { Button } from "./button";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";

const MakePost = () => {
  const [post, setPost] = useState({ text: "" });
  const [user, setUser] = useRecoilState(userState);

  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email && post) {
      toast.promise(
        axios.post("/api/post/upload", { email: user.email, post }),
        {
          loading: "Uploading...",
          success: <b>Successfully Uploaded Post</b>,
          error: <b>Could not upload Post</b>,
        }
      );
      setPost({ text: "" });
    }
  };
  return (
    <div>
      <form
        className=" flex items-center gap-4 p-4"
        onSubmit={(e) => {
          handlePost(e);
        }}
      >
        <input
          type="text"
          placeholder="What's happening ?"
          className=" w-full rounded-full border-2 bg-lightTheme p-2 dark:bg-darkTheme"
          onChange={(e) => {
            setPost((prev) => ({ ...prev, text: e.target.value }));
          }}
        />
        <Button type="submit" className=" rounded-full font-bold">
          Post
        </Button>
      </form>{" "}
      <div className=" flex w-full items-center gap-4 px-8 pb-4">
        <PostMethod>
          <BsImages />
          <p>Images</p>
        </PostMethod>
        <PostMethod>
          <AiOutlineVideoCamera />
          <p>Video</p>
        </PostMethod>
      </div>
    </div>
  );
};
export default MakePost;

const PostMethod = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex  items-center gap-2 rounded-full border-2 p-2 text-sm">
      {children}
    </div>
  );
};
