import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import DisplayCommunityPosts, {
  CommunityPost,
} from "@/components/ui/communities/displayCommunityPosts";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import ProfileImage from "@/components/ui/profileImage";
import FeaturedAccount, {
  FeaturedAccountType,
} from "@/components/ui/featuredAccount";
import { User } from "@/components/renderPages";

async function getData(id: string) {
  const data = await prisma.communityPost.findMany({
    where: {
      communityId: id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

// Add
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const session = await getServerSession(options);
  const data = await getData(params.slug[0]);
  const Community = await prisma.community.findUnique({
    where: {
      id: params.slug[0],
    },
    include: {
      members: true,
      admin: true,
    },
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="page flex w-full flex-col">
      <Link
        href="/communities"
        className=" sticky top-0 z-10 bg-lightTransparent p-1 shadow-md backdrop-blur-sm dark:bg-darkTransparent"
      >
        <p className=" flex items-center gap-4 p-2 text-xl font-extrabold ">
          <BiArrowBack /> {Community?.name}
        </p>
      </Link>

      <div className="my-4 flex flex-col items-center justify-center gap-2 pb-2">
        {Community?.imageUrl && (
          <ProfileImage size={100} src={Community?.imageUrl} />
        )}

        <p className=" text-lg font-bold">{Community?.name}</p>
        <p className=" text-sm text-darkGray dark:text-lightGray">
          {Community?.description}
        </p>
      </div>
      <div className=" mb-2 flex w-full justify-around gap-4 border-b-2 p-2">
        <Tabs communityId={Community?.id} tab={params.slug[1]} text="posts" />
        <Tabs communityId={Community?.id} tab={params.slug[1]} text="members" />
        <Tabs communityId={Community?.id} tab={params.slug[1]} text="admins" />
      </div>

      {(params.slug[1] === "posts" || !params.slug[1]) && (
        <DisplayCommunityPosts
          CommunityPosts={data as CommunityPost[]}
          id={params.slug[0]}
        />
      )}

      {params.slug[1] === "members" && (
        <div>
          {Community?.members?.map((user) => {
            return <FeaturedAccount user={user} />;
          })}
        </div>
      )}

      {params.slug[1] === "admins" && (
        <div>
          {Community?.admin?.map((user) => {
            return <FeaturedAccount user={user} />;
          })}
        </div>
      )}

      <Link
        href={`/communityPost?community=${params.slug[0]}`}
        className=" sticky bottom-4 m-4 ml-auto w-fit rounded-full border-2 bg-darkTheme p-2 px-4 text-xl font-extrabold text-lightTheme dark:bg-lightTheme dark:text-darkTheme"
      >
        +
      </Link>
    </div>
  );
}

const Tabs = ({
  communityId,
  tab,
  text,
}: {
  communityId: string | undefined;
  tab: string | undefined;
  text: string;
}) => {
  return (
    <Link
      href={`/communities/${communityId}/${text}`}
      className={`${
        tab === text || (!tab && text === "posts")
          ? "border-b-4 border-b-blue-500"
          : ""
      } `}
      scroll={false}
    >
      <p className=" font-bold capitalize">{text}</p>
    </Link>
  );
};
