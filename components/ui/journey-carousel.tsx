"use client";

import { useState } from "react";

const journeys = [
  { label: "Море", title: "Отдых у моря\nдля всей семьи", text: "Анапа, Геленджик и Сочи. Первая береговая линия, детские клубы, SPA и формат «Ультра все включено».", facts: ["7 семейных курортов", "Отели 4* и 5*"], image: "/alean-01.webp" },
  { label: "Горы", title: "Архыз\nкруглый год", text: "Зимой - катание, летом - маршруты, воздух и тишина. Для семейных поездок, активного отдыха и путешествий вдвоем.", facts: ["Горнолыжный сезон", "SPA и бассейны"], image: "/alean-04.jpg" },
  { label: "Отели", title: "Выбрать\nпо настроению", text: "Сравните курорты по бренду, локации, питанию и возможностям для детей. Вся коллекция доступна в одном каталоге.", facts: ["21 отель", "8 городов"], image: "/alean-05.webp" },
];

export function JourneyCarousel() {
  const [active, setActive] = useState(0);
  const current = journeys[active];
  const move = (step: number) => setActive((active + step + journeys.length) % journeys.length);

  return <div className="journey-carousel shell">
    <article className="journey-slide" style={{ backgroundImage: `url('${current.image}')` }}>
      <div className="journey-content">
        <span className="journey-number">0{active + 1} / 0{journeys.length}</span>
        <h3>{current.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
        <p>{current.text}</p>
        <ul>{current.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      </div>
      <div className="journey-arrows"><button onClick={() => move(-1)} aria-label="Предыдущий кадр">←</button><button onClick={() => move(1)} aria-label="Следующий кадр">→</button></div>
    </article>
    <div className="journey-tabs" aria-label="Сценарии отдыха">{journeys.map((journey, index) => <button key={journey.label} className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-current={index === active}><span>0{index + 1}</span><strong>{journey.label}</strong><i /></button>)}</div>
  </div>;
}
