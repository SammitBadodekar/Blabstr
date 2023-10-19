import { Messages } from "@/app/(chats)/chats/[id]/page";
import React from "react";
import ProfileImage from "../profileImage";

const DisplayMessages = ({ messages }: { messages: Messages[] }) => {
  return (
    <div className=" flex h-[calc(100dvh_-_7.5rem)] flex-col-reverse  overflow-y-scroll px-2">
      {messages.map((message: Messages) => {
        return (
          <div className=" flex gap-2">
            <ProfileImage src={message.user.imageUrl} size={40} />
            <div className=" w-fit rounded-3xl rounded-tl-none bg-slate-200 p-3 dark:bg-gray-800">
              <p>{message.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayMessages;
