"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal:not(.revealed)");
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}
