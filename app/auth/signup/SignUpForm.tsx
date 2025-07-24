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
      <div className="form-control mb-4 relative">
        {" "}
        <label className="input validator w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            // @ts-expect-error custom field for daisyui validation
            minLength="6"
            title="Deve ter no mínimo 6 caracteres"
          />
        </label>
        <span
          className="absolute right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          style={{ top: "1.25rem" }} // before was using class top-1/2, but didn't centered when there were error messages to display below the input
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </span>
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
