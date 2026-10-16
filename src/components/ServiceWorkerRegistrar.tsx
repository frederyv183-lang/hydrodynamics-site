"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        console.log("[SW] зарегистрирован, scope:", reg.scope);
      })
      .catch((err) => {
        console.error("[SW] ошибка регистрации:", err);
      });
  }, []);

  return null;
}
