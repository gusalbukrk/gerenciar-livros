"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";

import LivroForm from "./LivroForm";
import { getModalElement, LivroWithAutor } from "../shared";

function CreateButton({
  onCreateSuccess,
}: {
  onCreateSuccess: (livroEdited: LivroWithAutor) => void;
}) {
  const { status } = useSession();
  if (status !== "authenticated") return null;

  return (
    <>
      <button
        className="btn flex gap-2 mb-5"
        onClick={() => getModalElement(`create_modal`).showModal()}
      >
        <FaPlus className="text-base" /> Criar livro
      </button>
      <dialog id={`create_modal`} className="modal">
        <div className="modal-box">
          <LivroForm onSuccess={onCreateSuccess} />
        </div>
        {/* click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default CreateButton;
