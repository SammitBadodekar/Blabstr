import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    createdAt: "",
    email: "",
    id: "",
    imageUrl: "",
    name: "",
    about:"",
    password: "",
    updatedAt: "",
  },
});
