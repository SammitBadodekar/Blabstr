"use client";

import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { Button } from "../button";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import ReactPlayer from "react-player";
import { postState } from "@/state/atoms/postState";
import Mention from "../mention";
import EmojiSelector from "../emojiSeletor";
import { useRouter } from "next/navigation";

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

const MakePost = ({ redirect }: { redirect: boolean }) => {
  const [post, setPost] = useState({ text: "", image: "", video: "" });
  const [user, setUser] = useRecoilState(userState);
  const [posts, setPosts] = useRecoilState(postState);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.email && (post.text || post.image || post.video)) {
      toast
        .promise(axios.post("/api/post/upload", { email: user.email, post }), {
          loading: "Posting...",
          success: <p>Successfully Uploaded Post</p>,
          error: <b>Could not upload Post</b>,
        })
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            const newPost = response.data;
            setPosts((prev) => [
              {
                ...newPost,
                user,
              },
              ...prev,
            ]);
            setPost((prev) => ({ ...prev, text: "", image: "", video: "" }));
            if (redirect) router.back();
          }
        });
    }
  };
  return (
    <div>
      <form
        className=" flex items-center gap-1 p-4 sm:gap-2"
        onSubmit={(e) => {
          handlePost(e);
        }}
      >
        <textarea
          name="post"
          id=""
          cols={30}
          rows={1}
          placeholder="What's happening ?"
          value={post.text}
          className=" w-full rounded-3xl border-2 bg-lightTheme p-2 dark:bg-darkTheme sm:p-4"
          onChange={(e) => {
            if (e.target.value.slice(-1) === "@") {
              setIsOpen(true);
            }
            setPost((prev) => ({ ...prev, text: e.target.value }));
          }}
        ></textarea>

        <EmojiSelector setPost={setPost} />
        <Button type="submit" className=" rounded-3xl font-bold">
          Post
        </Button>
      </form>

      <div className=" relative grid w-full items-center justify-center">
        <Mention
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setPost={setPost}
          text={post.text}
        />
      </div>
      <p className=" px-8 pb-2 text-sm text-darkGray dark:text-lightGray">
        you can @mention other people
      </p>
      <div className=" flex w-full items-center gap-4 px-8 pb-4">
        <AlertDialog>
          <AlertDialogTrigger>
            <PostMethod>
              <BsImages />
              <p>Images</p>
            </PostMethod>
          </AlertDialogTrigger>
          <AlertDialogContent className=" h-screen overflow-y-scroll bg-slate-300  dark:bg-slate-800 sm:h-96">
            <AlertDialogHeader>
              <AlertDialogTitle className=" flex justify-center text-2xl">
                Upload Photo
              </AlertDialogTitle>
              <AlertDialogDescription className=" ">
                <form
                  className="flex flex-col  justify-center gap-4 pt-10"
                  onSubmit={(e) => {
                    handlePost(e);
                  }}
                >
                  {post.image && (
                    <Image
                      src={post.image}
                      width={200}
                      height={200}
                      alt=""
                      className=" h-40 w-full object-contain"
                    />
                  )}
                  <UploadButton
                    endpoint="imageUploader"
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
                    className="dark:ut-allowed-content:text-lightTheme"
                  />

                  <div className=" mt-10 grid">
                    <p>Caption</p>
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={3}
                      onChange={(e) => {
                        setPost((prev) => ({ ...prev, text: e.target.value }));
                      }}
                      placeholder="Caption for you post"
                      className="rounded-lg border-2 bg-lightTheme p-2  dark:bg-darkTheme "
                    ></textarea>
                  </div>
                  <AlertDialogAction type="submit" className=" mt-10">
                    Post
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <PostMethod>
              <AiOutlineVideoCamera />
              <p>Video</p>
            </PostMethod>
          </AlertDialogTrigger>
          <AlertDialogContent className=" h-screen overflow-y-scroll bg-slate-300  dark:bg-slate-800 sm:h-full">
            <AlertDialogHeader>
              <AlertDialogTitle className=" flex justify-center text-2xl">
                Upload Video
              </AlertDialogTitle>
              <AlertDialogDescription className=" ">
                <form
                  className="flex flex-col  justify-center gap-4 pt-10"
                  onSubmit={(e) => {
                    handlePost(e);
                  }}
                >
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

                  <UploadButton
                    endpoint="videoUploader"
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
                    className=" dark:ut-allowed-content:text-lightTheme"
                  />
                  <div className=" mt-10 grid">
                    <p>Caption</p>
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={3}
                      onChange={(e) => {
                        setPost((prev) => ({ ...prev, text: e.target.value }));
                      }}
                      placeholder="Caption for you post"
                      className="rounded-lg border-2 bg-lightTheme p-2  dark:bg-darkTheme "
                    ></textarea>
                  </div>
                  <AlertDialogAction type="submit" className=" mt-10">
                    Post
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
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
