import Image from "next/image";

const FeaturedAccount = () => {
  return (
    <div className=" flex gap-4">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
        width={50}
        height={50}
        alt="post"
        className=" aspect-square h-fit rounded-full object-cover"
      />
      <p className=" font-bold">User Name</p>
    </div>
  );
};
export default FeaturedAccount;
