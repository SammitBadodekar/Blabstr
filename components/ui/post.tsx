import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

const Post = () => {
  return (
    <div className=" m-2 flex gap-2 rounded-lg p-2">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
        width={50}
        height={50}
        alt="post"
        className=" aspect-square h-fit rounded-full object-cover"
      />
      <div className=" flex flex-col gap-2">
        <p className=" font-bold">User Name</p>
        <p className=" text-sm  text-darkTheme dark:text-lightTheme">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
          necessitatibus sequi distinctio quasi unde numquam optio explicabo
          labore debitis perferendis.
        </p>
        <div className=" mt-2 flex justify-around gap-4 border-b-2 pb-2">
          <AiOutlineHeart />
          <FaRegComment />
          <BsBookmarkPlus />
        </div>
      </div>
    </div>
  );
};
export default Post;
