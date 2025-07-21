import { createNewSortInstance } from "fast-sort";
import { Prisma, Livro } from "@/app/generated/prisma";

const getBaseUrl = () =>
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.APP_BASE_URL;

export const generateApiUrl = (path: string) => {
  return `${getBaseUrl()}/api/${path}`;
};

export const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  }).compare,
});

export const getModalElement = (elementId: string) =>
  document.getElementById(`${elementId}`) as HTMLDialogElement;

// all props present and required
const livroWithAutor = Prisma.validator<Prisma.LivroDefaultArgs>()({
  include: { autor: true },
});
export type LivroWithAutor = Prisma.LivroGetPayload<typeof livroWithAutor>;
// DTOs are containers for data, holding only properties with getter and setter methods
// id and authorId are excluded and updatedAt and createdAt are optional
export type LivroWithAutorDto = Prisma.LivroCreateInput & {
  autor: Prisma.AutorCreateInput;
};
