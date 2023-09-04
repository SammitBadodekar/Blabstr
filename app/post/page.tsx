import MakePost from "@/components/ui/makePost";

const Page = () => {
  return (
    <div>
      <p className=" w-full bg-lightTransparent p-4 text-center font-bold dark:bg-darkTransparent">
        Post
      </p>
      <MakePost />
    </div>
  );
};
export default Page;
