"use client";

import React from "react";
import MakeCommunityPost from "@/components/ui/communities/makeCommunityPost";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const search = useSearchParams();

  const communityId = search.get("community");

  if (communityId)
    return (
      <div>
        <MakeCommunityPost id={communityId} />
      </div>
    );
};

export default Page;
