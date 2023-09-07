"use client";
 
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";
 
import { UploadButton } from "@/utils/uploadthing";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import ProfileImage from "@/components/ui/profileImage";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
 
export default function Home() {
const [user,setUser ] = useRecoilState(userState)
const [updatedUser, setUpdatedUser] = useState(user)

console.log(updatedUser)

const inputClassnames = "rounded-lg dark:bg-darkTheme border-2 p-2 bg-lightTheme"

  return (
    <div className=" flex flex-col justify-center items-center h-screen gap-8">
      <div className="flex flex-col gap-4 justify-center items-center w-full">
      <ProfileImage src={updatedUser?.imageUrl} size={150}/>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          axios.put("/api/users/update",updatedUser)
          toast.success("successfully updated profile")
          setUpdatedUser((prev)=> ({...prev,imageUrl: res? res[0]?.url : prev.imageUrl }))
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(`Failed to upload`);
        }}
      />
      </div>
      <form action="" className="p-2 flex flex-col gap-4 " onSubmit={(e)=>{
        e.preventDefault()
        axios.put("/api/users/update",updatedUser)
      }}>
        <input type="text" placeholder="username" className={inputClassnames} value={updatedUser?.name} onChange={(e)=> setUpdatedUser((prev)=> ({...prev,name: e.target.value}))}/>
        <textarea name="about" id="" cols={30} rows={5} placeholder=" about you" className={inputClassnames} value={updatedUser?.about} onChange={(e)=> setUpdatedUser((prev)=> ({...prev,about: e.target.value}))}></textarea>
        <button type="submit" className=" p-2 border-2 rounded-lg bg-slate-300 dark:text-darkTheme">Save</button>
      </form>
      
    </div>
  );
}