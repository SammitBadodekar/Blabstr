"use client";

import { useRef, useState } from "react";
import { CommunityPost } from "@/app/actions";
import { Button } from "../button";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { useRouter } from "next/navigation";

import Image from "next/image";
import ReactPlayer from "react-player";

export default function MakeCommunityPost({ id }: { id: string }) {
  const [post, setPost] = useState({
    text: "",
    image: "",
    video: "",
  });

  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        toast.promise(CommunityPost(formData, post.image, post.video, id), {
          loading: "Posting...",
          success: <p>Posted</p>,
          error: <p>Could not Post</p>,
        });
        formRef.current?.reset();
        setPost({
          text: "",
          image: "",
          video: "",
        });
        router.back();
      }}
      ref={formRef}
      className=" w-full rounded-3xl bg-slate-200 p-2 dark:bg-gray-700 sm:p-8 "
    >
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
      <div className="flex items-center justify-between gap-2 px-4 py-8 pb-2 ">
        <textarea
          name="text"
          id=""
          cols={30}
          rows={1}
          placeholder="Write a post"
          className=" w-full rounded-3xl border-2 border-gray-500 bg-lightTheme p-2 dark:bg-darkTheme"
        ></textarea>

        <Button type="submit" className=" rounded-3xl font-bold">
          Post
        </Button>
      </div>
      <div className=" flex gap-4 p-4">
        {!post.video && (
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
        )}

        {!post.image && (
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
        )}
      </div>
    </form>
  );
}
