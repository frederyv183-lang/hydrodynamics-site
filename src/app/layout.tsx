import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import "../styles/katex-overrides.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Гидродинамика — справочник и калькуляторы",
  description: "Формулы, модели и калькуляторы по гидродинамике",
  keywords: ["гидродинамика", "атмосфера", "океанография"],
  manifest: "/manifest.webmanifest",
};

const swScript = `
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(function (reg) { console.log('[SW] зарегистрирован, scope:', reg.scope); })
        .catch(function (err) { console.error('[SW] ошибка:', err); });
    });
  }
`;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
