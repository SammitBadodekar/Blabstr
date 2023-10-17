import MakePost from "@/components/ui/posts/makePost";
import Modal from "@/components/modal";

const Page = () => {
  return (
    <Modal>
      <div className=" rounded-3xl bg-slate-300 dark:bg-gray-800">
        <p className=" w-full p-4 text-center font-bold">Post</p>
        <MakePost redirect={true} />
      </div>
    </Modal>
  );
};
export default Page;
