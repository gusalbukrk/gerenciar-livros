import LivroCard from "@/app/livros/LivroCard";
import BackButton from "@/app/components/BackButton";
import LivrosTable from "./LivrosTable";
import { Livro } from "@/app/generated/prisma";
import { generateApiUrl, naturalSort } from "../utils";

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

  const { genero, ordenarPor = "id" } = searchParamsAwaited;
  const ordem = ["asc", "desc"].includes(searchParamsAwaited.ordem ?? "")
    ? searchParamsAwaited.ordem!
    : "asc";

  const resp = await fetch(generateApiUrl("/livros"));
  const livros: Livro[] = await resp.json();

  const livrosSorted =
    ordem === "asc"
      ? naturalSort(livros).asc((l) => l[ordenarPor])
      : naturalSort(livros).desc((l) => l[ordenarPor]);

  return (
    <main>
      <BackButton />
      <h1>Livros</h1>
      {genero !== undefined && <h2>Gênero: {genero}</h2>}
      {new Date().toLocaleTimeString("pt-BR")}
      <LivrosTable
        livros={livrosSorted}
        searchParamsMinusOrdenarPor={searchParamsMinusOrdenarPor}
      />
      <LivroCard />
    </main>
  );
}

export default LivrosPage;
