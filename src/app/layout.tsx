import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import "../styles/katex-overrides.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Гидродинамика — справочник и калькуляторы",
  description: "Формулы, модели и калькуляторы по гидродинамике",
  keywords: ["гидродинамика", "атмосфера", "океанография"]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
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
