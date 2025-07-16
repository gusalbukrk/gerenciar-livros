import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/client";
import { LivroCreateInputSchema } from "@/app/generated/zod/index";

export async function GET(request: NextRequest) {
  const livros = await prisma.livro.findMany();
  return NextResponse.json(livros);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = LivroCreateInputSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues },
      { status: 400 }
    );
  }

  const livro = await prisma.livro.create({
    data: validation.data,
  });

  return NextResponse.json(livro, { status: 201 });
}
