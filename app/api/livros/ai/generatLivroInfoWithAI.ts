import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import extractJsonFromStringBase from "extract-json-from-string";

import { LivroWithAutorDto } from "@/app/shared";

const __dirname = dirname(fileURLToPath(import.meta.url));
const extractJsonFromString = extractJsonFromStringBase<LivroWithAutorDto>;

const openai = new OpenAI({
  // baseURL: "https://openrouter.ai/api/v1",
  baseURL: "https://api.naga.ac/v1",
  apiKey: process.env.NAGAAI_API_KEY,
});

const generatePrompt = (livroName: string) =>
  `${fs.readFileSync(
    path.join(__dirname, "./prompt.md"),
    "utf-8"
  )} "${livroName}"`;

export default async function generateLivroInfoWithAI(livroName: string) {
  const completion = await openai.chat.completions.create({
    // model: "google/gemma-3n-e2b-it:free",
    model: "gemini-2.0-flash-001",
    messages: [
      {
        role: "user",
        content: generatePrompt(livroName),
      },
    ],
  });

  const content = completion.choices[0].message.content!.trim();
  console.log("AI Response:", content);
  const json = extractJsonFromString(content)[0] as LivroWithAutorDto;

  return json;
}
