import axios from "axios";
import { useEffect, useState } from "react";
import ProfileImage from "./ui/profileImage";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

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
    <div>
      {posts.map((post: any) => {
        return (
          <div className=" m-2 flex gap-2 rounded-lg p-2">
            <ProfileImage src={post.user.imageUrl} size={50} />

            <div className=" flex flex-col gap-2">
              <p className=" font-bold">{post.user.name}</p>
              <p className=" max-w-sm  text-sm text-darkTheme dark:text-lightTheme">
                {post.text}
              </p>
              <div className=" mt-2 flex justify-around gap-4 border-b-2 pb-2">
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
