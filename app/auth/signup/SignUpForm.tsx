"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsInProgress(true);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha: password }),
    });
    const responseJson = await response.json();

    if (!response.ok) {
      alert(
        `Falha ao tentar criar a conta. Abra o console para mais detalhes.`
      );
      console.log("Erro:", responseJson);
      setIsInProgress(false);
    } else {
      alert("Conta criada com sucesso!");
      signIn("credentials", {
        email,
        password,
      });
    }

    return;
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="form-control mb-4">
        <label className="input validator w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@site.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Digite um email válido</div>
      </div>
      <div className="form-control mb-4">
        <label className="input validator w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            // @ts-ignore
            minLength="6"
            title="Deve ter no mínimo 6 caracteres"
          />
        </label>
        <p className="validator-hint hidden">Deve ter no mínimo 6 caracteres</p>
      </div>
      <button
        type="submit"
        className="btn ml-auto px-8 mt-2"
        disabled={isInProgress}
      >
        Criar
      </button>
    </form>
  );
}

export default SignUpForm;
