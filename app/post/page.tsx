import MakePost from "@/components/ui/posts/makePost";

const Page = () => {
  return (
    <div>
      <p className=" w-full bg-lightTransparent p-4 text-center font-bold dark:bg-darkTransparent">
        Post
      </p>
      <MakePost redirect={true} />
    </div>
  );
};
export default Page;
