import axios from "axios";
import { useEffect, useState } from "react";
import ProfileImage from "./ui/profileImage";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Image from "next/image";

const DisplayPost = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await axios.get("/api/post/getMany");
      setPost(posts.data.reverse());
    };
    getPosts();
  }, []);

  return (
    <div className=" flex w-full flex-col ">
      {posts.map((post: any) => {
        return (
          <div className=" relative m-2 flex w-full gap-2 rounded-lg  p-4 pb-10">
            <ProfileImage src={post?.user?.imageUrl} size={50} />

            <div className=" flex w-full flex-col  gap-2 py-2 pr-4">
              <p className=" font-bold">{post?.user?.name}</p>
              {post.image && (
                <Image
                  src={post.image}
                  width={200}
                  height={200}
                  alt=""
                  className="w-full self-start rounded-xl object-contain "
                />
              )}
              <p className=" max-w-sm  text-sm text-darkTheme dark:text-lightTheme">
                {post?.text}
              </p>

              <div className=" absolute bottom-0 left-0 right-0  flex justify-around gap-4 border-b-2 pb-2 text-lightGray">
                <AiOutlineHeart />
                <FaRegComment />
                <BsBookmarkPlus />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPost;
