import MakePost from "@/components/ui/makePost";
import Modal from "@/components/modal";

const Page = () => {
  return (
    <Modal>
      <div className=" rounded-3xl bg-slate-300 dark:bg-gray-700">
        <p className=" w-full p-4 text-center font-bold">Post</p>
        <MakePost />
      </div>
    </Modal>
  );
};
export default Page;