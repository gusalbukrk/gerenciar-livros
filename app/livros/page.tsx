import { sort } from "fast-sort";

import LivroCard from "@/app/livros/LivroCard";
import BackButton from "@/app/components/BackButton";
import LivrosTable from "./LivrosTable";
import { Livro } from "./types";

interface Props {
  searchParams: Promise<{
    genero: string;
    ordenarPor: keyof Livro;
    ordem: "asc" | "desc";
  }>;
}

// TODO: remove
export const dynamic = "force-dynamic";

async function LivrosPage({ searchParams }: Props) {
  const searchParamsAwaited = await searchParams;
  const searchParamsMinusOrdenarPor = new URLSearchParams(
    Object.entries(searchParamsAwaited).filter(([key]) => key !== "ordenarPor")
  ).toString();

  const { genero, ordenarPor } = searchParamsAwaited;
  const ordem = ["asc", "desc"].includes(searchParamsAwaited.ordem ?? "")
    ? searchParamsAwaited.ordem!
    : "asc";

  // TODO: remove
  const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
  var livros: Livro[] = await resp.json();
  livros = livros.map((livro) => ({
    id: livro.id,
    titulo: livro.title!,
  }));

  // TODO: add more columns
  if (ordenarPor === "id" || ordenarPor === "titulo") {
    livros = sort(livros).by([
      {
        [ordem]: (l: Livro) => l[ordenarPor],
      } as
        | { asc: (l: Livro) => string | number }
        | { desc: (l: Livro) => string | number },
    ]);
  }

  return (
    <main>
      <BackButton />
      <h1>Livros</h1>
      {genero !== undefined && <h2>Gênero: {genero}</h2>}
      {new Date().toLocaleTimeString("pt-BR")}
      <LivrosTable
        livros={livros}
        searchParamsMinusOrdenarPor={searchParamsMinusOrdenarPor}
      />
      <LivroCard />
    </main>
  );
}

export default LivrosPage;
