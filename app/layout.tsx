import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "./themeProvider";

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
