"use client";

import { useEffect, useRef, useState } from "react";
import { BookingCalendar } from "./booking-calendar";

// Общая форма подбора: используется и на главной, и на странице отеля.
// `destinations` = null означает, что направление уже определено (страница конкретного отеля).
export function BookingBar({ destinations, fixedDestination, submitLabel = "Найти отель", action = "#hotels" }: {
  destinations?: string[] | null;
  fixedDestination?: string;
  submitLabel?: string;
  action?: string;
}) {
  const options = destinations ?? ["Все направления", "Анапа", "Геленджик", "Сочи", "Архыз", "Ессентуки"];
  const [bookingOpen, setBookingOpen] = useState<"destination" | "dates" | "guests" | null>(null);
  const [destination, setDestination] = useState(fixedDestination ?? options[0]);
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
  const guestLabel = `${adults} ${adults === 1 ? "взрослый" : "взрослых"}${childrenTotal ? `, ${childrenTotal} ${childrenTotal === 1 ? "ребенок" : childrenTotal < 5 ? "ребенка" : "детей"}` : ""}`;
  const locked = destinations === null;

  return <form className="booking shell" action={action} ref={bookingRef} onSubmit={() => setBookingOpen(null)}>
    <div className={`booking-field${bookingOpen === "destination" ? " active" : ""}${locked ? " locked" : ""}`}>
      {locked
        ? <span className="booking-trigger booking-static"><span>Отель</span><strong>{fixedDestination}</strong></span>
        : <>
            <button type="button" className="booking-trigger" aria-expanded={bookingOpen === "destination"} onClick={() => setBookingOpen(bookingOpen === "destination" ? null : "destination")}><span>Куда</span><strong>{destination}</strong><i aria-hidden="true">⌄</i></button>
            <div className="booking-dropdown destination-dropdown" aria-hidden={bookingOpen !== "destination"}>{options.map((item) => <button type="button" className={destination === item ? "selected" : ""} key={item} onClick={() => { setDestination(item); setBookingOpen(null); }}>{item}<span aria-hidden="true">{destination === item ? "✓" : ""}</span></button>)}</div>
          </>}
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
    <button className="booking-submit" type="submit">{submitLabel} <span className="arrow-ne" aria-hidden="true" /></button>
  </form>;
}
