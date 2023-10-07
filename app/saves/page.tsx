"use client";

import React from "react";
import DisplayPost from "@/components/displayPost";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";

const Page = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <div>
      {user?.savedPosts && <DisplayPost existingPosts={user.savedPosts} />}
    </div>
  );
};

export default Page;
