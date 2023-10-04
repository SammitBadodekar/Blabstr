import Image from "next/image";
import React from "react";

const NothingHere = ({ variant }: { variant: "dog" | "poster" }) => {
  return (
    <div className=" flex w-full items-center justify-center p-8">
      <Image
        src={
          variant === "poster"
            ? "/91ea1147-b006-4f88-9bbd-134f5d077f1a.webp"
            : "/_44e8386d-b87c-48a8-9376-72783fb007b4.jpg"
        }
        width={300}
        height={300}
        alt="nothing here"
        className=" rounded-3xl"
      />
    </div>
  );
};

export default NothingHere;
