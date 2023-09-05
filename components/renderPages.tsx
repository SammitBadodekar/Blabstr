"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/ui/sidebar";
import FeaturedTab from "@/components/ui/featuredTab";

const RenderPages = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isHeaderLessPathName =
    pathname === "/signin" || pathname === "/signup" || pathname === "/";

  if (isHeaderLessPathName) {
    return <div>{children}</div>;
  }
  if (!isHeaderLessPathName) {
    return (
      <div className=" md:flex md:w-full md:items-center md:justify-center">
        <div className=" grid grid-cols-1 sm:grid-cols-12 xl:w-fit">
          <Sidebar />
          <main className=" h-screen overflow-y-scroll sm:col-start-3 sm:col-end-13 md:col-start-3 md:col-end-9 lg:col-start-3 lg:col-end-9">
            {children}
          </main>
          <FeaturedTab />
        </div>
      </div>
    );
  }
};
export default RenderPages;
