import { translit } from "./translit";

export function slugify(input: string): string {
  if (!input) return "";
  return translit(input)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}