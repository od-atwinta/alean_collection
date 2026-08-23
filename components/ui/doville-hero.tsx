"use client";

import { useEffect, useRef, useState } from "react";
import { PhotoGallery } from "./photo-gallery";
import { BookingBar } from "./booking-bar";
import { SiteHeader } from "./site-header";

// Разделы страницы курорта — они же пункты меню на телефоне.
export const dovilleLinks = [
  { label: "Об отеле", href: "#about" },
  { label: "Акции", href: "#offers" },
  { label: "Номера", href: "#rooms" },
  { label: "Инфраструктура", href: "#infrastructure" },
  { label: "Для детей", href: "#kids" },
  { label: "Пляж", href: "#beach" },
  { label: "Развлечения", href: "#entertainment" },
  { label: "Лояльность", href: "#loyalty" },
];

// Плашки главного экрана. Первая — видео, остальные фотографии.
const tiles = [
  { image: "/doville-beach.webp", caption: "Собственный пляж в 500 метрах" },
  { image: "/doville-g2-518.webp", caption: "Территория в нормандском стиле" },
];

function PlayIcon({ paused }: { paused: boolean }) {
  return <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
    {paused ? <path d="M8 5.5v13l11-6.5z" /> : <><rect x="8" y="5.5" width="3.2" height="13" rx="1" /><rect x="13.8" y="5.5" width="3.2" height="13" rx="1" /></>}
  </svg>;
}

const dovillePhotos = [
  { src: "/doville-wide-1.webp", caption: "Курорт на Пионерском проспекте" },
  { src: "/doville-pools.webp", caption: "Бассейны курорта" },
  { src: "/doville-beach.webp", caption: "Собственный пляж" },
  { src: "/doville-room-family-superior.webp", caption: "Семейный номер Superior" },
  { src: "/doville-room-apart.webp", caption: "Апартаменты" },
  { src: "/doville-cafe-karamelka.webp", caption: "Кафе «Карамелька»" },
  { src: "/doville-animation.webp", caption: "Анимация для детей" },
  { src: "/doville-academy-sport.webp", caption: "Спортивная академия" },
];

export function DovilleHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  // Видео не должно крутиться, когда экран уехал вверх: это лишняя нагрузка на слабых машинах.
  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.pause();
      node.dataset.userPaused = "1";
      // Состояние меняем на следующем кадре: правка прямо в эффекте вызывает лишний проход отрисовки.
      const frame = requestAnimationFrame(() => setPaused(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { if (!node.dataset.userPaused) node.play().catch(() => {}); }
        else node.pause();
      });
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) { delete node.dataset.userPaused; node.play().catch(() => {}); setPaused(false); }
    else { node.dataset.userPaused = "1"; node.pause(); setPaused(true); }
  };

  return <section className="hero hotel-hero doville-hero" id="top">
    <SiteHeader
      homeHref="/#top"
      bookingHref="#booking-bar"
      bookingLabel="Забронировать Doville"
      title="Alean Family Doville"
      menuSections={<DovilleMenuSections />}
    />

    <div className="dv-hero-head shell">
      <nav className="dv-crumbs" aria-label="Хлебные крошки">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#top">Alean Collection</a><span aria-hidden="true">·</span>
        <span>Отели</span><span aria-hidden="true">·</span>
        <span>Alean Family Doville</span>
      </nav>
      <p className="micro">Alean Family · Анапа · 5*</p>
      <h1>Alean Family Doville</h1>
      <p className="dv-hero-note">Собрание семейных впечатлений: динамичное множество услуг, которые каждый раз складываются в новые эмоции — и в спокойствие за детей.</p>
    </div>

    <div className="dv-triptych shell">
      <figure className="dv-tile dv-tile-video">
        <video ref={videoRef} muted loop playsInline autoPlay preload="metadata" poster="/doville-wide-1.webp" aria-label="Видео о курорте Alean Family Doville">
          <source src="/doville-hero.mp4" type="video/mp4" />
        </video>
        <span className="dv-tile-shade" aria-hidden="true" />
        <figcaption>Курорт на Пионерском проспекте, Анапа</figcaption>
        <button type="button" className="dv-video-toggle" onClick={toggle} aria-label={paused ? "Включить видео" : "Остановить видео"}>
          <PlayIcon paused={paused} />
        </button>
      </figure>
      <div className="dv-side">
        {tiles.map((tile) => <figure className="dv-tile" key={tile.image} style={{ backgroundImage: `url('${tile.image}')` }}>
          <span className="dv-tile-shade" aria-hidden="true" />
          <figcaption>{tile.caption}</figcaption>
        </figure>)}
      </div>
      <PhotoGallery photos={dovillePhotos} />
    </div>

    <div className="hotel-booking-band">
      <BookingBar destinations={null} fixedDestination="Alean Family Doville 5*" submitLabel="Подобрать номер" action="#rooms" />
    </div>
  </section>;
}

function DovilleMenuSections() {
  return <>
    <p>Разделы курорта</p>
    <div className="site-menu-page-links">
      <nav aria-label="Разделы страницы курорта">{dovilleLinks.map((item) => <a key={item.href} href={item.href}>{item.label}<span aria-hidden="true">↓</span></a>)}</nav>
    </div>
  </>;
}

// Какой раздел сейчас читают: последний, чей верх уже ушёл под шапку.
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = dovilleLinks.map((item) => item.href.slice(1));
    const pick = () => {
      let current = "";
      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= 160) current = id;
      });
      setActive(current);
    };
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

export function DovilleInPageNav() {
  const active = useActiveSection();
  return <div className="hotel-inpage-bar">
    <nav className="hotel-inpage-nav shell" aria-label="Разделы страницы курорта">
      <div className="hotel-inpage-links">{dovilleLinks.map((item) => <a key={item.href} href={item.href} className={active === item.href.slice(1) ? "active" : ""} aria-current={active === item.href.slice(1) ? "true" : undefined}>{item.label}</a>)}</div>
      <span className="dv-nav-badge">Ультра всё включено <span aria-hidden="true">↗</span></span>
    </nav>
  </div>;
}
