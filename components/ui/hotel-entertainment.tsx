"use client";

import { useRef, type PointerEvent } from "react";
import { useSeason } from "./hotel-hero";

// Услуги и развлечения — с официального сайта отеля aleanclubsophia.ru
const activities = {
  summer: [
    { title: "Маршруты к природе", text: "Живописные тропы, канатная дорога и сплав на мини-плоту", image: "/sophia-nature-routes.webp" },
    { title: "Академия спорта", text: "Занятия для взрослых и детей: выносливость, техника, личный рекорд", image: "/sophia-sport-academy.webp" },
    { title: "Поездки на перевал Пхия", text: "Групповые выезды только для гостей Alean Club Sophia", image: "/sophia-phiya-pass.jpg" },
    { title: "Индивидуальные экскурсии", text: "Комфортные поездки к значимым местам курорта", image: "/alean-official-brand-mountains.webp" },
    { title: "Анимация", text: "Профессиональная команда работает с 10:00 до 23:00", image: "/sophia-animation.webp" },
    { title: "Спа-комплекс", text: "Хаммам, финская и арома-сауна, спа-программы", image: "/sophia-spa.jpg" },
  ],
  winter: [
    { title: "Горные лыжи и сноуборд", text: "200 метров до канатных дорог курорта Архыз", image: "/alean-official-brand-mountains.webp" },
    { title: "Академия спорта", text: "Занятия для всей семьи в любую погоду", image: "/sophia-sport-academy.webp" },
    { title: "Крытый бассейн", text: "С подогревом — работает круглый год", image: "/sophia-pool.webp" },
    { title: "Спа-комплекс", text: "Хаммам, финская и арома-сауна после склона", image: "/sophia-spa.jpg" },
    { title: "Игровая мансарда", text: "Бильярд, аэрохоккей, кикер и игровые приставки", image: "/alean-04.jpg" },
    { title: "Вечера в лаунж-баре", text: "Напитки и снеки по системе «Всё включено»", image: "/sophia-lounge-bar.webp" },
  ],
};

export function HotelEntertainment() {
  const { season } = useSeason();
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 16 : 340;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !trackRef.current) return;
    dragRef.current = { active: true, startX: event.clientX, scrollLeft: trackRef.current.scrollLeft, moved: false };
    trackRef.current.setPointerCapture(event.pointerId);
    trackRef.current.classList.add("dragging");
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !trackRef.current) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 5) dragRef.current.moved = true;
    trackRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
  };

  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !trackRef.current) return;
    dragRef.current.active = false;
    if (trackRef.current.hasPointerCapture(event.pointerId)) trackRef.current.releasePointerCapture(event.pointerId);
    trackRef.current.classList.remove("dragging");
  };

  return <section className="entertainment" id="entertainment">
    <div className="shell section-head">
      <div><p className="micro">Услуги и развлечения · {season === "summer" ? "лето" : "зима"}</p><h2>Чем заняться<br/>в Архызе</h2></div>
      <div className="outline-arrows dark" aria-label="Пролистать услуги">
        <button type="button" onClick={() => move(-1)} aria-label="Предыдущие услуги">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Следующие услуги">→</button>
      </div>
    </div>
    <div className="activity-gallery shell" ref={trackRef} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
      {activities[season].map((item) => <article key={item.title}>
        <div className="activity-photo" style={{ backgroundImage: `url('${item.image}')` }} />
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </article>)}
    </div>
  </section>;
}
