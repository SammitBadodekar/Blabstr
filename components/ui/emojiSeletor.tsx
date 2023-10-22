"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdEmojiEmotions } from "react-icons/md";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";

const EmojiSelector = ({ setPost }: { setPost: Function }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger className=" mx-0 p-0 text-2xl">
        <MdEmojiEmotions />
      </PopoverTrigger>
      <PopoverContent className=" flex h-fit w-full justify-center overflow-visible p-0 dark:shadow-slate-800">
        <Picker
          data={data}
          perLine={7}
          maxFrequentRows={2}
          onEmojiSelect={(emoji: any) =>
            setPost((prev: any) => ({
              ...prev,
              text: prev.text + emoji.native,
            }))
          }
          theme={theme}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiSelector;
