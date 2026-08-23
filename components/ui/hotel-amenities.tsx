"use client";

import { useState, type ReactNode } from "react";

export type AmenityCategory = { label: string; items: { title: string; text: string; image: string }[] };

// Состав услуг — с официального сайта отеля aleanclubsophia.ru
const categories = [
  {
    label: "Рестораны и бары",
    items: [
      { title: "Ресторан", text: "Завтраки, обеды и ужины в формате «шведской линии»", image: "/sophia-restaurant.webp" },
      { title: "Снек-бар на шведской линии", text: "Свежесваренный кофе, прохладительные напитки и закуски", image: "/alean-official-moment-restaurant.webp" },
      { title: "Лаунж-бар", text: "Напитки, снеки и печенье по системе «Всё включено»", image: "/sophia-lounge-bar.webp" },
    ],
  },
  {
    label: "Для детей",
    items: [
      { title: "Клуб «Вики Чики»", text: "Досуг малышей от 0 до 7 лет с развивающими играми и аниматорами", image: "/sophia-kids.webp" },
      { title: "Анимация", text: "Команда аниматоров работает с 10:00 до 23:00", image: "/sophia-animation.webp" },
      { title: "Детская академия спорта", text: "Занятия, где юные гости ставят свой личный рекорд", image: "/sophia-sport-academy.webp" },
    ],
  },
  {
    label: "Спа-комплекс",
    items: [
      { title: "Банный комплекс", text: "Хаммам, финская и арома-сауна", image: "/sophia-spa.jpg" },
      { title: "Спа-программы", text: "Наборы процедур для расслабления, восстановления и ухода за кожей", image: "/world-mountain.jpg" },
      { title: "Бассейн", text: "Крытый бассейн отеля — работает круглый год", image: "/sophia-pool.webp" },
    ],
  },
  {
    label: "Спорт и досуг",
    items: [
      { title: "Тренажёрный зал и фитнес", text: "Залы с профессиональным оборудованием", image: "/alean-official-offer-pool.webp" },
      { title: "Игровая мансарда", text: "Бильярд, аэрохоккей, кикер и игровые приставки", image: "/sophia-game-loft.webp" },
      { title: "Академия спорта", text: "Занятия для взрослых и детей — от выносливости до техники", image: "/sophia-sport-academy.webp" },
    ],
  },
  {
    label: "Услуги",
    items: [
      { title: "Консьерж-сервис", text: "Круглогодично: поможем с любым запросом по отдыху", image: "/sophia-exterior.jpg" },
      { title: "Индивидуальные экскурсии", text: "Комфортные поездки к значимым местам курорта", image: "/sophia-nature-routes.webp" },
      { title: "Заказ трансфера", text: "Дорога от аэропорта до отеля без пересадок", image: "/alean-official-route-mountains.webp" },
    ],
  },
];

export function HotelAmenities({ categories: groups = categories, eyebrow = "Инфраструктура и услуги", heading = <>Всё для вашего<br/>отдыха в горах</>, sectionId = "infrastructure" }: {
  categories?: AmenityCategory[];
  eyebrow?: string;
  heading?: ReactNode;
  sectionId?: string;
} = {}) {
  const [active, setActive] = useState(0);
  const current = groups[Math.min(active, groups.length - 1)];
  return <section className="amenities shell" id={sectionId}>
    <div className="section-head"><div><p className="micro">{eyebrow}</p><h2>{heading}</h2></div></div>
    <div className="filters" aria-label="Категории услуг отеля">{groups.map((category, index) => <button type="button" key={category.label} className={index === active ? "active" : ""} onClick={() => setActive(index)}>{category.label}</button>)}</div>
    <div className="amenity-grid">{current.items.map((item) => <article className="amenity-card reveal" key={item.title}>
      <img src={item.image} alt="" />
      <div><h3>{item.title}</h3><p>{item.text}</p></div>
    </article>)}</div>
  </section>;
}
