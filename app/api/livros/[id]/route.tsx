import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

import {
  LivroDeleteArgsSchema,
  LivroCreateInputSchema,
  AutorCreateInputSchema,
} from "@/app/generated/zod/index";
import { LivroWithAutor } from "@/app/shared";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest, props: Props) {
  const params = await props.params;
  const id = parseInt(params.id);
  const data = await request.json();

  const livroToCreate = {
    titulo: data.titulo,
    autor: {},
    genero: data.genero,
    anoPublicacao: data.anoPublicacao,
    estoqueQuantidade: data.estoqueQuantidade,
  };
  const livroValidation = LivroCreateInputSchema.safeParse(livroToCreate);
  if (!livroValidation.success) {
    return NextResponse.json(
      { error: livroValidation.error.issues },
      { status: 400 }
    );
  }

  const autorToCreate = {
    nome: data.autor.nome,
  };
  const autorValidation = AutorCreateInputSchema.safeParse(autorToCreate);
  if (!autorValidation.success) {
    return NextResponse.json(
      { error: autorValidation.error.issues },
      { status: 400 }
    );
  }

  try {
    const livro: LivroWithAutor = await prisma.livro.update({
      where: { id },
      data: {
        ...livroToCreate,
        autor: {
          // https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#connect-or-create-a-record
          connectOrCreate: {
            where: {
              nome: data.autor.nome,
            },
            create: {
              nome: data.autor.nome,
            },
          },
        },
      },
      include: {
        autor: true,
      },
    });

    return NextResponse.json(livro, { status: 200 });
  } catch (error) {
    if ((error as { code: string }).code === "P2025") {
      // livro doesn't exist
      return NextResponse.json({}, { status: 404 });
    }
  }
}

export async function DELETE(request: NextRequest, props: Props) {
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
  } catch (error) {
    if ((error as { code: string }).code === "P2025") {
      // livro doesn't exist
      return NextResponse.json({}, { status: 404 });
    }
  }
}
