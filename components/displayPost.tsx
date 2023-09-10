import axios from "axios";
import { useEffect, useState } from "react";
import ProfileImage from "./ui/profileImage";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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
            <Link href={`/profile?id=${post?.user?.email}`}>
              <ProfileImage src={post?.user?.imageUrl} size={50} />
            </Link>

            <div className=" flex w-full flex-col  gap-2 pr-4">
              <Link href={`/profile?id=${post?.user?.email}`}>
                <p className=" font-bold">{post?.user?.name}</p>
              </Link>

              <p className=" -mt-2 text-xs text-lightGray">
                {post?.user?.about.slice(0, 30)}...
              </p>
              <p className=" max-w-sm text-darkTheme dark:text-lightTheme">
                {post?.text}
              </p>
              {post.image && (
                <Image
                  src={post.image}
                  width={200}
                  height={200}
                  alt=""
                  className="w-full self-start rounded-xl object-contain "
                />
              )}

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
