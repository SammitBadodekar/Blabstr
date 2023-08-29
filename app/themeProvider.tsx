"use client";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import toast, { Toaster } from "react-hot-toast";

const themeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      {children}
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#e5e5e5",
            color: "#000",
          },
        }}
      />
    </ThemeProvider>
  );
};
export default themeProvider;
