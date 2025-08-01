import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/client";
import schema from "./schema";
import { Resend } from "resend";

import WelcomeTemplate from "@/emails/WelcomeTemplate";

const resend = new Resend("re_h2vrNdLg_BXdFUuu2hxwLJNouxGreaSqF");

// endpoint for handling user registration with email/password
// (i.e. not social login)
export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.senha, 10);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  await resend.emails.send({
    from: "gerenciar-livros@gusalbukrk.com",
    to: user.email!,
    subject: "Welcome",
    react: WelcomeTemplate({ name: user.email! }),
  });

  return NextResponse.json({ email: user.email }, { status: 201 });
}
