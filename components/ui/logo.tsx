import Image from "next/image";
import Link from "next/link";

const Logo = ({ text }: { text: true | false }) => {
  return (
    <div className="flex items-center">
      <Image
        src="/_6dd78af8-728b-43b4-9083-9b6eb8bb0017-removebg-preview.svg"
        width={50}
        height={50}
        alt="logo"
        className=" lg:-my-4 lg:-ml-2"
      />
      <p className={`${text ? "" : " hidden lg:inline"}  font-bold`}>Blabstr</p>
    </div>
  );
};
export default Logo;
