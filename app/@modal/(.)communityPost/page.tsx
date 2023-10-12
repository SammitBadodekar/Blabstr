"use client";

import React from "react";
import Modal from "@/components/modal";
import MakeCommunityPost from "@/components/ui/communities/makeCommunityPost";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const search = useSearchParams();

  const communityId = search.get("community");

  if (communityId)
    return (
      <Modal>
        <MakeCommunityPost id={communityId} />
      </Modal>
    );
};

export default Page;
