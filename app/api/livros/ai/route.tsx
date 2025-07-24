import { NextRequest, NextResponse } from "next/server";

import generateLivroInfoWithAI from "./generatLivroInfoWithAI";

export async function GET(request: NextRequest) {
  const titulo = request.nextUrl.searchParams.get("titulo");

  if (!titulo) {
    return NextResponse.json(
      { error: "Título é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const livro = await generateLivroInfoWithAI(titulo);
    return NextResponse.json(livro);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
