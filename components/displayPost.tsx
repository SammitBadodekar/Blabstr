"use client";

import axios from "axios";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import toast from "react-hot-toast";
import Post from "./ui/posts/post";
import { postState } from "@/state/atoms/postState";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NothingHere from "./ui/nothingHere";

const DisplayPost = ({ existingPosts }: { existingPosts: any }) => {
  const [user, setUser] = useRecoilState(userState);
  const [posts, setPosts] = useRecoilState(postState);
  const [parent, enableAnimations] = useAutoAnimate();

  const handleDelete = async (id: string, postAuthor: string) => {
    toast
      .promise(
        axios.put("/api/post/delete", {
          id,
          userEmail: user.email,
          postAuthor,
        }),
        {
          loading: "deleting...",
          success: <p>Post deleted</p>,
          error: <p>Unable to delete post</p>,
        }
      )
      .then((response) => {
        if (response.data === "deleted") {
          const updatedPosts = posts.filter((post: any) => post?.id !== id);
          setPosts(updatedPosts);
        }
      });
  };

  useEffect(() => {
    const getPosts = async () => {
      const posts = await axios.get("/api/post/getMany");
      if (posts) {
        const sortedPosts = posts?.data?.sort((a: any, b: any): number => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setPosts(sortedPosts);
      }
    };
    if (existingPosts) {
      const sortedPosts = Object.values(existingPosts).sort(
        (a: any, b: any): number => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      );
      setPosts(sortedPosts);
    } else getPosts();
  }, []);

  if (posts.length === 0) return <NothingHere variant="dog" />;

  return (
    <div className=" flex w-full flex-col " ref={parent}>
      {posts.map((post: any) => {
        const isAuthor = post?.user?.email === user?.email;
        if (post?.createdAt) {
          return (
            <div key={post?.id}>
              <Post
                post={post}
                isAuthor={isAuthor}
                handleDelete={handleDelete}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default DisplayPost;
