"use client";

import { useRef, useState } from "react";
import { Button } from "../button";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { useRouter } from "next/navigation";

import Image from "next/image";
import ReactPlayer from "react-player";
import Mention from "../mention";
import EmojiSelector from "../emojiSeletor";
import { useRecoilState } from "recoil";
import { communityPostState } from "@/state/atoms/CommunityPostState";
import { userState } from "@/state/atoms/userState";
import axios from "axios";

export default function MakeCommunityPost({ id }: { id: string }) {
  const [totalCommunityPosts, setTotalCommunityPosts] =
    useRecoilState(communityPostState);
  const [user, setUser] = useRecoilState(userState);
  const [post, setPost] = useState({
    text: "",
    image: "",
    video: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        toast.promise(
          axios.post("/api/communityPosts/create", {
            ...post,
            userEmail: user.email,
            id: id,
          }),
          {
            loading: "Posting...",
            success: <b>Posted</b>,
            error: <b>Could not Post.</b>,
          }
        );
        router.back();
        setPost({
          text: "",
          image: "",
          video: "",
        });
      }}
      ref={formRef}
      className=" w-full rounded-3xl bg-slate-200 p-2 dark:bg-gray-800 sm:p-8 "
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
          value={post.text}
          onChange={(e) => {
            if (e.target.value.slice(-1) === "@") {
              setIsOpen(true);
            }
            setPost((prev) => ({ ...prev, text: e.target.value }));
          }}
          placeholder="Write a post"
          className=" w-full rounded-3xl border-2 border-gray-500 bg-lightTheme p-2 dark:bg-darkTheme"
        ></textarea>

        <EmojiSelector setPost={setPost} />

        <Button
          type="submit"
          className=" rounded-3xl font-bold"
          disabled={post.text || post.image || post.video ? false : true}
        >
          Post
        </Button>
      </div>
      <Mention
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setPost={setPost}
        text={post.text}
      />
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
