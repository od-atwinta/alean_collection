"use client";

import { useRef, useState, type PointerEvent } from "react";

const offers = [
  {
    label: "До 31 августа",
    title: "Лето в Alean",
    text: "Больше дней для общих воспоминаний",
    image: "/alean-official-offer-pool.webp",
  },
  {
    label: "Для семей",
    title: "Дети до 15 лет отдыхают бесплатно",
    image: "/alean-official-offer-kids.jpg",
  },
  {
    label: "Курортный сезон",
    title: "Время у моря",
    text: "Отдых, к которому хочется возвращаться",
    image: "/alean-official-offer-sea.jpg",
  },
  {
    label: "Семейные каникулы",
    title: "Вместе ярче",
    image: "/alean-official-offer-together.png",
  },
];

export function OffersCarousel() {
  const [start, setStart] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const move = (step: number) => setStart((current) => (current + step + offers.length) % offers.length);
  const orderedOffers = offers.map((_, index) => offers[(start + index) % offers.length]);

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

  return <section className="offers" id="offers">
    <div className="shell section-head light">
      <div><p className="micro">Специальные предложения</p><h2>Поводы остаться<br/>чуть дольше</h2></div>
      <div className="outline-arrows" aria-label="Переключение предложений">
        <button type="button" onClick={() => move(-1)} aria-label="Предыдущие предложения">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Следующие предложения">→</button>
      </div>
    </div>
    <div className="offer-track shell" key={start} aria-live="polite" ref={trackRef} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag} onPointerCancel={stopDrag} onClickCapture={(event) => { if (dragRef.current.moved) { event.preventDefault(); event.stopPropagation(); dragRef.current.moved = false; } }}>
      {orderedOffers.map((offer, index) => <article className={index === 0 ? "offer-large" : "offer-small"} key={offer.title} style={{backgroundImage:`url('${offer.image}')`}}>
        <span>{offer.label}</span><h3>{offer.title}</h3>{offer.text && <p>{offer.text}</p>}<a href="#booking">Подробнее <span className="arrow-ne" aria-hidden="true" /></a>
      </article>)}
    </div>
    <div className="offer-pagination shell" aria-hidden="true"><span>0{start + 1}</span><i/><span>0{offers.length}</span></div>
  </section>;
}
