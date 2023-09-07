import SiginForm from "@/components/ui/siginForm";

export default function Page() {
  return (
    <main className=" flex h-screen w-screen flex-col justify-center gap-4 dark:bg-darkTheme md:flex-row ">
      <SiginForm formType="signup" />
    </main>
  );
}
