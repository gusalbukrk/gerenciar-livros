import type { Metadata } from "next";
import { Ubuntu, Kanit } from "next/font/google";

import AuthProvider from "./auth/Provider";
import NavBar from "./components/NavBar";

import "./globals.css";
import { ThemeProvider } from "next-themes";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Gerenciar Livros — Sistema CRUD básico para livros",
  description: "Prova Técnica para a vaga de Analista de Sistemas Jr.",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning data-theme="light">
      <body
        className={`antialiased ${ubuntu.variable} ${kanit.variable} max-w-7xl mx-auto`}
      >
        <AuthProvider>
          <ThemeProvider enableSystem={false} defaultTheme="dark">
            <>
              <NavBar />
              {children}
            </>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
