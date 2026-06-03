import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProfileEditor from "@/components/ProfileEditor";
import { getSession } from "@/lib/serverAuth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getSession();

  // Middleware already guards this route, but guard here too so the data
  // fetch below always has a user to key on.
  if (!session?.user?.email) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { email: true, profile: true },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <ProfileEditor
        email={user.email ?? ""}
        initial={{
          name: user.profile?.name ?? "",
          username: user.profile?.username ?? "",
          phone: user.profile?.phone ?? "",
          image: user.profile?.image ?? "",
          bio: user.profile?.bio ?? "",
        }}
      />
    </>
  );
}
