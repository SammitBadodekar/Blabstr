"use client";

import { UploadButton } from "@/utils/uploadthing";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { RiAttachment2 } from "react-icons/ri";
import TextareaAutosize from "react-textarea-autosize";
import { AiOutlineSend } from "react-icons/ai";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsImages } from "react-icons/bs";
import { Button } from "../button";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import Image from "next/image";
import ReactPlayer from "react-player";
import EmojiSelector from "../emojiSeletor";

const MakeMessage = ({
  chatRoomId,
  setLoadingMessage,
}: {
  chatRoomId: string;
  setLoadingMessage: Function;
}) => {
  const [post, setPost] = useState({
    text: "",
    image: "",
    video: "",
  });
  const [user, setUser] = useRecoilState(userState);

  const handleMessage = async () => {
    setPost({
      text: "",
      image: "",
      video: "",
    });
    setLoadingMessage(true);
    await axios.post("/api/chats/messages/new", {
      ...post,
      email: user.email,
      id: chatRoomId,
    });
  };

  return (
    <div className="relative flex w-full flex-nowrap items-center gap-2 p-2">
      <div className=" absolute -top-40">
        {post.image && (
          <Image
            src={post.image}
            width={50}
            height={50}
            alt="image"
            className=" h-40 w-full rounded-xl object-contain"
          />
        )}

        {post.video && (
          <div className=" flex h-10  w-fit justify-center">
            <ReactPlayer
              url={post.video}
              controls={true}
              width="10"
              height={200}
            />
          </div>
        )}
      </div>
      {(post.image || post.video) && (
        <Button
          className=" absolute -top-40 left-4 flex gap-1 rounded-full border-2 "
          variant="secondary"
          size="sm"
          onClick={() => {
            setPost((prev) => ({ ...prev, image: "", video: "" }));
          }}
        >
          Cancel
        </Button>
      )}

      <div className=" relative flex w-full">
        <div className=" absolute left-2 top-2">
          <EmojiSelector setPost={setPost} />
        </div>

        <TextareaAutosize
          placeholder="Write a message"
          value={post.text}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, text: e.target.value }))
          }
          className=" w-full rounded-3xl border-2 border-gray-500 bg-lightTheme p-2 pl-9 dark:bg-darkTheme"
        />
      </div>

      <Popover>
        <PopoverTrigger className=" text-2xl">
          <RiAttachment2 />
        </PopoverTrigger>
        <PopoverContent className=" grid w-fit gap-4 rounded-xl bg-slate-300 dark:bg-gray-700">
          <UploadButton
            endpoint="imageUploader"
            content={{
              button({ ready }) {
                if (ready)
                  return (
                    <div className=" flex items-center gap-2">
                      <BsImages />
                      Image
                    </div>
                  );

                return "loading...";
              },
            }}
            onClientUploadComplete={(res) => {
              setPost((prev) => ({
                ...prev,
                image: res ? res[0]?.url : prev.image,
              }));
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`Failed to upload`);
            }}
            className=" ut-button:w-fit ut-button:rounded-3xl ut-button:bg-lightTheme ut-button:p-4 ut-button:font-bold ut-button:text-darkTheme ut-allowed-content:hidden dark:ut-button:bg-slate-800 dark:ut-button:text-lightTheme "
          />
          <UploadButton
            endpoint="videoUploader"
            content={{
              button({ ready }) {
                if (ready)
                  return (
                    <div className=" flex items-center gap-2">
                      <AiOutlineVideoCamera />
                      Video
                    </div>
                  );

                return "loading...";
              },
            }}
            onClientUploadComplete={(res) => {
              setPost((prev) => ({
                ...prev,
                video: res ? res[0]?.url : prev.video,
              }));
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`video size should be less than 64MB`);
            }}
            className="ut-button:w-fit ut-button:rounded-3xl ut-button:bg-lightTheme ut-button:p-4 ut-button:font-bold ut-button:text-darkTheme ut-allowed-content:hidden dark:ut-button:bg-slate-800 dark:ut-button:text-lightTheme "
          />
        </PopoverContent>
      </Popover>
      <Button
        type="submit"
        className=" rounded-3xl font-bold"
        onClick={handleMessage}
        disabled={post.text || post.image || post.video ? false : true}
      >
        <AiOutlineSend />
      </Button>
    </div>
  );
};

export default MakeMessage;
