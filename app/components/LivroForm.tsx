// used for both creating and editing books

"use client";

import { useState } from "react";
import { Livro } from "../generated/prisma";
import { getModalElement } from "../utils";
import LivroFormField from "./LivroFormField";

function LivroForm({
  method,
  livro,
  onSuccess,
}: {
  method: "POST" | "PATCH";
  livro: Livro;
  onSuccess: (livroReturned: Livro) => void;
}) {
  const [formData, setFormData] = useState<Livro>(livro!);
  const [isInProgress, setIsInProgress] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "anoPublicacao" || name === "estoqueQuantidade"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsInProgress(true);

    const { id: _, ...body } = formData;
    const fetchUrl =
      method === "POST" ? "/api/livros" : `/api/livros/${livro.id}`;
    //
    const response = await fetch(fetchUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const returnedLivro = await response.json();

    if (!response.ok) {
      alert(
        `Falha ao tentar ${method === "POST" ? "criar" : "editar"} o livro.`
      );
    } else {
      alert(
        method === "POST"
          ? "Livro criado com sucesso!"
          : `Livro ${livro.id} editado com sucesso!`
      );
    }

    onSuccess(returnedLivro);
    setIsInProgress(false);
    getModalElement(
      method === "POST" ? "create_modal" : `edit_modal_${livro.id}`
    ).close();
    if (method === "POST") {
      setFormData(livro); // reset formData
    }

    return;
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.currentTarget as HTMLFormElement).requestSubmit();
    }
  };

  return (
    <>
      <h3 className="font-bold text-lg mb-5">
        {method === "POST" ? (
          `Criar livro`
        ) : (
          <>
            Editar livro
            <span className="text-gray-400 ml-2">id: {livro.id}</span>
          </>
        )}
      </h3>
      <form
        id={method === "POST" ? "createForm" : `editForm${livro.id}`}
        onKeyDown={handleFormKeyDown}
        onSubmit={handleSubmit}
      >
        <LivroFormField
          label="Titulo"
          type="text"
          minlength={3}
          name="titulo"
          value={formData.titulo}
          handleChange={handleChange}
        />
        <LivroFormField
          label="Autor"
          type="text"
          name="autor"
          value={formData.autor}
          handleChange={handleChange}
        />
        <LivroFormField
          label="Gênero"
          type="text"
          name="genero"
          value={formData.genero}
          handleChange={handleChange}
        />
        <LivroFormField
          label="Ano de publicação"
          type="number"
          name="anoPublicacao"
          value={formData.anoPublicacao.toString()}
          handleChange={handleChange}
        />
        <LivroFormField
          label="Quantidade em estoque"
          type="number"
          name="estoqueQuantidade"
          value={formData.estoqueQuantidade.toString()}
          handleChange={handleChange}
        />
      </form>
      <div className="modal-action">
        <button
          type="submit"
          className="btn"
          disabled={isInProgress}
          onClick={() =>
            (
              document.querySelector(
                method === "POST" ? "#createForm" : `#editForm${livro.id}`
              ) as HTMLFormElement
            ).requestSubmit()
          }
        >
          Salvar
        </button>
        <form method="dialog">
          <button className="btn">Fechar</button>
        </form>
      </div>
    </>
  );
}

export default LivroForm;
