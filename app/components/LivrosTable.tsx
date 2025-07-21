"use client";

import Link from "next/link";
import { SessionProvider } from "next-auth/react";

import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useState } from "react";
import CreateButton from "./CreateButton";
import { LivroWithAutor } from "../shared";

interface Props {
  livros: LivroWithAutor[];
  searchParamsStr: string;
  isLogged: boolean;
}

function LivrosTable({
  livros: initialLivros,
  searchParamsStr,
  isLogged,
}: Props) {
  const [livros, setLivros] = useState<LivroWithAutor[]>(initialLivros);

  const handleDeleteSuccess = (id: number) => {
    setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
  };

  const handleCreateSuccess = (livroCreated: LivroWithAutor) => {
    setLivros((prevLivros) => [...prevLivros, livroCreated]);
  };

  const handleEditSuccess = (livroEdited: LivroWithAutor) => {
    setLivros((prevLivros) =>
      prevLivros.map((l) => {
        return l.id === livroEdited.id ? livroEdited : l;
      })
    );
  };

  return (
    <>
      <SessionProvider>
        <CreateButton onCreateSuccess={handleCreateSuccess} />
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
                <td>{livro.autor.nome}</td>
                <td>{livro.anoPublicacao}</td>
                <td>{livro.genero}</td>
                <td>{livro.estoqueQuantidade}</td>
                {isLogged && (
                  <td className="flex gap-5">
                    <EditButton
                      livro={livro}
                      onEditSuccess={handleEditSuccess}
                    />
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
