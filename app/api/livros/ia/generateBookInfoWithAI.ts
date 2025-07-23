import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import extractJsonFromStringBase from "extract-json-from-string";

import { Livro, Prisma } from "@/app/generated/prisma";
import { LivroInfoGeneratedByIA } from "@/app/shared";

const __dirname = dirname(fileURLToPath(import.meta.url));
const extractJsonFromString = extractJsonFromStringBase<LivroInfoGeneratedByIA>;

const openai = new OpenAI({
  // baseURL: "https://openrouter.ai/api/v1",
  baseURL: "https://api.naga.ac/v1",
  apiKey: process.env.NAGAAI_API_KEY,
});

const generatePrompt = (livroName: string) =>
  `${fs.readFileSync(
    path.join(__dirname, "../../../promptTemplate.md"),
    "utf-8"
  )} "${livroName}"`;

export default async function generateBookInfoWithAI(bookName: string) {
  const completion = await openai.chat.completions.create({
    // model: "google/gemma-3n-e2b-it:free",
    model: "gemini-2.0-flash-001",
    messages: [
      {
        role: "user",
        content: generatePrompt(bookName),
      },
    ],
  });

  const content = completion.choices[0].message.content!.trim();
  const json = extractJsonFromString(content)[0];

  return json;
}
