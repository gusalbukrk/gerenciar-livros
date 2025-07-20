"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

import logo from "@/public/logo.png"; // Adjust the path as necessary
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function NavBar() {
  const { status, data: session } = useSession();

  // could've use only DaisyUI (example: https://stackblitz.com/edit/react-checkbox-localstorage?file=src%2FApp.js)
  // but when non-default theme is set, it flashes the default theme before the theme is applied
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm mb-10 px-0">
      <div className="flex-1 flex items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Site logo" width={64} priority={true} />
          <h1 className="font-kanit font-bold text-2xl">gerenciar livros</h1>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {status === "unauthenticated" && (
            <>
              <li className="mr-2">
                <Link href="/auth/signup">Crie uma conta</Link>
              </li>
              <li className="mr-2">
                <Link href="/api/auth/signin">
                  Faça login para criar/editar/deletar livros
                </Link>
              </li>
            </>
          )}
          {status === "authenticated" && (
            <li className="mr-2">
              <button onClick={() => signOut({ callbackUrl: "/" })}>
                Log out{" "}
                <span className="text-xm text-gray-400">
                  {session.user?.email}
                </span>
              </button>
            </li>
          )}
          {/* unlike signOut(), link to signout page ask for confirmation before signing out */}
          {/* <Link href="/api/auth/signout" className="btn">
            Log out
          </Link> */}
          <li>
            {mounted && (
              <label className="flex cursor-pointer gap-2 !bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  className="toggle theme-controller"
                  type="checkbox"
                  checked={theme === "dark"}
                  value={theme ?? "dark"}
                  onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            )}
          </li>
          <li>
            <Link
              href="https://github.com/gusalbukrk/gerenciar-livros"
              target="_blank"
            >
              <FaGithub className="text-2xl" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
