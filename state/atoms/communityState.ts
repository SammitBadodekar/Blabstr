import { Community } from "@/app/(communities)/communities/page";
import { atom } from "recoil";

export const communityState = atom<Community[]>({
  key: "community",
  default: [],
});
