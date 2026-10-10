import Link from "next/link";

const nav = [
  { href: "/formulas", label: "Формулы" },
  { href: "/models", label: "Модели" },
  { href: "/calculators", label: "Калькуляторы" },
  { href: "/atmosphere", label: "Атмосфера и океан" },
  { href: "/about", label: "О проекте" }
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-brand-700 hover:text-brand-800"
        >
          Гидродинамика
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
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
      </div>
    </header>
  );
}
