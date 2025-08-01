"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

// accessing the session on the client
function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
