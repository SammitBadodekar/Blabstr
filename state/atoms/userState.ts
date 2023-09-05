import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    createdAt: "",
    email: "",
    id: "",
    imageUrl: "",
    name: "",
    password: "",
    updatedAt: "",
  },
});
