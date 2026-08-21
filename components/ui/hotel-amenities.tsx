"use client";

import { useState } from "react";

// Состав услуг — с официального сайта отеля aleanclubsophia.ru
const categories = [
  {
    label: "Рестораны и бары",
    items: [
      { title: "Ресторан", text: "Завтраки, обеды и ужины в формате «шведской линии»", image: "/sophia-restaurant.webp" },
      { title: "Снек-бар на шведской линии", text: "Свежесваренный кофе, прохладительные напитки и закуски", image: "/alean-official-moment-restaurant.webp" },
      { title: "Лаунж-бар", text: "Напитки, снеки и печенье по системе «Всё включено»", image: "/alean-official-offer-together.webp" },
    ],
  },
  {
    label: "Для детей",
    items: [
      { title: "Клуб «Вики Чики»", text: "Досуг малышей от 0 до 7 лет с развивающими играми и аниматорами", image: "/sophia-kids.webp" },
      { title: "Анимация", text: "Команда аниматоров работает с 10:00 до 23:00", image: "/alean-vk-squirrels-birthday.jpg" },
      { title: "Детская академия спорта", text: "Занятия, где юные гости ставят свой личный рекорд", image: "/sophia-sport-academy.webp" },
    ],
  },
  {
    label: "Спа-комплекс",
    items: [
      { title: "Банный комплекс", text: "Хаммам, финская и арома-сауна", image: "/alean-official-moment-garden.webp" },
      { title: "Спа-программы", text: "Наборы процедур для расслабления, восстановления и ухода за кожей", image: "/world-mountain.jpg" },
      { title: "Бассейн", text: "Крытый бассейн отеля — работает круглый год", image: "/sophia-pool.webp" },
    ],
  },
  {
    label: "Спорт и досуг",
    items: [
      { title: "Тренажёрный зал и фитнес", text: "Залы с профессиональным оборудованием", image: "/alean-official-offer-pool.webp" },
      { title: "Игровая мансарда", text: "Бильярд, аэрохоккей, кикер и игровые приставки", image: "/alean-04.jpg" },
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

export function HotelAmenities() {
  const [active, setActive] = useState(0);
  return <section className="amenities shell" id="infrastructure">
    <div className="section-head"><div><p className="micro">Инфраструктура и услуги</p><h2>Всё для вашего<br/>отдыха в горах</h2></div></div>
    <div className="filters" aria-label="Категории услуг отеля">{categories.map((category, index) => <button type="button" key={category.label} className={index === active ? "active" : ""} onClick={() => setActive(index)}>{category.label}</button>)}</div>
    <div className="amenity-grid">{categories[active].items.map((item) => <article className="amenity-card reveal" key={item.title}>
      <img src={item.image} alt="" />
      <div><h3>{item.title}</h3><p>{item.text}</p></div>
    </article>)}</div>
  </section>;
}
