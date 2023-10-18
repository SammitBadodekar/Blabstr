import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}</div>;
};

export default Page;

{
  /* <>
<textarea
          name="text"
          id=""
          cols={30}
          rows={1}
          placeholder="Write a post"
          className=" w-full rounded-3xl border-2 border-gray-500 bg-lightTheme p-3 dark:bg-darkTheme"
          className=" w-full rounded-3xl border-2 border-gray-500 bg-lightTheme p-2 dark:bg-darkTheme"
        ></textarea><Popover>
          <PopoverTrigger className=" text-2xl">
            <RiAttachment2 />
          </PopoverTrigger>
          <PopoverContent className=" grid w-fit gap-4 rounded-xl bg-slate-300 dark:bg-gray-700">
            <UploadButton
              endpoint="imageUploader"
              content={{
                button({ ready }) {
                  if (ready)
                    return (
                      <div className=" flex items-center gap-2">
                        <BsImages />
                        Image
                      </div>
                    );

                  return "loading...";
                },
              }}
              onClientUploadComplete={(res) => {
                toast.success("successfully uploaded image");
                setPost((prev) => ({
                  ...prev,
                  image: res ? res[0]?.url : prev.image,
                }));
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`Failed to upload`);
              }}
              className=" ut-button:w-fit ut-button:rounded-3xl ut-button:bg-lightTheme ut-button:p-4 ut-button:font-bold ut-button:text-darkTheme ut-allowed-content:hidden dark:ut-button:bg-darkTheme dark:ut-button:text-lightTheme"
            />
            <UploadButton
              endpoint="videoUploader"
              content={{
                button({ ready }) {
                  if (ready)
                    return (
                      <div className=" flex items-center gap-2">
                        <AiOutlineVideoCamera />
                        Video
                      </div>
                    );

                  return "loading...";
                },
              }}
              onClientUploadComplete={(res) => {
                toast.success("successfully uploaded video");
                setPost((prev) => ({
                  ...prev,
                  video: res ? res[0]?.url : prev.video,
                }));
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`video size should be less than 64MB`);
              }}
              className="ut-button:w-fit ut-button:rounded-3xl ut-button:bg-lightTheme ut-button:p-4 ut-button:font-bold ut-button:text-darkTheme ut-allowed-content:hidden dark:ut-button:bg-darkTheme dark:ut-button:text-lightTheme"
            />
          </PopoverContent>
        </Popover>
        <Button type="submit" className=" rounded-3xl font-bold">
          Post
        </Button>
        </> */
}
