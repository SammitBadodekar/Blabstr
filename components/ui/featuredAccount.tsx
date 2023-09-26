import ProfileImage from "./profileImage";
import { Button } from "./button";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

const FeaturedAccount = ({ user }: { user: FeaturedAccount }) => {
  return (
    <div className="flex w-full flex-wrap gap-2 p-2">
      <Link href={`/${user.tag}`}>
        <ProfileImage src={user.imageUrl} size={40} />
      </Link>
      <Link href={`/${user.tag}`}>
        <div className=" flex items-center gap-2">
          <p className=" font-bold">{user?.name}</p>
          {user.isVerified && (
            <div className=" text-lg text-yellow-400">
              <MdVerified />
            </div>
          )}
        </div>
        <p className=" text-xs text-darkGray dark:text-lightGray">
          @{user.tag}
        </p>
      </Link>

      <Button className=" ml-auto rounded-xl px-3">Follow</Button>
    </div>
  );
};
export default FeaturedAccount;

interface FeaturedAccount {
  id: string;
  name: string;
  imageUrl: string;
  tag: string;
  about: string;
  email: string;
  isVerified: boolean;
}
