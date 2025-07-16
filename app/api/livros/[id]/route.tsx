import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

import {
  LivroUpdateInputSchema,
  LivroDeleteArgsSchema,
} from "@/app/generated/zod/index";

interface GetRequestProps {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, props: GetRequestProps) {
  const params = await props.params;
  const id = parseInt(params.id);

  const livro = await prisma.livro.findUnique({
    where: { id },
  });

  return NextResponse.json(livro ?? {});
}

export async function PATCH(request: NextRequest, props: GetRequestProps) {
  const params = await props.params;
  const id = parseInt(params.id);
  const body = await request.json();

  const validation = LivroUpdateInputSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues },
      { status: 400 }
    );
  }

  try {
    const livro = await prisma.livro.update({
      where: { id },
      data: validation.data,
    });
    return NextResponse.json(livro);
  } catch (error: any) {
    if (error.code === "P2025") {
      // livro doesn't exist
      return NextResponse.json({}, { status: 404 });
    }
  }
}

export async function DELETE(request: NextRequest, props: GetRequestProps) {
  const params = await props.params;
  const id = parseInt(params.id);

  const validation = LivroDeleteArgsSchema.safeParse({ where: { id } });
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues },
      { status: 400 }
    );
  }

  try {
    const livro = await prisma.livro.delete({
      where: { id },
    });
    return NextResponse.json(livro);
  } catch (error: any) {
    if (error.code === "P2025") {
      // livro doesn't exist
      return NextResponse.json({}, { status: 404 });
    }
  }
}
