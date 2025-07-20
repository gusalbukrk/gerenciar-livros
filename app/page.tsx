import LivrosTable from "./components/LivrosTable";
import { generateApiUrl, naturalSort } from "./utils";
import { Livro } from "@/app/generated/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/authOptions";

interface Props {
  searchParams: Promise<{
    genero: string;
    ordenarPor: keyof Livro;
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
  const livros: Livro[] = await resp.json();

  const livrosSorted =
    ordem === "asc"
      ? naturalSort(livros).asc((l) => l[ordenarPor])
      : naturalSort(livros).desc((l) => l[ordenarPor]);

  return (
    <main>
      {/* <h1 className="text-2xl font-bold mb-5">Livros</h1> */}
      <LivrosTable
        livros={livrosSorted}
        searchParamsStr={searchParamsStr}
        isLogged={session !== null}
      />
    </main>
  );
}

export default Page;
