"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem={false} attribute="class">
          <RecoilRoot>{children}</RecoilRoot>
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
      </QueryClientProvider>
    </SessionProvider>
  );
};
export default AllProviders;
