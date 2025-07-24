import { NextRequest, NextResponse } from "next/server";

import scrapeLivroInfo from "./scrapeLivroInfo";

export async function GET(request: NextRequest) {
  const titulo = request.nextUrl.searchParams.get("titulo");

  if (!titulo) {
    return NextResponse.json(
      { error: "Título é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const livro = await scrapeLivroInfo(titulo);
    console.log("Livro scraped:", livro);
    return NextResponse.json(livro);
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
