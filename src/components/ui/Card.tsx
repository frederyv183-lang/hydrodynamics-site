import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  href?: string;
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  children?: ReactNode;
};

export default function Card({
  href,
  title,
  description,
  badge,
  className,
  children
}: CardProps) {
  const body = (
    <div
      className={cn(
        "block h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition",
        href && "hover:border-brand-300 hover:shadow-md",
        className
      )}
    >
      {badge ? (
        <span className="mb-2 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
          {badge}
        </span>
      ) : null}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description ? (
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      ) : null}
      {children}
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full no-underline">
      {body}
    </Link>
  ) : (
    body
  );
}
