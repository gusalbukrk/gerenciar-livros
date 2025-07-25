// used for both creating and editing books

"use client";

import { useEffect, useState } from "react";
import { getModalElement, LivroWithAutor, LivroWithAutorDto } from "../shared";
import LivroFormField from "./LivroFormField";

const livroEmpty: LivroWithAutorDto = {
  titulo: "",
  autor: { nome: "" },
  genero: "",
  anoPublicacao: 2025,
  estoqueQuantidade: 1,
};

function LivroForm({
  livro, // undefined if creating a new book, otherwise contains the book to edit
  onSuccess,
}: {
  livro?: LivroWithAutor;
  onSuccess: (livroReturned: LivroWithAutor) => void;
}) {
  const isCreation = livro === undefined; // if false, is editing

  // LivroWithAutorDto is used when creating a new book, while LivroWithAutor is used when editing an existing book
  const [formData, setFormData] = useState<LivroWithAutorDto | LivroWithAutor>(
    livro ?? livroEmpty
  );
  const [isInProgress, setIsInProgress] = useState(false); // creation or edition in progress
  const [isAIInProgress, setIsAIInProgress] = useState(false); // AI generation in progress

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "autor.nome") {
        return {
          ...prevData,
          autor: { nome: value },
        };
      }
      return {
        ...prevData,
        [name]:
          name === "anoPublicacao" || name === "estoqueQuantidade"
            ? Number(value)
            : value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsInProgress(true);

    const body = {
      titulo: formData.titulo,
      autor: { nome: formData.autor.nome },
      genero: formData.genero,
      anoPublicacao: formData.anoPublicacao,
      estoqueQuantidade: formData.estoqueQuantidade,
    };

    const response = await fetch(
      isCreation ? "/api/livros" : `/api/livros/${livro.id}`,
      {
        method: isCreation ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const responseJson = await response.json();

    if (!response.ok) {
      alert(
        `Falha ao tentar ${isCreation ? "criar" : "editar"} o livro. Abra o console para mais detalhes.`
      );
      console.error("Erro:", responseJson);
    } else {
      alert(
        isCreation
          ? "Livro criado com sucesso!"
          : `Livro ${livro.id} editado com sucesso!`
      );
      onSuccess(responseJson); // responseJson is LivroWithAutor when successful
      getModalElement(
        isCreation ? "create_modal" : `edit_modal_${livro.id}`
      ).close();
      if (isCreation) setFormData(livroEmpty); // reset formData
    }

    setIsInProgress(false);

    return;
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.currentTarget as HTMLFormElement).requestSubmit();
    }
  };

  const handleAIOrScraping = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleAIOrScraping called");
    const actionType = (e.target as HTMLButtonElement).dataset.actionType!;

    setIsAIInProgress(true);

    try {
      const response = await fetch(
        `/api/livros/${actionType}?titulo=${formData.titulo}`
      );
      const responseJson = (await response.json()) as LivroWithAutorDto;

      if (!response.ok) {
        throw responseJson;
      }

      setFormData(
        (prevData) =>
          ({
            ...prevData,
            titulo: responseJson.titulo,
            autor: { nome: responseJson.autor.nome },
            genero: responseJson.genero,
            anoPublicacao: responseJson.anoPublicacao,
          }) as unknown as LivroWithAutorDto
      );
    } catch (error) {
      alert(
        "Erro ao tentar gerar/extrair informações do livro. Verifique o console para mais detalhes."
      );
      console.log(error);
    }

    setIsAIInProgress(false);
  };

  const cleanFormFields = () => setFormData(isCreation ? livroEmpty : livro);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") cleanFormFields();
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  return (
    <dialog
      id={isCreation ? `create_modal` : `edit_modal_${livro.id}`}
      className="modal"
    >
      <div className="modal-box">
        {/* <LivroForm onSuccess={onCreateSuccess} /> */}
        <>
          <h3 className="font-bold text-lg mb-5">
            {isCreation ? (
              `Criar livro`
            ) : (
              <>
                Editar livro
                <span className="text-gray-400 ml-2">id: {livro.id}</span>
              </>
            )}
          </h3>
          <form
            id={isCreation ? "createForm" : `editForm${livro.id}`}
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
              disabled={isAIInProgress}
            />
            <div className="form-control mb-4 flex">
              <div className="ml-auto flex gap-4">
                <button
                  data-action-type="scrape"
                  className="btn"
                  onClick={handleAIOrScraping}
                  type="button"
                  disabled={isAIInProgress}
                >
                  Extrair da Amazon
                </button>
                <button
                  data-action-type="ai"
                  className="btn"
                  onClick={handleAIOrScraping}
                  type="button"
                  disabled={isAIInProgress}
                >
                  Gerar com IA
                </button>
              </div>
            </div>
            <LivroFormField
              label="Autor"
              type="text"
              name="autor.nome"
              value={formData.autor.nome}
              handleChange={handleChange}
              disabled={isAIInProgress}
            />
            <LivroFormField
              label="Gênero"
              type="text"
              name="genero"
              value={formData.genero}
              handleChange={handleChange}
              disabled={isAIInProgress}
            />
            <LivroFormField
              label="Ano de publicação"
              type="number"
              name="anoPublicacao"
              value={formData.anoPublicacao?.toString()}
              handleChange={handleChange}
              disabled={isAIInProgress}
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
            <form method="dialog">
              <button className="btn" onClick={cleanFormFields}>
                Fechar
              </button>
            </form>
            <button
              type="submit"
              className="btn"
              disabled={isInProgress || isAIInProgress}
              onClick={() =>
                (
                  document.querySelector(
                    isCreation ? "#createForm" : `#editForm${livro.id}`
                  ) as HTMLFormElement
                ).requestSubmit()
              }
            >
              Salvar
            </button>
          </div>
        </>
      </div>
      {/* click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={cleanFormFields}>close</button>
      </form>
    </dialog>
  );
}

export default LivroForm;
