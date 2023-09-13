"use client";

import { useTheme } from "next-themes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  const { theme, setTheme } = useTheme();
  if (theme)
    return (
      <SkeletonTheme
        baseColor={`${theme === "dark" ? "#202020" : "#ebebeb"}`}
        highlightColor={`${theme === "dark" ? "#444" : "#f5f5f5"}`}
      >
        <div className=" relative flex w-full flex-col gap-4">
          <Skeleton className=" h-24  w-full object-cover " />
          <div className=" -mt-12 ml-4 h-28 w-28 self-start">
            <Skeleton circle={true} className=" h-full border-2" />
          </div>

          <div className=" flex flex-col gap-4 border-b-2 px-4 pb-4">
            <Skeleton count={3} />

            <div className="">
              <Skeleton />
            </div>
          </div>
          <div className=" m-4 h-screen ">
            <Skeleton className=" my-2 h-28 w-full" count={5} />
          </div>
        </div>
      </SkeletonTheme>
    );
};

export default ProfileSkeleton;
