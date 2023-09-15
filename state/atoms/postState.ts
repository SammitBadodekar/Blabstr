import { atom } from "recoil";

export const postState = atom<object[] | unknown[]>({
  key: "post",
  default: [],
});
