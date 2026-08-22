"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    // Прятать блоки можно только когда скрипт жив: без него ничего не пропадёт.
    document.documentElement.classList.add("reveal-ready");

    const pending = () => [...document.querySelectorAll<HTMLElement>(".reveal:not(.revealed)")];
    const show = (item: Element) => item.classList.add("revealed");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    pending().forEach((item) => observer.observe(item));

    // Подстраховка: если наблюдатель промолчал (вкладка была скрыта, возврат по истории,
    // экономия ресурсов браузером), показываем всё, что уже попало на экран.
    let timer = 0;
    const sweep = () => {
      timer = 0;
      const limit = window.innerHeight - 60;
      pending().forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < limit && rect.bottom > 0) show(item);
      });
    };
    // Таймер, а не requestAnimationFrame: он срабатывает даже на скрытой вкладке,
    // поэтому блоки не могут остаться невидимыми.
    const scheduleSweep = () => {
      if (!timer) timer = window.setTimeout(sweep, 80);
    };

    sweep();
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep);
    window.addEventListener("pageshow", scheduleSweep);
    document.addEventListener("visibilitychange", scheduleSweep);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("scroll", scheduleSweep);
      window.removeEventListener("resize", scheduleSweep);
      window.removeEventListener("pageshow", scheduleSweep);
      document.removeEventListener("visibilitychange", scheduleSweep);
    };
  }, []);
  return null;
}
