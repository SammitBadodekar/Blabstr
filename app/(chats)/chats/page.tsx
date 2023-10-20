"use client";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import { Messages } from "@prisma/client";
import ProfileImage from "@/components/ui/profileImage";
import Link from "next/link";
import { truncateString } from "@/components/truncateString";
import MultiplePostsSkeleton from "@/components/skeletons/multiplePostSkeleton";
import { chatState } from "@/state/atoms/chatState";

export interface chats {
  id: string;
  members: { id: string; name: string; imageUrl: string; tag: string }[];
  messages: Messages[];
}

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [chats, setChats] = useRecoilState(chatState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getChats = async () => {
      const { data } = await axios.get(`/api/users/getChats/${user.id}`);
      setChats(data.chatRooms);
      setIsLoading(false);
    };
    getChats();
  }, [user]);

  if (isLoading) {
    return <MultiplePostsSkeleton />;
  }

  if (chats?.length === 0) {
    return (
      <div className=" flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
        <p className=" text-3xl font-extrabold sm:text-4xl">
          Welcome to your Chats!
        </p>
        <p className="  text-darkGray dark:text-lightGray">
          Drop a line, share posts and more with private conversation between
          you and others on Blabstr
        </p>

        <Button
          className=" rounded-full text-lg font-extrabold"
          onClick={() => router.push("/create-chatRoom")}
        >
          Write a message
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className=" mb-4 flex w-full items-center  justify-between border-b-2 p-4">
        <p className="  text-2xl font-bold">Chats</p>
        <Button
          className=" rounded-full text-lg font-extrabold"
          onClick={() => router.push("/create-chatRoom")}
          size="sm"
        >
          New chat
        </Button>
      </div>

      {chats?.map((chat: chats) => {
        return (
          <Link
            href={`/chats/${chat.id}`}
            className=" flex gap-2 p-3"
            key={chat.id}
          >
            {chat.members[0]?.imageUrl && (
              <>
                <ProfileImage src={chat.members[0]?.imageUrl} size={60} />
                <div>
                  <div className=" flex items-center justify-center gap-2 ">
                    <p className=" text-lg font-extrabold">
                      {truncateString(chat.members[0]?.name, 150)}
                    </p>
                    <p className=" text-darkGray dark:text-lightGray">
                      @{truncateString(chat.members[0]?.tag, 100)}
                    </p>
                  </div>
                  {chat.messages[0]?.text && (
                    <p className=" text-darkGray dark:text-lightGray">
                      {truncateString(chat.messages[0]?.text, 200)}
                    </p>
                  )}
                </div>
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Page;
