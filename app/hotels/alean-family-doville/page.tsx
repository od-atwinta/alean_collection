import type { Metadata } from "next";
import { DovilleHero, DovilleInPageNav } from "../../../components/ui/doville-hero";
import { HotelAmenities } from "../../../components/ui/hotel-amenities";
import { HotelEntertainment } from "../../../components/ui/hotel-entertainment";
import { LoyaltySection } from "../../../components/ui/loyalty-section";
import { OffersCarousel } from "../../../components/ui/offers-carousel";
import { ScrollReveal } from "../../../components/ui/scroll-reveal";
import { ScrollToTop } from "../../../components/ui/scroll-to-top";
import { SeaParallax } from "../../../components/ui/sea-parallax";
import { SiteFooter } from "../../../components/ui/site-footer";

export const metadata: Metadata = {
  title: "Alean Family Doville — курорт 5* в Анапе | Alean Collection",
  description: "Alean Family Doville 5* — семейный курорт в Анапе по концепции «Ультра всё включено»: собственный пляж, бассейны, детские клубы, академии и центр красоты и здоровья.",
};

// Преимущества концепции — с официального сайта курорта dovilleresort.ru
const pillars = [
  { title: "Ультра всё включено", text: "Первый в России курорт, получивший сертификат соответствия концепции" },
  { title: "Питание весь день", text: "Шведская линия, снек-бары, детское кафе и лёгкий перекус ночью" },
  { title: "Экосистема для детей", text: "Мини-клуб, «ВикиЧики», Тин-клуб 13+ и своя детская шведская линия" },
  { title: "Красота и здоровье", text: "Медицинский центр, спа- и акватермальный комплексы" },
];

// Категории и площади — с официального сайта курорта dovilleresort.ru
const rooms = [
  { name: "Представительские апартаменты", latin: "Apartment executive", area: "110 м²", rooms: "4 комнаты", image: "/doville-room-apart-executive.webp" },
  { name: "Улучшенные апартаменты", latin: "Apartment superior", area: "110 м²", rooms: "4 комнаты", image: "/doville-room-apart-superior.webp" },
  { name: "Апартаменты", latin: "Apartment", area: "78 м²", rooms: "3 комнаты", image: "/doville-room-apart.webp" },
  { name: "Представительский люкс", latin: "Suite executive", area: "44 м²", rooms: "2 комнаты", image: "/doville-room-suite-executive.webp" },
  { name: "Улучшенный люкс", latin: "Suite superior", area: "44 м²", rooms: "2 комнаты", image: "/doville-room-suite-superior.webp" },
  { name: "Семейный улучшенный", latin: "Family superior", area: "44 м²", rooms: "2 комнаты", image: "/doville-room-family-superior.webp" },
  { name: "Люкс", latin: "Suite", area: "35 м²", rooms: "2 комнаты", image: "/doville-room-suite.webp" },
  { name: "Семейный стандарт", latin: "Family standard", area: "28 м²", rooms: "2 комнаты", image: "/doville-room-family-standard.webp" },
  { name: "Улучшенный", latin: "Superior", area: "24 м²", rooms: "1 комната", image: "/doville-room-superior.webp" },
  { name: "Стандарт", latin: "Standard", area: "21 м²", rooms: "1 комната", image: "/doville-room-standard.webp" },
  { name: "Стандарт плюс", latin: "Standard plus", area: "21 м²", rooms: "1 комната", image: "/doville-room-standard-plus.webp" },
  { name: "Стандарт одноместный", latin: "Standard single", area: "14 м²", rooms: "1 комната", image: "/doville-room-single.webp" },
];

// Состав услуг — с официального сайта курорта dovilleresort.ru
const amenities = [
  { label: "Территория и пляж", items: [
    { title: "Территория", text: "Единый архитектурный ансамбль в нормандском стиле", image: "/doville-territory.webp" },
    { title: "Пляж", text: "В 500 метрах от курорта, на огороженной территории", image: "/doville-beach.webp" },
    { title: "Парк и аллеи", text: "Зелёные маршруты для прогулок по всей территории курорта", image: "/doville-g2-787.webp" },
  ]},
  { label: "Бассейны", items: [
    { title: "Открытые бассейны", text: "Взрослые и детские — работают весь сезон", image: "/doville-pools.webp" },
    { title: "Аквагорки", text: "Детский бассейн с горками — под присмотром спасателей", image: "/doville-g-027.webp" },
    { title: "Крытый бассейн", text: "С подогревом — работает круглый год", image: "/doville-g-101.webp" },
    { title: "Бар у бассейна", text: "Освежающие напитки и мороженое рядом с водой", image: "/doville-pool-bar.webp" },
  ]},
  { label: "Рестораны и бары", items: [
    { title: "Ресторан «Нормандия»", text: "Основной ресторан: завтраки, обеды и ужины на шведской линии", image: "/doville-restaurant-normandia.webp" },
    { title: "Лобби бар", text: "В холле «Шале» — неспешная атмосфера курорта", image: "/doville-lobby-bar.webp" },
    { title: "Диско-бар", text: "Музыка и эксклюзивные коктейли до поздней ночи", image: "/doville-disco-bar.webp" },
    { title: "Снек-бар «Аппетит»", text: "Традиционные итальянские блюда", image: "/doville-snack-appetit.webp" },
    { title: "Снек-бар «Морской»", text: "Мясные блюда, овощи гриль и картофель фри", image: "/doville-snack-morskoy.webp" },
    { title: "Снек-бар на пляже «Волна»", text: "Горячие блюда, фрукты и напитки прямо у моря", image: "/doville-beach-snack-volna.webp" },
  ]},
  { label: "Красота и здоровье", items: [
    { title: "Спа-комплекс", text: "Один из крупнейших в регионе, отделка из натуральных материалов", image: "/doville-spa.webp" },
    { title: "Акватермальный комплекс", text: "Дождевой тоннель, купели и каскады — для взрослых и детей", image: "/doville-g-105.webp" },
    { title: "Зоны отдыха спа", text: "Тихие лаунж-зоны между процедурами", image: "/doville-g2-6c5.webp" },
    { title: "Оздоровление", text: "Программы для взрослых и детей, консультации терапевта и педиатра", image: "/doville-health.webp" },
    { title: "Медицинский пост и аптека", text: "Неотложная помощь и аптечный пункт на территории", image: "/doville-medpost.webp" },
  ]},
  { label: "Развлечения и спорт", items: [
    { title: "Спортивные площадки", text: "Волейбол, баскетбол, мини-футбол и теннис, детский игровой комплекс", image: "/doville-wide-1.webp" },
    { title: "Игровая терраса", text: "Бильярд, аэрохоккей и настольный теннис для всей семьи", image: "/doville-game-terrace.webp" },
    { title: "Мастер-классы", text: "Кулинарные и творческие занятия для юных гостей", image: "/doville-g2-963.webp" },
    { title: "Анимация", text: "Команда, которая ведёт день от утренней зарядки до вечернего шоу", image: "/doville-animation.webp" },
  ]},
];

// Инфраструктура для детей — с официального сайта курорта dovilleresort.ru
const kids = [
  { title: "Мини-клуб «ВикиЧики»", text: "Яркое пространство для игры юных гостей от 1 до 3 лет", image: "/doville-mini-club.webp" },
  { title: "Детский клуб «ВикиЧики»", text: "Развитие и развлечения для гостей от 4 до 7 лет", image: "/doville-kids-club.webp" },
  { title: "Тин-клуб 13+", text: "Медиакласс, настольные и подвижные игры, кинопоказы", image: "/doville-teen-club.webp" },
  { title: "Детское питание", text: "Своя детская шведская линия и оборудованные места в ресторане", image: "/doville-kids-food.webp" },
  { title: "Детское кафе «Карамелька»", text: "Десерты и сладкие блюда от кондитеров курорта", image: "/doville-cafe-karamelka.webp" },
  { title: "Размещение в номерах", text: "Дети до 15 лет на дополнительных местах — бесплатно", image: "/doville-kids-rooms.webp" },
];

const activities = [
  { title: "Академия спорта", text: "Самые бодрые занятия курорта: покорить вершину и поставить личный рекорд", image: "/doville-academy-sport.webp" },
  { title: "Академия кино", text: "Фильм на всех этапах — от сценария до монтажа на профессиональном оборудовании", image: "/doville-academy-cinema.webp" },
  { title: "Анимация", text: "Профессиональная команда сопровождает гостей весь день", image: "/doville-animation.webp" },
  { title: "Игровая терраса", text: "Бильярд, аэрохоккей и настольный теннис", image: "/doville-game-terrace.webp" },
  { title: "Индивидуальные экскурсии", text: "Безопасные и комфортные поездки к значимым местам курорта", image: "/doville-excursions.webp" },
  { title: "Спа и акватермальный комплекс", text: "Дождевой тоннель, купели и широкий выбор процедур", image: "/doville-spa.webp" },
  { title: "Вечерние шоу", text: "Концерты и представления собственной анимационной команды", image: "/doville-g2-080.webp" },
];

// Отзывы гостей — с официального сайта курорта dovilleresort.ru
const reviews = [
  { text: "Приехали впервые — вся семья осталась довольна, уезжать не хотелось. Всё продумано до мелочей. Территория большая, можно гулять и гулять.", author: "Ольга, август 2026" },
  { text: "Многократно возвращаясь в ваш отель, каждый визит вызывает восхищение. От медицинских услуг до развлекательных программ — всё выстроено на высшем уровне.", author: "Евгений, семья из Альметьевска" },
  { text: "Отдельно хочу отметить спа и медицинский центр: огромный выбор оздоровительных и расслабляющих услуг, квалифицированные специалисты.", author: "Мария, июль 2026" },
];

export default function AleanFamilyDovillePage() {
  return <div className="doville">
    <main>
      <DovilleHero />
      <DovilleInPageNav />

      <OffersCarousel
        sectionId="offers"
        eyebrow="Акции курорта"
        heading={<>Предложения<br/>Alean Family Doville</>}
        offers={[
          { label: "до 25 августа", title: "Мега выгода до −45%", text: "При проживании от 3 ночей и предоплате 30%", image: "/doville-offer-mega.jpg" },
          { label: "до 29 декабря", title: "Дети до 15 лет — бесплатно", text: "На дополнительных местах", image: "/doville-offer-kids.webp" },
          { label: "до 30 декабря", title: "−20% на спа и медицинские программы", text: "При покупке программ до заезда", image: "/doville-offer-spa.webp" },
          { label: "до 30 декабря", title: "Оптимальный отпуск", text: "Скидка 10% при проживании от 3 ночей", image: "/doville-offer-optimal.jpg" },
          { label: "до 25 августа", title: "Горящие заезды", text: "Выгода −25% при проживании от 2 ночей", image: "/doville-offer-hot.jpg" },
          { label: "до 31 декабря", title: "Сохраним дельфинов вместе", text: "Каждое бронирование — шаг к сохранению черноморских дельфинов", image: "/alean-official-offer-dolphins.jpg" },
        ]}
      />

      <section className="dv-pillars shell" aria-label="Концепция курорта">
        <div className="section-head"><div><p className="micro">Концепция</p><h2>Ультра всё<br/>включено</h2></div>
          <p className="dv-pillars-lead">Самый широкий спектр услуг, включённых в стоимость проживания, — для беззаботного и по-настоящему комфортного отдыха каждого гостя.</p>
        </div>
        <div className="dv-pillar-grid">{pillars.map((pillar, index) => <article className="dv-pillar reveal" key={pillar.title}>
          <span className="dv-pillar-num">0{index + 1}</span>
          <h3>{pillar.title}</h3>
          <p>{pillar.text}</p>
        </article>)}</div>
      </section>

      <SeaParallax
        text={<div className="about-heading">
          <p className="micro">О курорте</p>
          <h2>Море рядом,<br/>забота вокруг</h2>
        </div>}
        stats={<>
          <div className="hotel-advantages">
            <span className="reveal"><strong>5*</strong>Категория курорта</span>
            <span className="reveal"><strong>500 м</strong>До собственного пляжа</span>
            <span className="reveal"><strong>17</strong>Категорий номеров</span>
            <span className="reveal"><strong>Круглый год</strong>Сезон работы</span>
          </div>
          <div className="about-lead reveal">
            <p>Обширная территория объединяет курортную инфраструктуру в единый архитектурный ансамбль в нормандском стиле. Alean Family Doville — первый в России курорт, получивший сертификат соответствия концепции «Ультра всё включено».</p>
          </div>
        </>}
      />

      <section className="active-rest shell reveal" id="beach" aria-label="Пляж">
        <div className="active-rest-visual" style={{ backgroundImage: "url('/doville-beach.webp')" }} />
        <div className="active-rest-copy">
          <p className="micro">Пляж</p>
          <h2>Своё море<br/>в 500 метрах</h2>
          <p>Собственный пляж курорта расположен на огороженной территории и оборудован всем необходимым: шезлонги, зонтики, кабинки для переодевания, душевые. Рядом работает снек-бар «Волна» — горячие блюда, фрукты и напитки прямо у воды.</p>
          <a href="#infrastructure">Смотреть инфраструктуру <span className="arrow-ne" aria-hidden="true" /></a>
        </div>
      </section>

      <section className="catalog shell" id="rooms">
        <div className="section-head"><div><p className="micro">Номера</p><h2>17 категорий —<br/>от стандарта до апартаментов</h2></div><a className="line-link" href="https://dovilleresort.ru/nomera/" target="_blank" rel="noreferrer">Все номера <span className="arrow-ne" aria-hidden="true" /></a></div>
        <div className="hotel-grid">{rooms.map((room) => <article className="hotel-card room-card reveal" key={room.name}>
          <a className="hotel-photo" href="https://dovilleresort.ru/nomera/" target="_blank" rel="noreferrer" style={{ backgroundImage: `url('${room.image}')` }} aria-label={`Подробнее: ${room.name}`}></a>
          <div>
            <p>{room.latin}</p>
            <h3>{room.name}</h3>
            <ul className="room-facts"><li>{room.area}</li><li>{room.rooms}</li></ul>
            <a className="room-book" href="https://booking.aleancollection.ru/" target="_blank" rel="noreferrer">Забронировать <span className="arrow-ne" aria-hidden="true" /></a>
          </div>
        </article>)}</div>
      </section>

      <HotelAmenities
        categories={amenities}
        eyebrow="Инфраструктура и услуги"
        heading={<>Курорт, который<br/>не хочется покидать</>}
      />

      <section className="amenities shell" id="kids">
        <div className="section-head"><div><p className="micro">Для детей</p><h2>Экосистема<br/>для юных гостей</h2></div>
          <p className="dv-pillars-lead">Дети — самые ценные гости курорта. Для них создана среда для беззаботного, насыщенного и развивающего отдыха.</p>
        </div>
        <div className="amenity-grid">{kids.map((item) => <article className="amenity-card reveal" key={item.title}>
          <img src={item.image} alt="" />
          <div><h3>{item.title}</h3><p>{item.text}</p></div>
        </article>)}</div>
      </section>

      <HotelEntertainment
        items={activities}
        eyebrow="Развлечения и академии"
        heading={<>Чем заняться<br/>в Doville</>}
      />

      <LoyaltySection />

      <section className="hotel-reviews shell">
        <div className="section-head"><div><p className="micro">Отзывы</p><h2>Что говорят<br/>гости курорта</h2></div><a className="line-link" href="https://dovilleresort.ru/otzyvy/" target="_blank" rel="noreferrer">Все отзывы <span className="arrow-ne" aria-hidden="true" /></a></div>
        <div className="hotel-reviews-grid">{reviews.map((review) => <blockquote className="reveal" key={review.author}><p>«{review.text}»</p><cite>{review.author}</cite></blockquote>)}</div>
      </section>

      <section className="dv-location shell reveal" aria-label="О локации">
        <div className="dv-location-visual" style={{ backgroundImage: "url('/doville-wide-1.webp')" }} />
        <div className="dv-location-copy">
          <p className="micro">Локация</p>
          <h2>Анапа,<br/>Пионерский проспект</h2>
          <p>Курорт стоит на Пионерском проспекте — курортной полосе Анапы вдоль песчаных пляжей. До собственного пляжа 500 метров, до центра города — около 10 минут на машине.</p>
          <ul className="dv-location-facts">
            <li><strong>Аэропорт Витязево</strong><span>~20 минут на машине</span></li>
            <li><strong>Ж/д вокзал Анапа</strong><span>~25 минут на машине</span></li>
            <li><strong>Автовокзал</strong><span>Маршрутка №100 или 114 до указателя курорта</span></li>
          </ul>
          <a className="dark-button" href="https://dovilleresort.ru/transfer/" target="_blank" rel="noreferrer">Заказать трансфер <span className="arrow-ne" aria-hidden="true" /></a>
        </div>
      </section>

      <section className="faq shell">
        <div><p className="micro">Частые вопросы</p><h2>Перед поездкой<br/>в Анапу</h2></div>
        <div className="faq-list">
          <details open><summary>Что входит в «Ультра всё включено»?<span className="faq-toggle" aria-hidden="true" /></summary><p>Питание в течение всего дня — шведская линия, снек-бары, детское кафе и ночной перекус, — напитки, анимация, детские клубы, бассейны, пляж и большая часть спортивной инфраструктуры.</p></details>
          <details><summary>Далеко ли до пляжа?<span className="faq-toggle" aria-hidden="true" /></summary><p>500 метров. Пляж собственный, на огороженной территории: шезлонги, зонтики, кабинки для переодевания, душевые и снек-бар.</p></details>
          <details><summary>С какого возраста работают детские клубы?<span className="faq-toggle" aria-hidden="true" /></summary><p>Мини-клуб «ВикиЧики» — с 1 до 3 лет, детский клуб «ВикиЧики» — с 4 до 7 лет, Тин-клуб — для подростков от 13 лет.</p></details>
          <details><summary>Дети размещаются бесплатно?<span className="faq-toggle" aria-hidden="true" /></summary><p>Да, дети до 15 лет на дополнительных местах размещаются бесплатно.</p></details>
        </div>
      </section>

      <section className="contact shell">
        <div>
          <p className="micro">Контакты курорта</p>
          <h2>Alean Family Doville,<br/>Анапа</h2>
          <a href="tel:88002500030">8 800 250 00 30</a>
          <a href="mailto:spir_doville@aleancollection.ru">spir_doville@aleancollection.ru</a>
          <a href="https://yandex.ru/maps/?text=Анапа, Пионерский проспект, 14" target="_blank" rel="noreferrer">г. Анапа, Пионерский проспект, д. 14</a>
        </div>
        <div className="map" aria-label="Карта: Анапа, Alean Family Doville">
          <iframe src="https://yandex.ru/map-widget/v1/?ll=37.3080%2C44.9060&z=15&l=map" title="Карта: Alean Family Doville, Анапа" loading="lazy" allowFullScreen />
        </div>
      </section>

      <ScrollToTop />
      <ScrollReveal />
      <SiteFooter />
    </main>
  </div>;
}
