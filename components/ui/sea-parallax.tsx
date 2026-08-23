"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Морской аналог горного параллакса: планы собраны из волн, а не из фотографий,
// поэтому блок не зависит от вырезанных PNG-слоёв и работает на любом экране.
function Wave({ className, inner }: { className: string; inner: (node: HTMLDivElement | null) => void }) {
  return <div className={className} ref={inner} aria-hidden="true">
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" focusable="false">
      <path d="M0 96c96-30 192-45 288-45s192 15 288 45 192 45 288 45 192-15 288-45 192-45 288-45v220H0z" />
    </svg>
  </div>;
}

export function SeaParallax({ text, stats }: { text: ReactNode; stats: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = sectionRef.current;
    if (!node) return;

    // Размах каждого плана задан в стилях, но читаем мы его редко: чтение стилей
    // на каждом кадре заставляет браузер пересчитывать страницу, и движение отстаёт.
    const planes = [
      { ref: sunRef, name: "--shift-sun", fallback: -120, travel: 0 },
      { ref: farRef, name: "--shift-far", fallback: -84, travel: 0 },
      { ref: midRef, name: "--shift-mid", fallback: -44, travel: 0 },
      { ref: nearRef, name: "--shift-near", fallback: 0, travel: 0 },
      { ref: textRef, name: "--shift-text", fallback: 26, travel: 0 },
    ];
    let readAt = Number.NEGATIVE_INFINITY;
    const readTravel = (now: number) => {
      if (now - readAt < 250) return;
      readAt = now;
      const styles = getComputedStyle(node);
      planes.forEach((plane) => {
        const value = parseFloat(styles.getPropertyValue(plane.name));
        plane.travel = Number.isFinite(value) ? value : plane.fallback;
      });
    };

    // -1 пока блок ниже экрана, +1 когда он полностью ушёл вверх.
    const measure = () => {
      const rect = node.getBoundingClientRect();
      const half = (window.innerHeight + rect.height) / 2;
      return Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / half));
    };

    let target = measure();
    let current = target;
    let frame = 0;

    const draw = () => {
      planes.forEach(({ ref, travel }) => {
        if (ref.current) ref.current.style.transform = `translate3d(0, ${(current * travel).toFixed(2)}px, 0)`;
      });
    };

    // Планы догоняют прокрутку плавно, а не повторяют её рывок в рывок.
    // Шаг считаем от времени, а не от кадра: на экране 120 Гц кадры вдвое чаще.
    let last = 0;
    const tick = (now: number) => {
      const step = Math.min(100, now - last);
      last = now;
      const distance = target - current;
      if (Math.abs(distance) < 0.0004) {
        current = target;
        frame = 0;
        draw();
        return;
      }
      current += distance * (1 - Math.pow(0.6, step / 100));
      draw();
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      readTravel(performance.now());
      target = measure();
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    readTravel(performance.now());
    draw();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section className="about-parallax sea-parallax" id="about" ref={sectionRef} aria-label="О курорте">
    <div className="sea-layers" aria-hidden="true">
      <div className="sea-sun" ref={sunRef} />
      <div className="sea-horizon" />
      <Wave className="sea-far" inner={(element) => { farRef.current = element; }} />
      <Wave className="sea-mid" inner={(element) => { midRef.current = element; }} />
      <Wave className="sea-near" inner={(element) => { nearRef.current = element; }} />
      <div className="sea-sand" />
    </div>
    <div className="about-parallax-content shell">
      <div className="about-text" ref={textRef}>{text}</div>
      {stats}
    </div>
  </section>;
}
