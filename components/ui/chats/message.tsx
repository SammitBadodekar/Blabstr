import { Messages } from "@/app/(chats)/chats/[id]/page";
import { User } from "@/components/renderPages";
import { formatDistanceToNowStrict } from "date-fns";
import React from "react";
import ProfileImage from "../profileImage";
import Image from "next/image";
import Link from "next/link";
import { InView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Message = ({
  message,
  user,
  handleDelete,
}: {
  message: Messages;
  user: User;
  handleDelete: (id: string) => void;
}) => {
  const date = new Date(message.createdAt);
  const timeAgo = formatDistanceToNowStrict(date, { addSuffix: true });

  const isAuthor = message.user.id === user.id;

  return (
    <div
      className={`flex gap-2 ${
        isAuthor ? " flex-row-reverse self-end" : ""
      } relative`}
    >
      <ProfileImage src={message.user.imageUrl} size={40} />
      <div
        className={` ${
          isAuthor ? " rounded-tr-none pr-6" : "rounded-tl-none"
        } w-fit rounded-xl  bg-slate-200 p-2 dark:bg-gray-800`}
      >
        <p className=" max-w-xs sm:max-w-sm">{message.text}</p>

        {message?.image && (
          <Link href={`/preview?src=${message?.image}`}>
            <Image
              src={message?.image}
              width={200}
              height={200}
              alt=""
              className="w-full max-w-lg self-start rounded-xl border-2 object-contain"
            />
          </Link>
        )}

        {message?.video && (
          <InView>
            {({ inView, ref, entry }) => (
              <div className=" flex justify-center rounded-xl" ref={ref}>
                <ReactPlayer
                  url={message?.video as string}
                  playing={inView}
                  controls={true}
                  width="auto"
                  height="auto"
                />
              </div>
            )}
          </InView>
        )}

        <p className=" pt-2 text-xs text-darkGray dark:text-lightGray">
          {timeAgo}
        </p>

        {isAuthor && (
          <Popover>
            <PopoverTrigger className=" absolute right-11 top-2">
              <BsThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className=" w-fit p-2 dark:bg-gray-500">
              <button
                onClick={() => handleDelete(message.id)}
                className={`flex items-center`}
              >
                <MdDeleteOutline />
                <p>Delete</p>
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Message;
