import ProfileImage from "./profileImage";
import { Button } from "./button";
import Link from "next/link";

const FeaturedAccount = ({ user }: { user: FeaturedAccount }) => {
  return (
    <div className="flex w-full flex-wrap gap-2 p-2">
      <Link href={`/${user.tag}`}>
        <ProfileImage src={user.imageUrl} size={40} />
      </Link>
      <Link href={`/${user.tag}`}>
        {" "}
        <p className="text-xs font-bold">{user.name}</p>
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
}
