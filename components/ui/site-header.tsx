"use client";

import { useEffect, useState, type ReactNode } from "react";

// В концепции есть только две страницы отелей - на них навигация и ведёт.
const headerLinks = [
  { label: "Отель в Анапе", href: "/hotels/alean-family-doville" },
  { label: "Отель в Архызе", href: "/hotels/alean-club-sophia" },
];

// Разделы показывают структуру сайта, но переходов в концепции нет - это подписи.
const menuColumns = [
  [
    { label: "Бренды" },
    { label: "Отели" },
    { label: "Девелопмент" },
    { label: "Alean Invest Club" },
    { label: "Конференции и мероприятия" },
    { label: "Сотрудничество" },
  ],
  [
    { label: "Акции" },
    { label: "Программа лояльности" },
    { label: "Alean Magazine" },
    { label: "Новости" },
    { label: "Медиа" },
    { label: "Контакты" },
  ],
];

const hotelGroups = [
  { name: "Alean Family", hotels: [
    { label: "Alean Family Doville", href: "/hotels/alean-family-doville" },
    { label: "Alean Family Riviera", href: null },
    { label: "Alean Family Biarritz", href: null },
    { label: "Alean Family Sputnik", href: null },
    { label: "Alean Family Olivia", href: null },
    { label: "Alean Family Volna", href: null },
    { label: "Alean Family Evian", href: null },
  ]},
  { name: "Alean Extency", hotels: [] },
  { name: "Alean Health", hotels: [{ label: "Alean Health Essentuki", href: null }] },
  { name: "Alean Emerald", hotels: [{ label: "Alean Emerald Mandarin Garden", href: null }] },
  { name: "Alean Club", hotels: [
    { label: "Alean Club Majestic", href: null },
    { label: "Alean Club Sophia", href: "/hotels/alean-club-sophia" },
  ]},
  { name: "Alean Select", hotels: [
    { label: "Alean Select Olginka", href: null },
    { label: "Alean Select Altair", href: null },
    { label: "Alean Select Pino", href: null },
    { label: "Alean Select Arkhyz", href: null },
    { label: "Alean Select Agoy", href: null },
    { label: "Alean Select Montvert", href: null },
    { label: "Alean Select Luchi", href: null },
  ]},
  { name: "Alean Residence", hotels: [{ label: "Alean Residence Montvert", href: null }] },
];

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.5 9.6 8 7.9 9.7c1.3 2.5 3.9 5.1 6.4 6.4l1.7-1.7 4.5 2.4-.5 3c-.2.9-1 1.6-2 1.6C10.1 21.4 2.6 13.9 2.6 6c0-1 .7-1.8 1.6-2l3-.5Z" /></svg>;
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"/><path d="M7 2v4M17 2v4M3 9h18"/></svg>;
}

// На странице отеля логотип ведёт на главную, а кнопка брони — на бронирование этого отеля.
export function SiteHeader({ homeHref = "#top", bookingHref = "#booking-bar", bookingLabel = "Бронирование", title, menuSections }: {
  homeHref?: string;
  bookingHref?: string;
  bookingLabel?: string;
  // Название страницы стоит рядом с логотипом всё время, и над обложкой тоже.
  title?: string;
  // Разделы конкретной страницы: на телефоне это единственный способ до них добраться.
  menuSections?: ReactNode;
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHotelGroup, setActiveHotelGroup] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <>
    <header className={`nav shell${scrolled ? " scrolled" : ""}`}>
      <div className="nav-brand">
        <a className="logo" href={homeHref} aria-label="Alean Collection - на главную"><img src="/alean-logo.svg" alt="Alean Collection" /></a>
        {title ? <span className="nav-page-title">{title}</span> : null}
      </div>
      <nav aria-label="Основная навигация">{headerLinks.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
      <div className="nav-actions"><a className="mobile-phone" href="tel:88002500030" aria-label="Позвонить"><PhoneIcon /></a><a className="nav-phone" href="tel:88002500030">8 800 250 00 30</a><a className="callback-link" href="#contacts">Заказать звонок</a><a className="booking-link" href={bookingHref} aria-label={bookingLabel}><span className="booking-text">{bookingLabel}</span><span className="booking-icon"><CalendarIcon /></span></a><button className="menu-button" type="button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => { if (!menuOpen) setActiveHotelGroup(null); setMenuOpen((value) => !value); }}><span className="menu-label">Меню</span><span className="menu-icon" aria-hidden="true">{menuOpen ? "×" : "≡"}</span></button></div>
    </header>
    <div className={`site-menu${menuOpen ? " open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
      <div className="site-menu-inner shell">
        {menuSections ? <div className="site-menu-page">{menuSections}</div> : null}
        <div className="site-menu-hotels"><p>Alean Collection</p><div className="hotel-explorer"><div className="hotel-groups" role="tablist" aria-label="Группы отелей">{hotelGroups.map((group, index) => <div className={`hotel-group-item${activeHotelGroup === index ? " active" : ""}`} key={group.name}><button type="button" role="tab" aria-selected={activeHotelGroup === index} aria-expanded={activeHotelGroup === index} className={activeHotelGroup === index ? "active" : ""} onClick={() => setActiveHotelGroup(activeHotelGroup === index ? null : index)}><span>{group.name}</span><i aria-hidden="true">›</i></button><div className="mobile-group-hotels" aria-hidden={activeHotelGroup !== index}>{group.hotels.length ? <nav aria-label={`Отели ${group.name}`}>{group.hotels.map((item) => item.href ? <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<span aria-hidden="true">↗</span></a> : <span key={item.label}>{item.label}</span>)}</nav> : <p>Новые отели группы появятся в коллекции позже</p>}</div></div>)}</div><div className="group-hotels" role="tabpanel">{activeHotelGroup === null ? <p className="empty-group">Выберите группу отелей</p> : <><strong>{hotelGroups[activeHotelGroup].name}</strong>{hotelGroups[activeHotelGroup].hotels.length ? <nav aria-label={`Отели ${hotelGroups[activeHotelGroup].name}`}>{hotelGroups[activeHotelGroup].hotels.map((item) => item.href ? <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<span aria-hidden="true">↗</span></a> : <span key={item.label}>{item.label}</span>)}</nav> : <p className="empty-group">Новые отели группы появятся в коллекции позже</p>}</>}</div></div></div>
        <div className="site-menu-main"><p>Разделы</p><div className="site-menu-columns">{menuColumns.map((column, index) => <nav aria-label={`Разделы сайта, столбец ${index + 1}`} key={index}>{column.map((item) => <span key={item.label}>{item.label}</span>)}</nav>)}</div></div>
        <div className="site-menu-contact"><p>Единая служба бронирования</p><a href="tel:88002500030">8 800 250 00 30</a><a href="mailto:booking@aleancollection.ru">booking@aleancollection.ru</a></div>
      </div>
    </div>
  </>;
}
