import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import ButtonPrimary from "./buttonPrimary";

const MakePost = () => {
  return (
    <div>
      <form className=" flex items-center gap-4 p-4">
        <input
          type="text"
          placeholder="What's happening ?"
          className=" w-full rounded-full border-2 bg-lightTheme p-2 dark:bg-darkTheme"
        />
        <ButtonPrimary>
          <button type="submit">Post</button>
        </ButtonPrimary>
      </form>{" "}
      <div className=" flex w-full items-center gap-4 px-8 pb-4">
        <PostMethod>
          <BsImages />
          <p>Images</p>
        </PostMethod>
        <PostMethod>
          <AiOutlineVideoCamera />
          <p>Video</p>
        </PostMethod>
      </div>
    </div>
  );
};
export default MakePost;

const PostMethod = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex  items-center gap-2 rounded-full border-2 p-2 text-sm">
      {children}
    </div>
  );
};
