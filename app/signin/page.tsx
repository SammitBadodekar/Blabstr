import SiginForm from "@/components/ui/siginForm";
import Image from "next/image";

const Page = () => {
  return (
    <main className="flex h-screen w-screen flex-col justify-center gap-4 dark:bg-darkTheme md:flex-row ">
      <div className=" flex flex-col items-center justify-center md:-ml-32 md:-mt-20">
        <Image
          src="/_6dd78af8-728b-43b4-9083-9b6eb8bb0017-removebg-preview.svg"
          width={300}
          height={300}
          alt="logo"
          className=" h-40 w-40 md:h-96 md:w-96"
        />
        <h1 className="-mt-8 text-3xl font-bold md:-mt-14">Blabstr</h1>
      </div>
      <SiginForm formType="signin" />
    </main>
  );
};
export default Page;
