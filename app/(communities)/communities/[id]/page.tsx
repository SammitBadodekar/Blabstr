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

async function getData(id: string) {
  const data = await prisma.communityPost.findMany({
    where: {
      communityId: id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return data;
}

// Add
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(options);
  const data = await getData(params.id);
  const Community = await prisma.community.findUnique({
    where: {
      id: params.id,
    },
    include: {
      members: true,
    },
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="page flex w-full flex-col">
      <Link
        href="/communities"
        className=" sticky top-0 z-10 bg-lightTransparent shadow-md backdrop-blur-sm dark:bg-darkTransparent"
      >
        <p className=" flex items-center gap-4  p-2 font-extrabold ">
          <BiArrowBack /> {Community?.name}
        </p>
      </Link>

      <div className="my-4 flex flex-col items-center justify-center gap-2 border-b-2 pb-2">
        {Community?.imageUrl && (
          <ProfileImage size={100} src={Community?.imageUrl} />
        )}

        <p className=" text-lg font-bold">{Community?.name}</p>
        <p className=" flex items-center font-medium">
          Members: {Community?.members?.length}
        </p>
      </div>

      <DisplayCommunityPosts
        CommunityPosts={data as CommunityPost[]}
        id={params.id}
      />
      <Link
        href={`/communityPost?community=${params.id}`}
        className=" sticky bottom-4 m-4 ml-auto w-fit rounded-full border-2 bg-darkTheme p-2 px-4 text-xl font-extrabold text-lightTheme dark:bg-lightTheme dark:text-darkTheme"
      >
        +
      </Link>
    </div>
  );
}
