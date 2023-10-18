import { User } from "@/components/renderPages";
import { atom } from "recoil";

export const userState = atom<User>({
  key: "user",
  default: {
    createdAt: new Date(),
    email: "",
    id: "",
    imageUrl: "",
    bgImage: "",
    tag: "",
    name: "",
    about: "",
    password: "",
    updatedAt: new Date(),
    posts: [],
    followers: [],
    following: [],
    savedPosts: [],
    likedPosts: [],
    chatRooms: [],
    isVerified: false,
  },
});
