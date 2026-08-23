"use client";

import { useState } from "react";

// Ссылка есть только у тех отелей, чьи страницы собраны в концепции.
const hotels = [
  { name: "Alean Family Doville", place: "Анапа · 5*", note: "Ультра все включено", image: "/alean-official-hotel-doville.webp", href: "/hotels/alean-family-doville", tags: ["Море", "С детьми", "SPA", "Всё включено"] },
  { name: "Alean Club Sophia", place: "Архыз · 4*", note: "Все включено в горах", image: "/alean-official-hotel-sophia.webp", href: "/hotels/alean-club-sophia", tags: ["Горы", "С детьми", "SPA", "Всё включено"] },
  { name: "Alean Select Pino", place: "Архыз · 4*", note: "Отдых по вашему сценарию", image: "/alean-official-hotel-pino.webp", href: null, tags: ["Горы", "SPA"] },
];

const filters = ["Все", "Море", "Горы", "С детьми", "SPA", "Всё включено"];

export function HotelCatalog() {
  const [active, setActive] = useState("Все");
  const visible = active === "Все" ? hotels : hotels.filter((hotel) => hotel.tags.includes(active));

  return <section className="catalog shell" id="hotels">
    <div className="section-head">
      <div><p className="micro">Отели коллекции</p><h2>Место для<br/>вашей поездки</h2></div>
      <a className="line-link" href="#booking-bar">Выбрать отель <span className="arrow-ne" aria-hidden="true" /></a>
    </div>
    <div className="filters" aria-label="Фильтры отелей">
      {filters.map((filter) => <button
        type="button"
        key={filter}
        className={active === filter ? "active" : ""}
        aria-pressed={active === filter}
        onClick={() => setActive(filter)}
      >{filter}</button>)}
    </div>
    <div className="hotel-grid">
      {visible.map((hotel) => <article className="hotel-card reveal revealed" key={hotel.name}>
        {hotel.href
          ? <a className="hotel-photo" href={hotel.href} style={{ backgroundImage: `url('${hotel.image}')` }} aria-label={`Подробнее: ${hotel.name}`} />
          : <span className="hotel-photo" style={{ backgroundImage: `url('${hotel.image}')` }} aria-hidden="true" />}
        <div><p>{hotel.place}</p><h3>{hotel.name}</h3><span>{hotel.note}</span></div>
      </article>)}
    </div>
    <p className="catalog-count" aria-live="polite">{visible.length === hotels.length ? `${hotels.length} отеля коллекции` : `Подходит отелей: ${visible.length}`}</p>
  </section>;
}
