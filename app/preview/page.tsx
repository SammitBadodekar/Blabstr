"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  const src = searchParams.get("src");
  return (
    <div className=" grid h-full items-center justify-center">
      {src && (
        <Image
          height={500}
          width={500}
          src={src}
          alt="image"
          className="dvh w-full object-contain"
        />
      )}
    </div>
  );
};

export default Page;
