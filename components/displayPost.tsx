import axios from "axios";
import { useEffect, useState } from "react";
import ProfileImage from "./ui/profileImage";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import toast from "react-hot-toast";
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

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  const handleDelete = async (id: string) => {
    toast.promise(axios.put("/api/post/delete", { id }), {
      loading: "deleting...",
      success: <p>Post deleted ,reload to see changes</p>,
      error: <p>Unable to delete post</p>,
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      const posts = await axios.get("/api/post/getMany");
      setPosts(posts.data.reverse());
    };
    getPosts();
  }, []);

  return (
    <div className=" flex w-full flex-col ">
      {posts.map((post: any) => {
        const isAuthor = post.user.email === user.email;

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
            {isAuthor && (
              <AlertDialog>
                <AlertDialogTrigger
                  className={`absolute right-4 top-4 flex items-center rounded-lg border-2 p-1`}
                >
                  <MdDeleteOutline />{" "}
                  <p className=" hidden sm:inline"> Delete</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(post.id)}>
                      Delete Post
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPost;
