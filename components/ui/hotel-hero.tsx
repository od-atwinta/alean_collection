"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { SiteHeader } from "./site-header";

type Season = "summer" | "winter";
const SeasonContext = createContext<{ season: Season; setSeason: (season: Season) => void }>({ season: "summer", setSeason: () => {} });
export const useSeason = () => useContext(SeasonContext);

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<Season>("summer");
  return <SeasonContext.Provider value={{ season, setSeason }}>
    <div className={`season-${season}`}>{children}</div>
  </SeasonContext.Provider>;
}

const inPageLinks = [
  { label: "Об отеле", href: "#about" },
  { label: "Номера", href: "#rooms" },
  { label: "Инфраструктура и для детей", href: "#infrastructure" },
  { label: "Развлечения", href: "#entertainment" },
  { label: "Лояльность", href: "#loyalty" },
];

function SeasonToggle() {
  const { season, setSeason } = useSeason();
  return <div className="season-toggle" role="group" aria-label="Сезон отдыха">
    <button type="button" className={season === "summer" ? "active" : ""} onClick={() => setSeason("summer")}>Лето</button>
    <button type="button" className={season === "winter" ? "active" : ""} onClick={() => setSeason("winter")}>Зима</button>
  </div>;
}

const galleryImages = [
  "/alean-official-hotel-sophia.webp",
  "/alean-official-brand-mountains.webp",
  "/alean-official-route-mountains.webp",
  "/alean-04.jpg",
];

export function HotelHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((value) => (value + 1) % galleryImages.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !parallaxRef.current) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (parallaxRef.current) parallaxRef.current.style.transform = `translateY(${Math.min(window.scrollY * 0.28, 140)}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <section className="hero hotel-hero" id="top">
    <SiteHeader />
    <div className="hotel-hero-stage">
      <div className="hotel-hero-parallax" ref={parallaxRef} aria-hidden="true">
        {galleryImages.map((image, index) => <span key={image} className={index === activeSlide ? "active" : ""} style={{ backgroundImage: `url('${image}')` }} />)}
      </div>
      <div className="hotel-hero-gradient" aria-hidden="true" />
      <div className="hotel-hero-copy shell">
        <p className="micro">Alean Club · Архыз · 4*</p>
        <h1>Alean Club Sophia</h1>
        <p className="hotel-hero-note">Единственный горный отель коллекции у самого подъёмника — тишина сосен и вид на хребет Архыза</p>
      </div>
      <div className="hotel-hero-dots" aria-hidden="true">{galleryImages.map((image, index) => <span key={image} className={index === activeSlide ? "active" : ""} />)}</div>
    </div>
    <nav className="hotel-inpage-nav shell" aria-label="Разделы страницы отеля">
      <div className="hotel-inpage-links">{inPageLinks.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
      <SeasonToggle />
    </nav>
  </section>;
}
