import LivroCard from "./components/LivroCard";
import LivrosTable from "./components/LivrosTable";
import { generateApiUrl, naturalSort } from "./utils";
import { Livro } from "@/app/generated/prisma";

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
