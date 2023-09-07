import MakePost from "@/components/ui/makePost";

const Page = () => {
  return (
    <div className="page">
      <p className=" w-full bg-lightTransparent p-4 text-center font-bold dark:bg-darkTransparent md:max-w-sm">
        Post
      </p>
      <MakePost />
    </div>
  );
};
export default Page;
