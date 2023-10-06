"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const src = searchParams.get("src");
  return (
    <Modal>
      <div className=" relative grid items-center justify-center">
        <button
          className=" absolute right-0 top-8 flex items-center gap-2 rounded-xl bg-darkTheme p-2 text-lightTheme sm:-right-12"
          onClick={() => router.back()}
        >
          <AiFillCloseCircle />
          <p className=" font-bold">Close</p>
        </button>

        {src && (
          <Image
            height={500}
            width={500}
            src={src}
            alt="image"
            className="dvh w-full rounded-3xl object-contain p-8"
          />
        )}
      </div>
    </Modal>
  );
};

export default Page;
