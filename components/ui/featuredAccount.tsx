import ProfileImage from "./profileImage";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import Follow from "./follow";

const FeaturedAccount = ({ user }: { user: FeaturedAccountType }) => {
  return (
    <div className="flex w-full flex-wrap gap-2 p-2">
      <Link href={`/${user.tag}`}>
        <ProfileImage src={user.imageUrl} size={40} />
      </Link>
      <Link href={`/${user.tag}`}>
        <div className=" flex items-center gap-1">
          <p className=" text-xs font-bold">{user?.name}</p>
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
      <Follow user={user} />
    </div>
  );
};
export default FeaturedAccount;

export interface FeaturedAccountType {
  id: string;
  name: string;
  imageUrl: string;
  tag: string | null;
  about: string;
  email: string;
  isVerified: boolean;
}
