"use client";

import MakePost from "@/components/ui/posts/makePost";
import Logo from "@/components/ui/logo";

import ProfileImage from "@/components/ui/profileImage";
import { useRecoilState } from "recoil";
import { userState } from "@/state/atoms/userState";
import { NavLinks } from "@/components/ui/sidebar";
import { BiBell } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import MobileMenu from "@/components/ui/mobileMenu";
import DisplayPost from "@/components/displayPost";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="page w-full">
      <div className="sticky top-0 z-20 hidden w-full bg-lightTransparent p-2 text-center font-bold backdrop-blur-sm dark:bg-darkTransparent sm:block">
        Home
      </div>
      <div className=" sticky top-0 z-10 flex justify-between bg-lightTransparent px-4 py-2 backdrop-blur-md dark:bg-darkTransparent sm:hidden">
        <div onClick={() => setIsOpen(true)} className=" pt-1">
          <ProfileImage
            src={
              user?.imageUrl ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
            }
            size={40}
          />
        </div>
        <Link href="/home">
          <Logo text={true} />
        </Link>
        <NavLinks text="Notifications" URL="/notifications">
          <BiBell />
        </NavLinks>
        <div
          className={`absolute top-0 ${
            isOpen ? "left-0" : " -left-full"
          }  z-20  duration-300 ease-out`}
          ref={modalRef}
        >
          <MobileMenu />
        </div>
        <div
          className={`absolute top-0 h-screen w-screen ${
            isOpen ? "left-0 opacity-100" : " -left-full opacity-0"
          } z-10  bg-darkTransparent backdrop-blur-md transition-opacity duration-300 ease-out`}
        ></div>
      </div>
      <MakePost redirect={false} />
      <div className=" line-height w-full bg-slate-200 dark:bg-slate-700"></div>
      <DisplayPost existingPosts={null} />
    </div>
  );
}
