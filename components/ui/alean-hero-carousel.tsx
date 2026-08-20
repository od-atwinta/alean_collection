"use client";

import { useEffect, useState } from "react";

const slides = [
  { eyebrow: "Море", title: "К морю\nза общими\nвпечатлениями", text: "Семейные курорты в Анапе, Геленджике и Сочи", image: "/alean-01.webp" },
  { eyebrow: "Горы", title: "Выше\nповседневных\nмаршрутов", text: "Отели у склонов Архыза для отдыха круглый год", image: "/alean-04.jpg" },
  { eyebrow: "Отели", title: "Место,\nкуда хочется\nвернуться", text: "Курортные отели 4* и 5* с единым стандартом заботы", image: "/alean-05.webp" },
];

function DirectionIcon({ type }: { type: "Море" | "Горы" | "Отели" }) {
  if (type === "Море") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1"/></svg>;
  if (type === "Горы") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 3 4 8 3-4 7 14H2L8 3Z"/><path d="m5.5 11 2.5-2 2.5 2"/><path d="m13.5 9 1.5 2 1.5-2"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12a11 11 0 0 1 22 0H1Z"/><path d="M5 12a7 7 0 0 1 14 0"/><path d="M12 2v16a2 2 0 0 0 4 0"/></svg>;
}

export function AleanHeroCarousel() {
  const current = slides[0];

  return <section className="hero" id="top">
    <header className="nav shell">
      <a className="logo" href="#top" aria-label="Alean Collection"><img src="/alean-logo.svg" alt="Alean Collection" /></a>
      <nav aria-label="Основная навигация"><a href="#hotels">Отели</a><a href="#brands">Бренды</a><a href="#offers">Акции</a><a href="#loyalty">Лояльность</a></nav>
      <div className="nav-actions"><a href="tel:88002500030">8 800 250 00 30</a><button type="button">Меню <span aria-hidden="true">≡</span></button></div>
    </header>
    <div className="hero-stage shell">
      <div className="hero-photo" style={{ backgroundImage: `url('${current.image}')` }} role="img" aria-label={current.text}>
        <div className="hero-copy"><p>{current.eyebrow} · Alean Collection</p><h1>{current.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><div className="hero-note"><p>{current.text}</p></div></div>
        <div className="halo" aria-hidden="true"><span>A</span></div>
      </div>
    </div>
    <div className="hero-facts" aria-label="Alean Collection в цифрах">
      {["23 500+ номеров", "8 городов", "21 отель", "20 лет на рынке"].map((item) => <span key={item}><strong>{item}</strong></span>)}
    </div>
    <form className="booking shell" action="#hotels"><label><span>Куда</span><strong>Все направления</strong></label><label><span>Заезд - выезд</span><strong>Выберите даты</strong></label><label><span>Гости</span><strong>2 взрослых</strong></label><button type="submit">Найти отель <span>↗</span></button></form>
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
      <div className="route-tabs" aria-label="Направления отдыха">
        {slides.map((slide, index) => <button type="button" key={slide.eyebrow} className={index === active ? "active" : ""} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} aria-pressed={index === active}><span className="direction-icon"><DirectionIcon type={slide.eyebrow as "Море" | "Горы" | "Отели"}/></span><strong>{slide.eyebrow}</strong><i>0{index + 1}</i></button>)}
      </div>
    </div>
  </div>;
}
