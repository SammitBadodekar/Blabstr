"use client";

import React, { useState } from "react";
import Modal from "@/components/modal";
import { inputClassnames } from "@/components/inputClassNames";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import ProfileImage from "@/components/ui/profileImage";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { communityState } from "@/state/atoms/communityState";
import { Community } from "@/app/(communities)/communities/page";
import { userState } from "@/state/atoms/userState";

const CreateNewCommunity = () => {
  const [communities, setCommunities] = useRecoilState(communityState);
  const [user, setUser] = useRecoilState(userState);

  const [community, setCommunity] = useState<Community>({
    name: "",
    description: "",
    imageUrl: "/team-placeholder.png",
    members: [],
  });

  const router = useRouter();

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (community.name && community.description && user.id) {
      toast
        .promise(
          axios.post("/api/communities/create", {
            userId: user.id,
            ...community,
          }),
          {
            loading: "Creating...",
            success: <p>Created</p>,
            error: (
              <p>
                Community with name <b>"{community.name}"</b> already exists
              </p>
            ),
          }
        )
        .then((resp) => {
          if (resp.status === 200) {
            if (resp.status === 200) {
              setCommunities((prev) => [resp.data, ...prev]);
            }
            router.back();
          }
        });
    }
  };
  return (
    <form
      onSubmit={(e) => handleCreate(e)}
      className="dvh grid gap-2 overflow-y-scroll rounded-xl p-4 py-8 sm:p-8"
    >
      <p className=" text-center text-2xl font-extrabold">
        Create a new Community
      </p>
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        <ProfileImage
          src={community.imageUrl || "/team-placeholder.png"}
          size={100}
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            toast.success("successfully uploaded photo");
            setCommunity((prev) => ({
              ...prev,
              imageUrl: res ? res[0]?.url : prev.imageUrl,
            }));
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error(`Max size should be less than 16 MB`);
          }}
          className="dark:ut-allowed-content:text-lightTheme "
        />
      </div>
      <div className=" grid gap-2">
        <label htmlFor="">Name</label>
        <input
          type="text"
          className={`${inputClassnames}`}
          placeholder="Community name"
          value={community.name}
          onChange={(e) =>
            setCommunity((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </div>
      <div className=" mt-4 grid gap-2">
        <label htmlFor="">Description</label>
        <textarea
          name=""
          id=""
          cols={20}
          rows={3}
          className={`${inputClassnames} `}
          placeholder="About your community"
          value={community.description}
          onChange={(e) =>
            setCommunity((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        ></textarea>
      </div>
      <Button
        type="submit"
        className=" mt-4"
        disabled={community.name && community.description ? false : true}
      >
        Create
      </Button>
      <Button variant="outline" onClick={() => router.back()}>
        Cancel
      </Button>
    </form>
  );
};

export default CreateNewCommunity;
