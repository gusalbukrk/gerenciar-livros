import { notFound } from "next/navigation";

interface Props {
  params: {
    id: number;
  };
}

async function LivroDetailPage({ params }: Props) {
  const { id } = await params;
  if (id > 10) notFound();

  return (
    <main>
      <h1>Livro {id}</h1>
    </main>
  );
}

export default LivroDetailPage;
