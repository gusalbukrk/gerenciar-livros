import { NextRequest, NextResponse } from "next/server";
import { LivroWithAutor } from "@/app/shared";

import { prisma } from "@/prisma/client";
import {
  LivroCreateInputSchema,
  AutorCreateInputSchema,
} from "@/app/generated/zod/index";

export async function GET() {
  const livros: LivroWithAutor[] = await prisma.livro.findMany({
    include: {
      autor: {
        omit: {}, // get all fields of autor
      },
    },
  });

  return NextResponse.json(livros);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("POST livro", data);

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

  const livro: LivroWithAutor = await prisma.livro.create({
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

  return NextResponse.json(livro, { status: 201 });
}
