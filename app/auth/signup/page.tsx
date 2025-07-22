import { getServerSession } from "next-auth";

import SignUpForm from "./SignUpForm";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";

async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session !== null) {
    redirect("/");
  }

  return (
    <main className="max-w-md mx-auto">
      <h3 className="font-bold text-lg mb-5">Criar conta</h3>
      <SignUpForm />
    </main>
  );
}

export default SignUpPage;
