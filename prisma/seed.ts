import { PrismaClient } from "../app/generated/prisma/index.js";
import data from "./data.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
  await prisma.livro.deleteMany();
  await prisma.autor.deleteMany();

  await prisma.$executeRaw`ALTER TABLE Livro AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Autor AUTO_INCREMENT = 1`;

  await prisma.autor.createMany({
    data: data.autores,
  });

  await prisma.livro.createMany({
    data: data.livros,
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
