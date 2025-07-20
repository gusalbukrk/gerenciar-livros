import { PrismaClient } from "../app/generated/prisma/index.js";
import livrosData from "./livros.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  const livrosParaCriar = livrosData.map((livro) => ({
    // id: livro.id, // Incluir id se for manual e você quiser usar os do JSON
    titulo: livro.titulo,
    autor: livro.autor,
    anoPublicacao: livro.anoPublicacao,
    genero: livro.genero,
    estoqueQuantidade: livro.estoqueQuantidade,
  }));

  await prisma.livro.createMany({
    data: livrosParaCriar,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
