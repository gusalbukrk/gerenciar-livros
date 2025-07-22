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
      <dialog id={`edit_modal_${livro.id}`} className="modal">
        <div className="modal-box">
          <LivroForm livro={livro} onSuccess={onEditSuccess} />
        </div>
        {/* click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default EditButton;
