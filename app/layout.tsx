import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import AuthProvider from "./auth/Provider";
import NavBar from "./NavBar";

import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Cadastrar Livros",
  description: "Prova Técnica para a vaga de Analista de Sistemas Jr.",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased ${ubuntu.variable}`}>
        <AuthProvider>
          <>
            <NavBar />
            {children}
          </>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
