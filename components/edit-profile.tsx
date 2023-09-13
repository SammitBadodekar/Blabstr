import { UploadButton } from "@/utils/uploadthing";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import ProfileImage from "@/components/ui/profileImage";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const EditProfile = () => {
  const [user, setUser] = useRecoilState(userState);
  const [updatedUser, setUpdatedUser] = useState(user);
  const router = useRouter();

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const inputClassnames =
    "rounded-lg dark:bg-darkTheme border-2 p-2 bg-lightTheme text-darkTheme dark:text-lightTheme";

  return (
    <div className=" absolute right-4 top-28 ">
      <AlertDialog>
        <AlertDialogTrigger className=" rounded-lg border-2 border-lightGray p-2 ">
          Edit Profile
        </AlertDialogTrigger>
        <AlertDialogContent className=" h-full overflow-x-hidden overflow-y-scroll  bg-slate-300 dark:bg-slate-800 sm:h-80 lg:h-96">
          <AlertDialogHeader>
            <AlertDialogTitle className=" text-center text-2xl font-bold">
              Edit Profile
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className=" flex flex-col gap-2 ">
            <div className=" flex w-full flex-col justify-center gap-2">
              <Image
                src={
                  updatedUser.bgImage ||
                  "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?cs=srgb&dl=pexels-francesco-ungaro-281260.jpg&fm=jpg"
                }
                width={200}
                height={30}
                alt="BG image "
                className=" h-24 w-full rounded-md object-cover "
              />

              <Button className=" -mt-20 mr-4 h-8 w-fit self-end overflow-hidden border-2 text-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    toast.success("successfully updated profile");
                    setUpdatedUser((prev) => ({
                      ...prev,
                      bgImage: res ? res[0]?.url : prev.imageUrl,
                    }));
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast.error(`Max size should be less than 16 MB`);
                  }}
                  className="pt-4"
                />
              </Button>
            </div>

            <div className=" -mt-8 ml-2 flex w-full flex-col justify-center gap-2 p-4 sm:ml-4">
              <ProfileImage
                src={
                  updatedUser.imageUrl ||
                  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                }
                size={100}
              />
              <Button className=" -ml-3 h-8 w-fit overflow-hidden">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    toast.success("successfully updated profile");
                    setUpdatedUser((prev) => ({
                      ...prev,
                      imageUrl: res ? res[0]?.url : prev.imageUrl,
                    }));
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast.error(`Max size should be less than 16 MB`);
                  }}
                  className="  pt-4"
                />
              </Button>
            </div>

            <form
              action=""
              className="flex flex-col gap-4 p-2 "
              onSubmit={(e) => {
                e.preventDefault();
                if (updatedUser.name && updatedUser.about && user.tag) {
                  toast
                    .promise(axios.put("/api/users/update", updatedUser), {
                      loading: "Saving...",
                      success: <p>Successfully Updated profile</p>,
                      error: <p>@{updatedUser.tag} already taken</p>,
                    })
                    .then((response) => {
                      if (response.data === "updated") {
                        setUser(updatedUser);
                        router.push(`/${updatedUser.tag}`);
                      }
                    });
                }
              }}
            >
              <div className={` grid `}>
                <label
                  htmlFor=""
                  className="text-darkTheme dark:text-lightTheme"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Your cool username"
                  value={updatedUser?.name}
                  className={`${inputClassnames}`}
                  required
                  onChange={(e) =>
                    setUpdatedUser((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className={` grid `}>
                <label
                  htmlFor=""
                  className="text-darkTheme dark:text-lightTheme"
                >
                  @
                </label>
                <input
                  type="text"
                  placeholder="Your cool username"
                  value={updatedUser?.tag}
                  className={`${inputClassnames}`}
                  required
                  onChange={(e) =>
                    setUpdatedUser((prev) => ({
                      ...prev,
                      tag: e.target.value,
                    }))
                  }
                />
                {""}
              </div>
              <div className={` grid `}>
                <label
                  htmlFor=""
                  className="text-darkTheme dark:text-lightTheme"
                >
                  About
                </label>
                <textarea
                  name="about"
                  id=""
                  cols={30}
                  rows={3}
                  className={`${inputClassnames}`}
                  required
                  placeholder="Anything about you"
                  value={updatedUser?.about}
                  onChange={(e) =>
                    setUpdatedUser((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className=" mt-10 flex items-center justify-between">
                <AlertDialogAction
                  type="submit"
                  className=" w-fit rounded-lg border-2 bg-darkTheme p-2 dark:bg-lightTheme dark:text-darkTheme"
                  disabled={
                    updatedUser.name && updatedUser.about && updatedUser.tag
                      ? false
                      : true
                  }
                >
                  Save
                </AlertDialogAction>
                <AlertDialogCancel>Back</AlertDialogCancel>
              </div>
            </form>
          </AlertDialogDescription>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditProfile;
