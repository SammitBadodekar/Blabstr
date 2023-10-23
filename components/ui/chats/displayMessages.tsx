import { Messages } from "@/app/(chats)/chats/[id]/page";
import React, { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import { LiaSpinnerSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import axios from "axios";
import Message from "./message";

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
      className=" flex h-[calc(100dvh_-_8rem)] w-full flex-col-reverse gap-4 overflow-y-scroll px-2 sm:h-[calc(100dvh_-_7.5rem)]"
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
        messages.map((message: Messages) => {
          return (
            <Message
              message={message}
              user={user}
              handleDelete={handleDelete}
              key={message.id}
            />
          );
        })}
    </div>
  );
};

export default DisplayMessages;
