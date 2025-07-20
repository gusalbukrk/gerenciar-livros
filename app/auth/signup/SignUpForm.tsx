"use client";

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

    if (!response.ok) {
      alert(`Falha ao tentar criar a conta.`);
      setIsInProgress(false);
    } else {
      alert("Conta criada com sucesso!");
      router.push("/api/auth/signin");
    }

    return;
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="form-control mb-4">
        <label className="label mb-2">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label mb-2">
          <span className="label-text">Password</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full pr-10"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="btn ml-auto px-8"
        disabled={isInProgress}
      >
        Criar
      </button>
    </form>
  );
}

export default SignUpForm;
