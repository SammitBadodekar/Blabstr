import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AllProviders from "@/components/allProviders";
import RenderPages from "@/components/renderPages";

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
          <RenderPages>{children}</RenderPages>
        </AllProviders>
      </body>
    </html>
  );
}
