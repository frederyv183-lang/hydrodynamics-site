import Link from "next/link";

export const metadata = {
  title: "Нет подключения — Гидродинамика",
};

export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-2xl py-20 text-center">
      <h1 className="mb-4 text-3xl font-bold">Нет подключения к интернету</h1>
      <p className="mb-8 text-slate-600">
        Приложение работает офлайн. Откройте ранее посещённые страницы —
        они доступны без сети. Как только появится интернет, обновления
        подтянутся автоматически.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-slate-900 px-6 py-3 text-white hover:bg-slate-700"
      >
        На главную
      </Link>
    </div>
  );
}
