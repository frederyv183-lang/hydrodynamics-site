export const metadata = {
  title: "О проекте — Гидродинамика"
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-brand-900">О проекте</h1>
      <p className="mt-4 text-slate-600">
        Это учебный справочник по гидродинамике: формулы, модели и
        калькуляторы. Сайт строится на Next.js 14 (App Router), Tailwind CSS
        и TypeScript.
      </p>
    </div>
  );
}
