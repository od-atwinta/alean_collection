import type { Metadata } from "next";
import { HotelHero, HotelInPageNav, SeasonProvider } from "../../../components/ui/hotel-hero";
import { HotelEntertainment } from "../../../components/ui/hotel-entertainment";
import { HotelAmenities } from "../../../components/ui/hotel-amenities";
import { LoyaltySection } from "../../../components/ui/loyalty-section";
import { MountainParallax } from "../../../components/ui/mountain-parallax";
import { OffersCarousel } from "../../../components/ui/offers-carousel";
import { ScrollReveal } from "../../../components/ui/scroll-reveal";
import { ScrollToTop } from "../../../components/ui/scroll-to-top";
import { SiteFooter } from "../../../components/ui/site-footer";

export const metadata: Metadata = {
  title: "Alean Club Sophia — отель в горах Архыза | Alean Collection",
  description: "Alean Club Sophia — горный отель 4* у подножия Архыза: номера, спа, детский клуб, программа лояльности и круглогодичный отдых.",
};

// Категории и площади — с официального сайта отеля aleanclubsophia.ru
const rooms = [
  { name: "Семейный люкс", latin: "Family suite", area: "73 м²", rooms: "3 комнаты", image: "/sophia-room-family.webp" },
  { name: "Люкс", latin: "Suite", area: "40 м²", rooms: "2 комнаты", image: "/sophia-room-suite.webp" },
  { name: "Полулюкс", latin: "Junior suite", area: "39 м²", rooms: "1 комната", image: "/sophia-room-junior.webp" },
  { name: "Стандарт плюс", latin: "Standard plus", area: "24 м²", rooms: "1 комната", image: "/sophia-room-standard-plus.webp" },
  { name: "Стандарт", latin: "Standard", area: "22 м²", rooms: "1 комната", image: "/sophia-room-standard.webp" },
  { name: "Стандарт компакт", latin: "Standard", area: "20 м²", rooms: "1 комната", image: "/sophia-room-compact.webp" },
];

const hotelEvents = [
  { date: "12.12", title: "Открытие горнолыжного сезона", place: "Архыз · Alean Club Sophia" },
  { date: "31.12", title: "Новогодний вечер в отеле", place: "Архыз · Alean Club Sophia" },
  { date: "18.01", title: "Семейный день на склоне", place: "Архыз · Alean Club Sophia" },
];

const reviews = [
  { text: "Приехали кататься на неделю — отель прямо у подъёмника, дети были в восторге от детского клуба.", author: "Семья с детьми, Москва" },
  { text: "Летом в горах совсем другой отдых: тишина, воздух, треккинг к озеру. Обязательно вернёмся.", author: "Гости Alean Club, лето 2026" },
  { text: "SPA после катания — то, что нужно. Персонал внимательный, кормят вкусно.", author: "Гости Alean Club, зима 2026" },
];

export default function AleanClubSophiaPage() {
  return <SeasonProvider>
    <main>
      <HotelHero />
      <HotelInPageNav />

      <OffersCarousel
        sectionId="hotel-offers"
        eyebrow="Акции отеля"
        heading={<>Предложения<br/>Alean Club Sophia</>}
        offers={[
          { label: "до 30 декабря", title: "−20% на спа-программы", text: "Скидка на коллекцию массажей и выбор времени посещения", image: "/alean-official-moment-garden.webp" },
          { label: "до 27 декабря", title: "Дети до 15 лет — бесплатно", text: "На дополнительных местах", image: "/alean-official-offer-kids.jpg" },
          { label: "до 27 декабря", title: "В горах как дома", text: "Выгода до 20% при проживании от 3 ночей", image: "/alean-official-brand-mountains.webp" },
          { label: "до 31 декабря", title: "Сохраним дельфинов вместе", text: "Каждое бронирование — шаг к сохранению черноморских дельфинов", image: "/alean-official-offer-dolphins.jpg" },
        ]}
      />

      <MountainParallax
        text={<div className="about-heading">
          <p className="micro">Об отеле</p>
          <h2>Тишина гор,<br/>забота Alean</h2>
        </div>}
        stats={<>
          <div className="hotel-advantages">
            <span className="reveal"><strong>4*</strong>Категория отеля</span>
            <span className="reveal"><strong>200 м</strong>До канатных дорог</span>
            <span className="reveal"><strong>Всё включено</strong>Формат питания</span>
            <span className="reveal"><strong>Круглый год</strong>Сезон работы</span>
          </div>
          <div className="about-lead reveal">
            <p>Отель «Всё включено» в горах — всего в 200 метрах от канатных дорог горнолыжного курорта Архыз. Семейный курортный отель с оптимальным перечнем услуг для комфортного отдыха с детьми без переплаты за дополнительные сервисы.</p>
          </div>
        </>}
      />

      <section className="active-rest shell reveal" aria-label="Активный отдых">
        <div className="active-rest-visual" style={{ backgroundImage: "url('/alean-official-route-mountains.webp')" }} />
        <div className="active-rest-copy">
          <p className="micro">Активный отдых</p>
          <h2>Горы Архыза —<br/>для любого сезона</h2>
          <p>Зимой — трассы для новичков и опытных райдеров в пяти минутах от отеля. Летом — маршруты к озёрам, конные прогулки и йога на террасе с видом на хребет.</p>
          <a href="#entertainment">Смотреть программу активностей <span className="arrow-ne" aria-hidden="true" /></a>
        </div>
      </section>

      <section className="catalog shell" id="rooms">
        <div className="section-head"><div><p className="micro">Номера</p><h2>Выберите свой<br/>вид на горы</h2></div><a className="line-link" href="https://aleanclubsophia.ru/nomera-price/" target="_blank" rel="noreferrer">Все номера <span className="arrow-ne" aria-hidden="true" /></a></div>
        <div className="hotel-grid">{rooms.map((room) => <article className="hotel-card room-card reveal" key={room.name}>
          <a className="hotel-photo" href="https://aleanclubsophia.ru/nomera-price/" target="_blank" rel="noreferrer" style={{ backgroundImage: `url('${room.image}')` }} aria-label={`Подробнее: ${room.name}`}></a>
          <div>
            <p>{room.latin}</p>
            <h3>{room.name}</h3>
            <ul className="room-facts"><li>{room.area}</li><li>{room.rooms}</li></ul>
            <a className="room-book" href="https://booking.aleancollection.ru/" target="_blank" rel="noreferrer">Забронировать <span className="arrow-ne" aria-hidden="true" /></a>
          </div>
        </article>)}</div>
      </section>

      <HotelAmenities />
      <HotelEntertainment />

      <section className="events shell" id="events">
        <div className="section-head"><div><p className="micro">Афиша отеля</p><h2>События<br/>в Alean Club Sophia</h2></div><a className="line-link" href="#events">Вся афиша <span className="arrow-ne" aria-hidden="true" /></a></div>
        <div className="event-list">{hotelEvents.map((event) => <article className="reveal" key={event.title}><span>{event.date}</span><h3>{event.title}</h3><p>{event.place}</p><i className="arrow-ne" aria-hidden="true" /></article>)}</div>
      </section>

      <LoyaltySection />

      <section className="hotel-reviews shell">
        <div className="section-head"><div><p className="micro">Отзывы</p><h2>Что говорят<br/>гости отеля</h2></div></div>
        <div className="hotel-reviews-grid">{reviews.map((review) => <blockquote className="reveal" key={review.author}><p>«{review.text}»</p><cite>{review.author}</cite></blockquote>)}</div>
      </section>

      <section className="faq shell">
        <div><p className="micro">Частые вопросы</p><h2>Перед поездкой<br/>в Архыз</h2></div>
        <div className="faq-list">
          <details open><summary>Как добраться до отеля?<span className="faq-toggle" aria-hidden="true" /></summary><p>Ближайший аэропорт — Минеральные Воды, далее трансфер по договорённости с отелем (~3 часа).</p></details>
          <details><summary>Работает ли отель летом?<span className="faq-toggle" aria-hidden="true" /></summary><p>Да, круглый год: зимой — горнолыжный сезон, летом — треккинг, конные прогулки и SPA.</p></details>
          <details><summary>Есть ли прокат горнолыжного снаряжения?<span className="faq-toggle" aria-hidden="true" /></summary><p>Да, прокат работает прямо на ресепшене отеля.</p></details>
        </div>
      </section>

      <section className="contact shell">
        <div>
          <p className="micro">Контакты отеля</p>
          <h2>Alean Club Sophia,<br/>Архыз</h2>
          <a href="tel:88002500030">8 800 250 00 30</a>
          <a href="mailto:booking@aleancollection.ru">booking@aleancollection.ru</a>
        </div>
        <div className="map" aria-label="Карта: Архыз, Alean Club Sophia">
          <iframe src="https://yandex.ru/map-widget/v1/?ll=41.336%2C43.523&z=13&l=map" title="Карта: Alean Club Sophia, Архыз" loading="lazy" allowFullScreen />
        </div>
      </section>

      <ScrollToTop />
      <ScrollReveal />
      <SiteFooter />
    </main>
  </SeasonProvider>;
}
