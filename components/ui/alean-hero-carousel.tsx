"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "./site-header";

const hero = { eyebrow: "Море", title: "К морю\nза общими\nвпечатлениями", text: "Семейные курорты в Анапе, Геленджике и Сочи", image: "/alean-official-hero-beach.webp" };

const slides = [
  { eyebrow: "Море", title: "К морю\nза общими\nвпечатлениями", text: "Семейные курорты в Анапе, Геленджике и Сочи", image: "/alean-official-route-sea.webp" },
  { eyebrow: "Горы", title: "Выше\nповседневных\nмаршрутов", text: "Отели у склонов Архыза для отдыха круглый год", image: "/alean-official-route-mountains.webp" },
  { eyebrow: "Отели", title: "Место,\nкуда хочется\nвернуться", text: "Курортные отели 4* и 5* с единым стандартом заботы", image: "/alean-official-route-hotels.webp" },
];

export function BrandLocationCards() {
  return <>
    <article className="brand-card brand-family"><div className="brand-copy"><h3>Отдых у моря<br/>для всей семьи</h3><p>Анапа, Геленджик и Сочи. Первая береговая линия, детские клубы, SPA и формат «Ультра все включено».</p><ul><li>7 семейных курортов</li><li>Отели 4* и 5*</li></ul></div><a href="https://aleancollection.ru/brands/">Все бренды <i className="arrow-ne" aria-hidden="true" /></a></article>
    <article className="brand-card brand-club"><div className="brand-copy"><h3>Архыз<br/>круглый год</h3><p>Зимой - катание, летом - маршруты, воздух и тишина. Для семейных поездок и отдыха вдвоем.</p><ul><li>Горнолыжный сезон</li><li>SPA и бассейны</li></ul></div><a href="https://aleancollection.ru/hotels/">Все локации <i className="arrow-ne" aria-hidden="true" /></a></article>
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

const calendarWeekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateKey(value: string) {
  return value ? new Date(`${value}T00:00:00`) : null;
}

function BookingCalendar({ arrival, departure, onChange, onComplete }: { arrival: string; departure: string; onChange: (arrival: string, departure: string) => void; onComplete: () => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const initialDate = fromDateKey(arrival) || today;
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const firstGridDate = new Date(visibleMonth);
  firstGridDate.setDate(1 - ((visibleMonth.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstGridDate);
    date.setDate(firstGridDate.getDate() + index);
    return date;
  });
  const arrivalDate = fromDateKey(arrival);
  const departureDate = fromDateKey(departure);
  const monthLabel = visibleMonth.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });

  const selectDate = (date: Date) => {
    const key = toDateKey(date);
    if (!arrival || departure || (arrivalDate && date <= arrivalDate)) onChange(key, "");
    else {
      onChange(arrival, key);
      onComplete();
    }
  };

  return <div className="calendar-panel" aria-label="Выбор дат поездки">
    <div className="calendar-heading">
      <div><span>Даты поездки</span><strong>{monthLabel}</strong></div>
      <div className="calendar-nav">
        <button type="button" aria-label="Предыдущий месяц" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}>←</button>
        <button type="button" aria-label="Следующий месяц" onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}>→</button>
      </div>
    </div>
    <div className="calendar-weekdays">{calendarWeekdays.map((day) => <span key={day}>{day}</span>)}</div>
    <div className="calendar-grid">{days.map((date) => {
      const key = toDateKey(date);
      const outside = date.getMonth() !== visibleMonth.getMonth();
      const disabled = date < today;
      const isStart = key === arrival;
      const isEnd = key === departure;
      const inRange = Boolean(arrivalDate && departureDate && date > arrivalDate && date < departureDate);
      return <button type="button" key={key} disabled={disabled} className={`${outside ? "outside " : ""}${inRange ? "in-range " : ""}${isStart ? "range-start " : ""}${isEnd ? "range-end" : ""}`.trim()} aria-pressed={isStart || isEnd} onClick={() => selectDate(date)}><span>{date.getDate()}</span></button>;
    })}</div>
    <p className="calendar-hint">{!arrival ? "Выберите дату заезда" : !departure ? "Теперь выберите дату выезда" : "Даты выбраны"}</p>
  </div>;
}

export function AleanHeroCarousel() {
  const current = hero;
  const [bookingOpen, setBookingOpen] = useState<"destination" | "dates" | "guests" | null>(null);
  const [destination, setDestination] = useState("Все направления");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [adults, setAdults] = useState(2);
  const [childrenUnder15, setChildrenUnder15] = useState(0);
  const [children16to18, setChildren16to18] = useState(0);
  const bookingRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const closeDropdowns = (event: PointerEvent) => {
      if (bookingRef.current && !bookingRef.current.contains(event.target as Node)) setBookingOpen(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setBookingOpen(null);
    document.addEventListener("pointerdown", closeDropdowns);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeDropdowns);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const dateLabel = arrival && departure
    ? `${new Date(`${arrival}T00:00:00`).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" })} - ${new Date(`${departure}T00:00:00`).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" })}`
    : "Выберите даты";
  const childrenTotal = childrenUnder15 + children16to18;
  const guestLabel = `${adults} ${adults === 1 ? "взрослый" : adults < 5 ? "взрослых" : "взрослых"}${childrenTotal ? `, ${childrenTotal} ${childrenTotal === 1 ? "ребенок" : childrenTotal < 5 ? "ребенка" : "детей"}` : ""}`;

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
    <form className="booking shell" action="#hotels" ref={bookingRef} onSubmit={() => setBookingOpen(null)}>
      <div className={`booking-field${bookingOpen === "destination" ? " active" : ""}`}>
        <button type="button" className="booking-trigger" aria-expanded={bookingOpen === "destination"} onClick={() => setBookingOpen(bookingOpen === "destination" ? null : "destination")}><span>Куда</span><strong>{destination}</strong><i aria-hidden="true">⌄</i></button>
        <div className="booking-dropdown destination-dropdown" aria-hidden={bookingOpen !== "destination"}>{["Все направления", "Анапа", "Геленджик", "Сочи", "Архыз", "Ессентуки"].map((item) => <button type="button" className={destination === item ? "selected" : ""} key={item} onClick={() => { setDestination(item); setBookingOpen(null); }}>{item}<span aria-hidden="true">{destination === item ? "✓" : ""}</span></button>)}</div>
      </div>
      <div className={`booking-field${bookingOpen === "dates" ? " active" : ""}`}>
        <button type="button" className="booking-trigger" aria-expanded={bookingOpen === "dates"} onClick={() => setBookingOpen(bookingOpen === "dates" ? null : "dates")}><span>Заезд - выезд</span><strong>{dateLabel}</strong><i aria-hidden="true">⌄</i></button>
        <div className="booking-dropdown dates-dropdown" aria-hidden={bookingOpen !== "dates"} onPointerDown={(event) => event.stopPropagation()}><BookingCalendar arrival={arrival} departure={departure} onChange={(nextArrival, nextDeparture) => { setArrival(nextArrival); setDeparture(nextDeparture); }} onComplete={() => setBookingOpen(null)} /></div>
      </div>
      <div className={`booking-field${bookingOpen === "guests" ? " active" : ""}`}>
        <button type="button" className="booking-trigger" aria-expanded={bookingOpen === "guests"} onClick={() => setBookingOpen(bookingOpen === "guests" ? null : "guests")}><span>Гости</span><strong>{guestLabel}</strong><i aria-hidden="true">⌄</i></button>
        <div className="booking-dropdown guests-dropdown" aria-hidden={bookingOpen !== "guests"}>
          <label><span>Взрослых</span><input type="number" inputMode="numeric" min="1" max="10" value={adults} onFocus={(event) => event.currentTarget.select()} onChange={(event) => setAdults(Math.max(1, Math.min(10, Number(event.target.value) || 1)))} /></label>
          <label><span>Дети до 15 лет</span><input type="number" inputMode="numeric" min="0" max="10" value={childrenUnder15} onFocus={(event) => event.currentTarget.select()} onChange={(event) => setChildrenUnder15(Math.max(0, Math.min(10, Number(event.target.value) || 0)))} /></label>
          <label><span>Дети 16-18 лет</span><input type="number" inputMode="numeric" min="0" max="10" value={children16to18} onFocus={(event) => event.currentTarget.select()} onChange={(event) => setChildren16to18(Math.max(0, Math.min(10, Number(event.target.value) || 0)))} /></label>
          <button type="button" className="dropdown-done" onClick={() => setBookingOpen(null)}>Готово</button>
        </div>
      </div>
      <button className="booking-submit" type="submit">Найти отель <span>↗</span></button>
    </form>
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
