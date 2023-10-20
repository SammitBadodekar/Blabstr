import { chats } from "@/app/(chats)/chats/page";
import { Community } from "@/app/(communities)/communities/page";
import { atom } from "recoil";

export const chatState = atom<chats[]>({
  key: "chats",
  default: [],
});
