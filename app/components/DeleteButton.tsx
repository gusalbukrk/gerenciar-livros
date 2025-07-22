"use client";

import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

interface Props {
  id: number;
  onDeleteSuccess: (id: number) => void;
}

function DeleteButton({ id, onDeleteSuccess }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const response = await fetch(`/api/livros/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();

    if (!response.ok) {
      alert(
        "Falha ao tentar excluir o livro. Abra o console para mais detalhes."
      );
      console.log("Erro:", responseJson);
    } else {
      alert(`Livro ${id} deletado com sucesso!`);
    }

    onDeleteSuccess(id);
    setIsDeleting(false);

    return;
  };

  return (
    <button className="btn" onClick={handleDelete} disabled={isDeleting}>
      <FaTrashCan className="text-base" />
    </button>
  );
}

export default DeleteButton;
