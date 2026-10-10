const MAP: Record<string, string> = {
  а: "a",  б: "b",  в: "v",  г: "g",  д: "d",  е: "e",  ё: "e",  ж: "zh",
  з: "z",  и: "i",  й: "j",  к: "k",  л: "l",  м: "m",  н: "n",  о: "o",
  п: "p",  р: "r",  с: "s",  т: "t",  у: "u",  ф: "f",  х: "h",  ц: "c",
  ч: "ch", ш: "sh", щ: "shh", ъ: "",   ы: "y",  ь: "",   э: "e",  ю: "yu",
  я: "ya"
};

export function translit(input: string): string {
  if (!input) return "";
  const lower = input.toLowerCase();
  let out = "";
  for (const ch of lower) out += MAP[ch] ?? ch;
  return out;
}