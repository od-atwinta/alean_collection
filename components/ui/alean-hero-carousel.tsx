"use client";

import { useEffect, useState } from "react";
import { BookingBar } from "./booking-bar";
import { SiteHeader } from "./site-header";

const hero = { eyebrow: "Море", title: "К морю\nза общими\nвпечатлениями", text: "Семейные курорты в Анапе, Геленджике и Сочи", image: "/alean-official-hero-beach.webp" };

const slides = [
  { eyebrow: "Море", title: "К морю\nза общими\nвпечатлениями", text: "Семейные курорты в Анапе, Геленджике и Сочи", image: "/alean-official-route-sea.webp" },
  { eyebrow: "Горы", title: "Выше\nповседневных\nмаршрутов", text: "Отели у склонов Архыза для отдыха круглый год", image: "/alean-official-route-mountains.webp" },
  { eyebrow: "Отели", title: "Место,\nкуда хочется\nвернуться", text: "Курортные отели 4* и 5* с единым стандартом заботы", image: "/alean-official-route-hotels.webp" },
];

export function BrandLocationCards() {
  return <>
    <article className="brand-card brand-family reveal"><div className="brand-copy"><h3>Отдых у моря<br/>для всей семьи</h3><p>Анапа, Геленджик и Сочи. Первая береговая линия, детские клубы, SPA и формат «Ультра все включено».</p><ul><li>7 семейных курортов</li><li>Отели 4* и 5*</li></ul></div><a href="https://aleancollection.ru/brands/">Все бренды <i className="arrow-ne" aria-hidden="true" /></a></article>
    <article className="brand-card brand-club reveal"><div className="brand-copy"><h3>Архыз<br/>круглый год</h3><p>Зимой - катание, летом - маршруты, воздух и тишина. Для семейных поездок и отдыха вдвоем.</p><ul><li>Горнолыжный сезон</li><li>SPA и бассейны</li></ul></div><a href="https://aleancollection.ru/hotels/">Все локации <i className="arrow-ne" aria-hidden="true" /></a></article>
  </>;
}

const developmentHotels = [
  { name: "Alean Family Doville", image: "/alean-official-hotel-doville.webp" },
  { name: "Alean Club Sophia", image: "/alean-official-hotel-sophia.webp" },
  { name: "Alean Select Pino", image: "/alean-official-hotel-pino.webp" },
];

export function DevelopmentShowcase() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % developmentHotels.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="development-showcase">
    <div className="development-photo" role="img" aria-label={developmentHotels[active].name}>
      {developmentHotels.map((hotel, index) => <span key={hotel.name} className={index === active ? "active" : ""} style={{ backgroundImage: `url('${hotel.image}')` }} />)}
    </div>
    <p className="development-caption">{developmentHotels[active].name}</p>
  </div>;
}

export function AleanHeroCarousel() {
  const current = hero;

  return <section className="hero" id="top">
    <SiteHeader />
    <div className="hero-stage shell">
      <div className="hero-photo" style={{ backgroundImage: `url('${current.image}')` }} role="img" aria-label={current.text}>
        <div className="hero-copy"><h1>{current.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><div className="hero-note"><p>{current.text}</p></div></div>
        <div className="halo" aria-hidden="true"><img src="/alean-mark.svg" alt="" /></div>
      </div>
    </div>
    <div className="hero-facts" aria-label="Alean Collection в цифрах">
      {["23 500+ номеров", "8 городов", "21 отель", "20 лет на рынке"].map((item) => <span key={item}><strong>{item}</strong></span>)}
    </div>
    <BookingBar />
  </section>;
}

export function AleanRouteCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 3000);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="route-explorer">
    <div className="route-frame" role="img" aria-label={slides[active].text}>
      <div className="route-images" aria-hidden="true">{slides.map((slide, index) => <span key={slide.eyebrow} className={index === active ? "active" : ""} style={{backgroundImage:`url('${slide.image}')`}} />)}</div>
      <div className="route-mission"><p>Alean Collection: больше хороших мест для отдыха в России<br/>и сервис, ради которого хочется возвращаться</p></div>
    </div>
  </div>;
}
