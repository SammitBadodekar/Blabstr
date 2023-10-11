import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import MakeCommunityPost from "@/components/ui/communities/makeCommunityPost";
import { prisma } from "@/lib/db";
import DisplayCommunityPosts, {
  CommunityPost,
} from "@/components/ui/communities/displayCommunityPosts";

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

  if (!session) {
    redirect("/");
  }

  return (
    <div className="page flex w-full flex-col overflow-hidden">
      <DisplayCommunityPosts
        CommunityPosts={data as CommunityPost[]}
        id={params.id}
      />
      <MakeCommunityPost id={params.id} />
    </div>
  );
}
