import LivrosTable from "./components/LivrosTable";
import { generateApiUrl, naturalSort, LivroWithAutor } from "./shared";
import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/authOptions";
import generateBookInfoWithAI from "./api/livros/ia/generateBookInfoWithAI";

interface Props {
  searchParams: Promise<{
    genero: string;
    ordenarPor: keyof LivroWithAutor;
    ordem: "asc" | "desc";
  }>;
}

export const dynamic = "force-dynamic";

async function Page(props: Props) {
  const session = await getServerSession(authOptions);

  const searchParams = await props.searchParams;
  const searchParamsStr = new URLSearchParams(
    Object.entries(searchParams).filter(([key]) => key !== "ordenarPor")
  ).toString();

  const { genero, ordenarPor = "id" } = searchParams;
  const ordem = ["asc", "desc"].includes(searchParams.ordem ?? "")
    ? searchParams.ordem!
    : "asc";

  const resp = await fetch(generateApiUrl("/livros"));
  const livros: LivroWithAutor[] = await resp.json();

  const livrosSorted =
    ordem === "asc"
      ? naturalSort(livros).asc((l) => l[ordenarPor])
      : naturalSort(livros).desc((l) => l[ordenarPor]);

  return (
    <main>
      <LivrosTable
        livros={livrosSorted}
        searchParamsStr={searchParamsStr}
        isLogged={session !== null}
      />
    </main>
  );
}

export default Page;
