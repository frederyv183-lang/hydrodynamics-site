import Link from "next/link";
import SearchDialog, { SearchButton } from "./SearchDialog";

const nav = [
  { href: "/formulas", label: "Формулы" },
  { href: "/models", label: "Модели" },
  { href: "/methods", label: "\u041c\u0435\u0442\u043e\u0434\u044b" },
  { href: "/calculators", label: "Калькуляторы" },
  { href: "/glossary", label: "Глоссарий" },
  { href: "/symbols", label: "Сокращения" },
  { href: "/atmosphere", label: "Атмосфера и океан" },
  { href: "/about", label: "О проекте" }
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-brand-700 hover:text-brand-800"
        >
          Гидродинамика
        </Link>
        <div className="flex flex-1 items-center justify-end gap-3">
          <nav className="hidden flex-wrap items-center gap-1 md:flex sm:gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <SearchButton />
        </div>
      </div>
      <SearchDialog />
    </header>
  );
}