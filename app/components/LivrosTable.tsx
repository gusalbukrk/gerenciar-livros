"use client";

import Link from "next/link";
import { SessionProvider } from "next-auth/react";

import { Livro } from "@/app/generated/prisma";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useState } from "react";
import CreateButton from "./CreateButton";

interface Props {
  livros: Livro[];
  searchParamsStr: string;
  isLogged: boolean;
}

function LivrosTable({
  livros: initialLivros,
  searchParamsStr,
  isLogged,
}: Props) {
  const [livros, setLivros] = useState<Livro[]>(initialLivros);

  const handleDeleteSuccess = (id: number) => {
    setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
  };

  const handleCreateSuccess = (livroCreated: Livro) => {
    setLivros((prevLivros) => [...prevLivros, livroCreated]);
  };

  const handleEditSuccess = (livroEdited: Livro) => {
    setLivros((prevLivros) =>
      prevLivros.map((l) => {
        return l.id === livroEdited.id ? livroEdited : l;
      })
    );
  };

  return (
    <>
      <SessionProvider>
        <CreateButton onSuccess={handleCreateSuccess} />
      </SessionProvider>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>
                <Link href={`?${searchParamsStr}&ordenarPor=id`}>#</Link>
              </th>
              <th>
                <Link href={`?${searchParamsStr}&ordenarPor=titulo`}>
                  Título
                </Link>
              </th>
              <th>
                <Link href={`?${searchParamsStr}&ordenarPor=autor`}>Autor</Link>
              </th>
              <th>
                <Link href={`?${searchParamsStr}&ordenarPor=anoPublicacao`}>
                  Ano de publicação
                </Link>
              </th>
              <th>
                <Link href={`?${searchParamsStr}&ordenarPor=genero`}>
                  Gênero
                </Link>
              </th>
              <th>
                <Link href={`?${searchParamsStr}&ordenarPor=estoqueQuantidade`}>
                  Quantidade
                </Link>
              </th>
              {isLogged && <th></th>}
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro.id} className="hover:bg-base-300">
                <td>{livro.id}</td>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>{livro.anoPublicacao}</td>
                <td>{livro.genero}</td>
                <td>{livro.estoqueQuantidade}</td>
                {isLogged && (
                  <td className="flex gap-5">
                    <EditButton livro={livro} onSuccess={handleEditSuccess} />
                    <DeleteButton
                      id={livro.id}
                      onDeleteSuccess={handleDeleteSuccess}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LivrosTable;
