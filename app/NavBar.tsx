"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";

import logo from "@/public/logo.png"; // Adjust the path as necessary

function NavBar() {
  const { status, data: session } = useSession();

  return (
    <main>
      <Image src={logo} alt="Logo do site" height={128} />
      <h1>Cadastrar livros</h1>
      <Link href="/livros">Livros</Link>
      {status === "loading" && <p>...</p>}
      {status === "authenticated" && (
        <>
          <p>
            Hello, {session.user?.name} ({session.user?.email}).{" "}
          </p>

          {/* unlike signOut(), link to signout page ask for confirmation before signing out */}
          {/* <Link href="/api/auth/signout" className="btn">
            Log out
          </Link> */}

          <button onClick={() => signOut({ callbackUrl: "/" })} className="btn">
            Log out
          </button>
        </>
      )}
      {status === "unauthenticated" && (
        <p>
          <Link href="/api/auth/signin">Login</Link>{" "}
        </p>
      )}
    </main>
  );
}

export default NavBar;
