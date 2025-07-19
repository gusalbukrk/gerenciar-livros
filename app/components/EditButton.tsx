"use client";

import { FaPenToSquare } from "react-icons/fa6";

import { Livro } from "../generated/prisma";
import LivroForm from "./LivroForm";
import { getModalElement } from "../utils";

function EditButton({
  livro,
  onSuccess: onEditSuccess,
}: {
  livro: Livro;
  onSuccess: (livroEdited: Livro) => void;
}) {
  return (
    <>
      <button
        className="btn"
        onClick={() => getModalElement(`edit_modal_${livro.id}`).showModal()}
      >
        <FaPenToSquare className="text-base" />
      </button>
      <dialog id={`edit_modal_${livro.id}`} className="modal">
        <div className="modal-box">
          <LivroForm method="PATCH" livro={livro} onSuccess={onEditSuccess} />
        </div>
      </dialog>
    </>
  );
}

export default EditButton;
