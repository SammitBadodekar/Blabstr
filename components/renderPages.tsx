"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import FeaturedTab from "@/components/ui/featuredTab";
import MobileNavbar from "./ui/mobileNavbar";
import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";

const RenderPages = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await axios.get(`/api/users/${session?.user?.email}`);
      setUser(user?.data);
    };
    if (session?.user) {
      fetchUser();
    }
  }, [session?.user]);

  const pathname = usePathname();

  const isHeaderLessPathName =
    pathname === "/signin" || pathname === "/signup" || pathname === "/";

  if (isHeaderLessPathName) {
    return <div>{children}</div>;
  }
  if (!isHeaderLessPathName) {
    return (
      <div className=" items-center justify-center md:flex md:w-full ">
        <div className=" grid w-fit grid-cols-1 sm:grid-cols-12 ">
          <Sidebar />
          <main className=" h-screen overflow-y-scroll sm:col-start-3 sm:col-end-13 md:col-start-3 md:col-end-9 lg:col-start-3 lg:col-end-9">
            {children}
            <MobileNavbar />
          </main>
          <FeaturedTab />
        </div>
      </div>
    );
  }
};
export default RenderPages;

interface User {
  createdAt: string;
  email: string;
  id: string;
  imageUrl: string;
  name: string;
  password: string;
  updatedAt: string;
}
