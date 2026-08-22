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
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      // -1 while the section sits below the fold, +1 once it has scrolled past the top.
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / ((window.innerHeight + rect.height) / 2)));
      // Размах каждого плана задаётся в CSS: у зимы одна фотография, у лета три слоя.
      const styles = getComputedStyle(node);
      const shift = (name: string, fallback: number) => {
        const value = parseFloat(styles.getPropertyValue(name));
        return Number.isFinite(value) ? value : fallback;
      };
      // Передний план стоит на месте и держит низ кадра, дальние планы отстают и опускаются:
      // иначе гряда, которая есть на всех трёх слоях, двоилась бы.
      if (ridgeRef.current) ridgeRef.current.style.transform = `translate3d(0, ${progress * shift("--shift-far", 42)}px, 0)`;
      if (midRef.current) midRef.current.style.transform = `translate3d(0, ${progress * shift("--shift-mid", 0)}px, 0)`;
      if (nearRef.current) nearRef.current.style.transform = `translate3d(0, ${progress * shift("--shift-near", 0)}px, 0)`;
      if (textRef.current) textRef.current.style.transform = `translate3d(0, ${progress * 22}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
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
