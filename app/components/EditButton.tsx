"use client";

import { FaPenToSquare } from "react-icons/fa6";

import LivroForm from "./LivroForm";
import { getModalElement, LivroWithAutor } from "../shared";

function EditButton({
  livro,
  onEditSuccess,
}: {
  livro: LivroWithAutor;
  onEditSuccess: (livroEdited: LivroWithAutor) => void;
}) {
  return (
    <>
      <button
        className="btn"
        onClick={() => getModalElement(`edit_modal_${livro.id}`).showModal()}
      >
        <FaPenToSquare className="text-base" />
      </button>
      <LivroForm livro={livro} onSuccess={onEditSuccess} />
    </>
  );
}

export default EditButton;
