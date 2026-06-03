import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Resolve the signed-in user's id from the session, falling back to a lookup
// by email for sessions issued before the id was added to the JWT.
async function getUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  if (session.user.id) return session.user.id;
  if (session.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    return user?.id ?? null;
  }
  return null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({ where: { userId } });
  return NextResponse.json({ profile });
}

export async function PUT(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { name?: string; username?: string; phone?: string; image?: string; bio?: string }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Normalize: trim strings, treat empty as null. Only known fields are
  // accepted, so a client can't write arbitrary columns (e.g. isAdmin).
  const clean = (v?: string) => {
    const t = v?.trim();
    return t ? t : null;
  };

  const data = {
    name: clean(body.name),
    username: clean(body.username),
    phone: clean(body.phone),
    image: clean(body.image),
    bio: clean(body.bio),
  };

  // Basic guard: avatar must be an http(s) URL if provided.
  if (data.image && !/^https?:\/\/.+/i.test(data.image)) {
    return NextResponse.json(
      { error: "Avatar must be a valid http(s) URL" },
      { status: 400 },
    );
  }

  const profile = await prisma.profile.update({
    where: { userId },
    data,
  });

  return NextResponse.json({ ok: true, profile });
}
