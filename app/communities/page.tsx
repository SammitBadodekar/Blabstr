import Link from "next/link";

const Page = () => {
  return (
    <div className=" flex flex-col gap-4 p-4 sm:p-8">
      <Link href="/new" className=" rounded-full text-lg font-extrabold">
        Create a new community
      </Link>
    </div>
  );
};

export default Page;
