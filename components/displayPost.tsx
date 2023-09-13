import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import toast from "react-hot-toast";
import Post from "./ui/post";

const DisplayPost = ({ existingPosts }: { existingPosts: any }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  const handleDelete = async (id: string, postAuthor: string) => {
    toast.promise(
      axios.put("/api/post/delete", { id, userEmail: user.email, postAuthor }),
      {
        loading: "deleting...",
        success: <p>Post deleted ,reload to see changes</p>,
        error: <p>Unable to delete post</p>,
      }
    );
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
      const sortedPosts = existingPosts.sort((a: any, b: any): number => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setPosts(sortedPosts);
      setPosts(existingPosts);
    } else getPosts();
  }, []);

  return (
    <div className=" flex w-full flex-col ">
      {posts.map((post: any) => {
        const isAuthor = post?.user?.email === user?.email;

        return (
          <Post post={post} isAuthor={isAuthor} handleDelete={handleDelete} />
        );
      })}
    </div>
  );
};

export default DisplayPost;
