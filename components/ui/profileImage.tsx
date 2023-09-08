import Image from "next/image";

const ProfileImage = ({ src, size }: { src: string; size: number }) => {
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt=""
      className=" aspect-square h-fit rounded-full border-2 border-slate-400 object-cover"
    />
  );
};
export default ProfileImage;
