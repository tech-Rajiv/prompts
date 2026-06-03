import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { name?: string; email?: string; password?: string; username?: string; phone?: string }
    | null;

  const name = body?.name?.trim() || null;
  const email = body?.email?.toLowerCase().trim();
  const password = body?.password;
  const username = body?.username?.trim() || null;
  const phone = body?.phone?.trim() || null;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      profile: {
        create: {
          name,
          username: username ?? email.split("@")[0] ?? null,
          phone,
        },
      },
    },
    select: { id: true, email: true },
  });

  return NextResponse.json({ ok: true, user }, { status: 201 });
}

