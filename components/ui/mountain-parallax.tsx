"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function MountainParallax({ text, stats }: { text: ReactNode; stats: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const ridgeRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = sectionRef.current;
    if (!node) return;

    // Размах каждого плана живёт в стилях, но читаем мы его только при смене сезона:
    // чтение стилей на каждом кадре заставляет браузер пересчитывать страницу,
    // и движение начинает отставать от прокрутки.
    const planes = [
      { ref: ridgeRef, name: "--shift-far", fallback: 42, travel: 0 },
      { ref: midRef, name: "--shift-mid", fallback: 0, travel: 0 },
      { ref: nearRef, name: "--shift-near", fallback: 0, travel: 0 },
      { ref: textRef, name: "--shift-text", fallback: 22, travel: 0 },
    ];
    // Читаем не чаще раза в четверть секунды: на каждом кадре это заставляло бы
    // браузер пересчитывать страницу, и планы отставали бы от прокрутки.
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

    // Планы догоняют прокрутку плавно, а не повторяют её рывок в рывок: без этого
    // резкое движение колеса видно как дёрганье, а остановка - как скачок.
    // Шаг считаем от времени, а не от кадра: на экране 120 Гц кадры вдвое чаще,
    // и привязка к кадру ускоряла бы движение ровно вдвое.
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
      // За 100 мс проходим около 80% оставшегося пути, с какой бы частотой ни шли кадры.
      current += distance * (1 - Math.pow(0.2, step / 100));
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

    // Сезон переключается сменой класса у предка, а не перерисовкой этого блока,
    // поэтому размах перечитываем заново при первой же прокрутке после переключения.
    const seasonHost = node.closest('[class*="season-"]');
    const observer = new MutationObserver(() => {
      readAt = 0;
      onScroll();
    });
    if (seasonHost) observer.observe(seasonHost, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section className="about-parallax" id="about" ref={sectionRef} aria-label="Об отеле">
    <div className="about-parallax-layers" aria-hidden="true">
      <div className="ridge-far" ref={ridgeRef} />
      <div className="ridge-mid" ref={midRef} />
      <div className="ridge-near" ref={nearRef} />
    </div>
    <div className="about-parallax-content shell">
      <div className="about-text" ref={textRef}>{text}</div>
      {stats}
    </div>
  </section>;
}
