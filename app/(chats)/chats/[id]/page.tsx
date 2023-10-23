"use client";
import { User } from "@/components/renderPages";
import DisplayMessages from "@/components/ui/chats/displayMessages";
import MakeMessage from "@/components/ui/chats/makeMessage";
import ProfileImage from "@/components/ui/profileImage";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { LiaSpinnerSolid } from "react-icons/lia";

export interface Messages {
  id: string;
  text: string | null;
  image: string | null;
  video: string | null;
  createdAt: Date;
  chatRoomId?: string;
  user: User;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [messages, setMessages] = useState<Messages[]>();
  const [chatInfo, setChatInfo] = useState<User>();
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await axios.get(`/api/chats/messages/${params.id}`);
      setMessages(data.messages);
      setChatInfo(data.members[0]);
    };
    getMessages();
  }, []);

  if (!messages) {
    return (
      <div className=" dvh flex w-full items-center justify-center">
        <div className=" animate-spin text-5xl">
          <LiaSpinnerSolid />
        </div>
      </div>
    );
  }

  return (
    <div className=" dvh w-full overflow-hidden">
      <div className=" sticky top-0 z-10 flex items-center gap-4 bg-slate-100 p-2 font-extrabold shadow-md backdrop-blur-sm dark:bg-gray-900">
        <Link href="/chats">
          <BiArrowBack />
        </Link>

        <Link href={`/${chatInfo?.tag}`}>
          {chatInfo?.imageUrl && (
            <div className=" flex gap-2">
              <ProfileImage src={chatInfo?.imageUrl} size={50} />
              <div>
                <p>{chatInfo?.name}</p>
                <p className=" text-xs font-light text-darkGray dark:text-lightGray">
                  @{chatInfo?.tag}
                </p>
              </div>
            </div>
          )}
        </Link>
      </div>

      <DisplayMessages
        messages={messages}
        setMessages={setMessages}
        chatRoomId={params.id}
        setLoadingMessage={setLoadingMessage}
        loadingMessage={loadingMessage}
      />
      <MakeMessage
        chatRoomId={params.id}
        setLoadingMessage={setLoadingMessage}
      />
    </div>
  );
};

export default Page;
