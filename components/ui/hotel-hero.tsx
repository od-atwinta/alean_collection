"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BookingBar } from "./booking-bar";
import { PhotoGallery } from "./photo-gallery";
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

// Три кадра на сезон: крупный слева, два поменьше справа - как на странице курорта в Анапе.
const heroScenes = {
  summer: {
    lead: { image: "/sophia-summer-1.jpg", caption: "Отель у подъёмника, Архыз" },
    side: [
      { image: "/sophia-summer-2.webp", caption: "Территория летом" },
      { image: "/sophia-nature-routes.webp", caption: "Маршруты к озёрам и перевалам" },
    ],
  },
  winter: {
    lead: { image: "/sophia-winter-1.webp", caption: "Отель у подъёмника, Архыз" },
    side: [
      { image: "/sophia-winter-2.webp", caption: "Трассы курорта в двух шагах" },
      { image: "/sophia-pool.webp", caption: "Бассейн и спа после склона" },
    ],
  },
};


const sophiaPhotos = [
  { src: "/sophia-summer-1.jpg", caption: "Отель у подъёмника, Архыз" },
  { src: "/sophia-winter-1.webp", caption: "Курорт зимой" },
  { src: "/sophia-nature-routes.webp", caption: "Маршруты к озёрам и перевалам" },
  { src: "/sophia-pool.webp", caption: "Бассейн" },
  { src: "/sophia-spa.jpg", caption: "Спа-комплекс" },
  { src: "/sophia-restaurant.webp", caption: "Ресторан «Всё включено»" },
  { src: "/sophia-lounge-bar.webp", caption: "Лаундж-бар" },
  { src: "/sophia-room-family.webp", caption: "Семейный люкс" },
  { src: "/sophia-kids.webp", caption: "Детский клуб" },
  { src: "/sophia-ski.jpg", caption: "Трассы курорта" },
];

export function HotelHero() {
  const { season } = useSeason();
  const scene = heroScenes[season];

  return <section className="hero hotel-hero" id="top">
    <SiteHeader homeHref="/#top" bookingHref="#booking-bar" bookingLabel="Забронировать Sophia" title="Alean Club Sophia" menuSections={<HotelMenuSections />} />

    <div className="dv-hero-head shell">
      <nav className="dv-crumbs" aria-label="Хлебные крошки">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#top">Alean Collection</a><span aria-hidden="true">·</span>
        <span>Отели</span><span aria-hidden="true">·</span>
        <span>Alean Club Sophia</span>
      </nav>
      <p className="micro">Alean Club · Архыз · 4*</p>
      <h1>Alean Club Sophia</h1>
      <p className="dv-hero-note">Единственный горный отель коллекции у самого подъёмника — тишина сосен, вид на хребет Архыза и «Всё включено» в 200 метрах от канатных дорог.</p>
    </div>

    <div className="dv-triptych shell">
      <figure className="dv-tile dv-tile-lead" style={{ backgroundImage: `url('${scene.lead.image}')` }}>
        <span className="dv-tile-shade" aria-hidden="true" />
        <figcaption>{scene.lead.caption}</figcaption>
      </figure>
      <div className="dv-side">
        {scene.side.map((tile) => <figure className="dv-tile" key={tile.image} style={{ backgroundImage: `url('${tile.image}')` }}>
          <span className="dv-tile-shade" aria-hidden="true" />
          <figcaption>{tile.caption}</figcaption>
        </figure>)}
      </div>
      <PhotoGallery photos={sophiaPhotos} />
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
