"use client";

import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <button className="btn" onClick={() => router.back()}>
      Voltar
    </button>
  );
}

export default BackButton;
