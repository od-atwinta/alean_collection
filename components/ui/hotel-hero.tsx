"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { BookingBar } from "./booking-bar";
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

const seasonGallery = {
  summer: [
    "/sophia-summer-1.jpg",
    "/sophia-summer-2.webp",
    "/alean-official-hotel-sophia.webp",
    "/sophia-nature-routes.webp",
  ],
  winter: [
    "/sophia-winter-1.webp",
    "/sophia-winter-2.webp",
    "/sophia-winter-3.webp",
    "/sophia-pool.webp",
  ],
};

export function HotelHero() {
  const { season } = useSeason();
  const galleryImages = seasonGallery[season];
  const [activeSlide, setActiveSlide] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSlide(0);
  }, [season]);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((value) => (value + 1) % galleryImages.length), 4500);
    return () => window.clearInterval(timer);
  }, [galleryImages.length]);

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
    <SiteHeader homeHref="/#top" bookingHref="https://booking.aleancollection.ru/" bookingLabel="Забронировать Sophia" title="Alean Club Sophia" menuSections={<HotelMenuSections />} />
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
    <div className="hotel-booking-band">
      <BookingBar destinations={null} fixedDestination="Alean Club Sophia" submitLabel="Подобрать номер" action="#rooms" />
    </div>
  </section>;
}

// Разделы страницы для выпадающего меню: на телефоне полосы разделов нет.
function HotelMenuSections() {
  return <>
    <p>Разделы отеля</p>
    <div className="site-menu-page-links">
      <nav aria-label="Разделы страницы отеля">{inPageLinks.map((item) => <a key={item.href} href={item.href}>{item.label}<span aria-hidden="true">↓</span></a>)}</nav>
      <SeasonToggle />
    </div>
  </>;
}

// Какой раздел сейчас читают: последний, чей верх уже ушёл под шапку.
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = inPageLinks.map((item) => item.href.slice(1));
    const pick = () => {
      let current = "";
      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= 160) current = id;
      });
      setActive(current);
    };
    // Первый расчёт откладываем на кадр, чтобы не менять состояние прямо в эффекте.
    const frame = requestAnimationFrame(pick);
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);
  return active;
}

// Отдельная полоса: липнет под шапкой и остаётся доступной на всей странице отеля.
export function HotelInPageNav() {
  const active = useActiveSection();
  return <div className="hotel-inpage-bar">
    <nav className="hotel-inpage-nav shell" aria-label="Разделы страницы отеля">
      <div className="hotel-inpage-links">{inPageLinks.map((item) => <a key={item.href} href={item.href} className={active === item.href.slice(1) ? "active" : ""} aria-current={active === item.href.slice(1) ? "true" : undefined}>{item.label}</a>)}</div>
      <SeasonToggle />
    </nav>
  </div>;
}
