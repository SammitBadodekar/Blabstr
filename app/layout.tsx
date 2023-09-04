import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AllProviders from "@/components/allProviders";
import Sidebar from "@/components/ui/sidebar";
import FeaturedTab from "@/components/ui/featuredTab";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blabstr",
  description: "The social media",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-lightTheme text-darkTheme dark:bg-darkTheme dark:text-lightTheme`}
      >
        <AllProviders>
          <div className=" md:flex md:w-full md:items-center md:justify-center">
            <div className=" grid grid-cols-1 sm:grid-cols-12 xl:w-fit">
              <Sidebar />
              <main className=" h-screen overflow-y-scroll sm:col-start-3 sm:col-end-13 md:col-start-3 md:col-end-9 lg:col-start-3 lg:col-end-9">
                {children}
              </main>
              <FeaturedTab />
            </div>
          </div>
        </AllProviders>
      </body>
    </html>
  );
}
