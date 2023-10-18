"use client";

import React, { useState } from "react";
import DisplayAllUsers from "@/components/ui/displayAllUsers";
import { User } from "@/components/renderPages";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userState } from "@/state/atoms/userState";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import Modal from "@/components/modal";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Page = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const router = useRouter();
  return (
    <Modal>
      <div className=" h-96 overflow-y-scroll rounded-xl bg-slate-300 p-4  dark:bg-gray-800">
        <p className=" pb-4 text-xl font-bold">Create a new chat</p>
        <DisplayAllUsers
          onClick={(person: User) => {
            if (user.id !== person.id) {
              toast
                .promise(
                  axios.post("/api/chats/create", {
                    personId: person.id,
                    userId: user.id,
                  }),
                  {
                    loading: "Loading...",
                    success: <p></p>,
                    error: <p>Could not load</p>,
                  }
                )
                .then((resp) => {
                  if (resp.status === 200) {
                    router.back();
                    setTimeout(() => {
                      router.replace(resp.data);
                    }, 100);
                  }
                });
            } else toast.error("you cannot create chatRoom with yourself yet");
          }}
        />
      </div>
    </Modal>
  );
};

export default Page;
{
  /* <AlertDialog defaultOpen={true} open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger className={`${!isOpen ? " hidden" : ""}`}>
        Open
      </AlertDialogTrigger>
      <AlertDialogContent className=" h-96 overflow-y-scroll rounded-xl bg-slate-300 p-4 dark:bg-gray-800">
        <AlertDialogHeader className=" ">
          <div className="flex w-full items-center gap-4 ">
            <AlertDialogCancel
              onClick={() => router.back()}
              className=" rounded-full p-1 px-4 font-black"
            >
              X
            </AlertDialogCancel>
            <AlertDialogTitle className=" text-xl font-bold">
              Create a new chat
            </AlertDialogTitle>
          </div>

          
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog> */
}
