import { CommunityPost } from "@/components/ui/communities/displayCommunityPosts";
import { atom } from "recoil";

export const communityPostState = atom<CommunityPost[]>({
  key: "communityPost",
  default: [],
});
