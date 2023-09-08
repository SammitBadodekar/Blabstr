import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    createdAt: "",
    email: "",
    id: "",
    imageUrl: "",
    bgImage: "",
    tag: "",
    name: "",
    about: "",
    password: "",
    updatedAt: "",
  },
});
