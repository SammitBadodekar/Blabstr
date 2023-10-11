"use client";

import { useRef, useState } from "react";
import { CommunityPost } from "@/app/actions";
import { Button } from "../button";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { RiAttachment2 } from "react-icons/ri";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsImages } from "react-icons/bs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import ReactPlayer from "react-player";

export default function MakeCommunityPost({ id }: { id: string }) {
  const [post, setPost] = useState({
    text: "",
    image: "",
    video: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await CommunityPost(formData, post.image, post.video, id);
        formRef.current?.reset();
        setPost({
          text: "",
          image: "",
          video: "",
        });
      }}
      ref={formRef}
      className="  w-full bg-lightTheme dark:bg-darkTheme "
    >
      {post.image && (
        <Image
          src={post.image}
          width={50}
          height={50}
          alt=""
          className=" h-40 w-full object-contain"
        />
      )}

      {post.video && (
        <div className=" flex justify-center">
          <ReactPlayer
            url={post.video}
            controls={true}
            width="auto"
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
          />
        </div>
      )}
      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <textarea
          name="text"
          id=""
          cols={30}
          rows={1}
          placeholder="Write a post"
          className=" w-full rounded-3xl border-2 border-gray-500 bg-lightTheme p-3 dark:bg-darkTheme"
        ></textarea>

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
                toast.success("successfully uploaded image");
                setPost((prev) => ({
                  ...prev,
                  image: res ? res[0]?.url : prev.image,
                }));
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`Failed to upload`);
              }}
              className=" ut-button:w-fit ut-button:rounded-3xl ut-button:bg-lightTheme ut-button:p-4 ut-button:font-bold ut-button:text-darkTheme ut-allowed-content:hidden dark:ut-button:bg-darkTheme dark:ut-button:text-lightTheme"
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
                toast.success("successfully uploaded video");
                setPost((prev) => ({
                  ...prev,
                  video: res ? res[0]?.url : prev.video,
                }));
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`video size should be less than 64MB`);
              }}
              className="ut-button:w-fit ut-button:rounded-3xl ut-button:bg-lightTheme ut-button:p-4 ut-button:font-bold ut-button:text-darkTheme ut-allowed-content:hidden dark:ut-button:bg-darkTheme dark:ut-button:text-lightTheme"
            />
          </PopoverContent>
        </Popover>
        <Button type="submit" className=" rounded-3xl font-bold">
          Post
        </Button>
      </div>
    </form>
  );
}
