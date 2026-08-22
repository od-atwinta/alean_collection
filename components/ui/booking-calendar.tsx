"use client";

import { useState } from "react";

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

export function BookingCalendar({ arrival, departure, onChange, onComplete }: { arrival: string; departure: string; onChange: (arrival: string, departure: string) => void; onComplete: () => void }) {
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
