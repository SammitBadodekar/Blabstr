import { Messages } from "@/app/(chats)/chats/[id]/page";
import React, { useEffect, useRef } from "react";
import ProfileImage from "../profileImage";
import Pusher from "pusher-js";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import Link from "next/link";
import Image from "next/image";
import { InView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { LiaSpinnerSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";

const DisplayMessages = ({
  messages,
  setMessages,
  chatRoomId,
  loadingMessage,
  setLoadingMessage,
}: {
  messages: Messages[] | undefined;
  setMessages: Function;
  chatRoomId: string;
  loadingMessage: boolean;
  setLoadingMessage: Function;
}) => {
  const [parent, enableAnimations] = useAutoAnimate();
  const messageTopRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    var pusher = new Pusher("fc45a802ecadfdc7433a", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe(chatRoomId);
    channel.bind("Message", function (data: any) {
      console.log(data);
      setLoadingMessage(false);
      setMessages((prev: Messages[]) => [data, ...prev]);
    });

    channel.bind("Delete-Message", function (data: any) {
      if (data.id) {
        setMessages((prev: Messages[]) =>
          prev.filter((post) => post.id !== data.id)
        );
      }
    });

    return () => {
      channel.unbind("Message");
      channel.unbind("Delete-Message");
      pusher.unsubscribe(chatRoomId);
    };
  }, []);

  const handleDelete = async (id: string) => {
    toast
      .promise(
        axios.put("/api/chats/messages/delete", {
          id,
          chatRoomId: chatRoomId,
        }),
        {
          loading: "deleting...",
          success: <p>Message deleted</p>,
          error: <p>Unable to delete message</p>,
        }
      )
      .then((response) => {
        if (response.data === "deleted") {
          setMessages((prev: Messages[]) =>
            prev.filter((post: any) => post?.id !== id)
          );
        }
      });
  };

  return (
    <div
      className=" flex h-[calc(100dvh_-_7.5rem)] w-full flex-col-reverse gap-4 overflow-y-scroll px-2"
      ref={parent}
    >
      {loadingMessage && (
        <div className=" w-fit self-end rounded-xl rounded-tr-none bg-slate-200 p-2 px-4 dark:bg-gray-800">
          <div className=" animate-spin text-3xl">
            <LiaSpinnerSolid />
          </div>
        </div>
      )}

      {messages &&
        messages.map((message: Messages, index) => {
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
                  isAuthor ? " rounded-tr-none" : "rounded-tl-none"
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
                      <div
                        className=" flex justify-center rounded-xl"
                        ref={ref}
                      >
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
                  <button
                    onClick={() => handleDelete(message.id)}
                    className={`absolute right-0 top-10 flex items-center rounded-lg border-2 border-slate-500 bg-lightTheme p-2 text-xs dark:bg-darkTheme`}
                  >
                    <MdDeleteOutline />
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DisplayMessages;
