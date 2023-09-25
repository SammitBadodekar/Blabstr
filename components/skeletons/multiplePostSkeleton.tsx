"use client";

import { useTheme } from "next-themes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MultiplePostsSkeleton = () => {
  const { theme, setTheme } = useTheme();
  if (theme)
    return (
      <SkeletonTheme
        baseColor={`${theme === "dark" ? "#202020" : "#ebebeb"}`}
        highlightColor={`${theme === "dark" ? "#444" : "#f5f5f5"}`}
      >
        <div className=" m-4 h-screen ">
          <Skeleton className=" my-2 h-28 w-full" count={5} />
        </div>
      </SkeletonTheme>
    );
};

export default MultiplePostsSkeleton;
