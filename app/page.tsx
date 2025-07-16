import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/authOptions";

async function Home() {
  // accessing the session on the server
  const session = await getServerSession(authOptions);

  return (
    <main>Welcome to the homepage, {session?.user?.name ?? "stranger"}</main>
  );
}

export default Home;
