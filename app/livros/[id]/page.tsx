import { notFound } from "next/navigation";
import { Livro } from "@/app/generated/prisma";
import { generateApiUrl } from "@/app/utils";

interface Props {
  params: Promise<{
    id: number;
  }>;
}

async function LivroDetailPage({ params }: Props) {
  const { id } = await params;

  const resp = await fetch(`${generateApiUrl(`livros/${id}`)}`);
  const livro: Livro = await resp.json();

  if (Object.keys(livro).length === 0) return notFound();

  return (
    <main>
      <h1>Livro {livro.id}</h1>
      <p>
        {livro.titulo} ({livro.autor})
      </p>
    </main>
  );
}

export default LivroDetailPage;
