import { z } from "zod";

const schema = z.object({
  email: z.email(),
  senha: z.string().min(6, "senha deve ter pelo menos 6 caracteres"),
});

export default schema;
