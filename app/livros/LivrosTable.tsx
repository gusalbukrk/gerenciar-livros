import Link from "next/link";
import { Livro } from "@/app/generated/prisma";

interface Props {
  livros: Livro[];
  searchParamsMinusOrdenarPor: string;
}

function LivrosTable({ livros, searchParamsMinusOrdenarPor }: Props) {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>
              <Link href={`?${searchParamsMinusOrdenarPor}&ordenarPor=id`}>
                ID
              </Link>
            </th>
            <th>
              <Link href={`?${searchParamsMinusOrdenarPor}&ordenarPor=titulo`}>
                Título
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {livros.slice(0, 10).map((livro) => (
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro.titulo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LivrosTable;
