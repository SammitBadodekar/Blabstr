"use client";

import { useTheme } from "next-themes";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CommunitySkeleton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <SkeletonTheme
      baseColor={`${theme === "dark" ? "#202020" : "#ebebeb"}`}
      highlightColor={`${theme === "dark" ? "#444" : "#f5f5f5"}`}
    >
      <div className=" relative flex w-full flex-col gap-4">
        <div className=" ml-4 mt-12 h-28 w-28 self-center">
          <Skeleton circle={true} className=" h-full border-2" />
        </div>

        <div className=" flex flex-col gap-4 border-b-2 px-4 pb-4">
          <Skeleton count={2} />
        </div>
        <div className=" m-4 h-screen ">
          <Skeleton className=" my-2 h-28 w-full" count={5} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CommunitySkeleton;
