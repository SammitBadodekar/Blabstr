"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  if (theme)
    return (
      <SkeletonTheme
        baseColor={`${theme === "dark" ? "#202020" : "#ebebeb"}`}
        highlightColor={`${theme === "dark" ? "#444" : "#f5f5f5"}`}
      >
        <div
          className=" flex items-center gap-3 p-4 font-bold"
          onClick={() => router.push("/home")}
        >
          <AiOutlineArrowLeft />
          <p>Post</p>
        </div>
        <div className=" relative flex w-full flex-col gap-4">
          <div className="mt-2 flex items-center gap-4">
            <div className=" ml-4  h-12 w-12 self-start">
              <Skeleton circle={true} className=" h-full border-2" />
            </div>
            <div>
              <Skeleton width={200} />
            </div>
          </div>

          <div className=" flex flex-col gap-4 border-b-2 px-4 pb-4">
            <div className=" mx-4">
              <Skeleton count={2} />
            </div>

            <div className="mx-4 ">
              <Skeleton height={200} />
            </div>
          </div>
          <div className=" flex justify-around">
            <Skeleton width={90} height={30} />
            <Skeleton width={90} height={30} />
            <Skeleton width={90} height={30} />
          </div>
          <div className=" m-4 h-screen bg-lightTheme dark:bg-darkTheme">
            <Skeleton className=" my-2 h-14 w-full " />
            <Skeleton className=" my-2 h-14 w-full " />
            <Skeleton className=" my-2 h-14 w-full " />
            <Skeleton className=" my-2 h-14 w-full " />
            <Skeleton className=" my-2 h-14 w-full " />
          </div>
        </div>
      </SkeletonTheme>
    );
};

export default PostSkeleton;
