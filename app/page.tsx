import { AleanHeroCarousel, AleanRouteCarousel } from "../components/ui/alean-hero-carousel";
import { OffersCarousel } from "../components/ui/offers-carousel";

const hotels = [
  { name: "Alean Family Doville", place: "Анапа · 5*", note: "Ультра все включено", image: "/alean-official-hotel-doville.webp" },
  { name: "Alean Club Sophia", place: "Архыз · 4*", note: "Все включено в горах", image: "/alean-official-hotel-sophia.webp" },
  { name: "Alean Select Pino", place: "Архыз · 4*", note: "Отдых по вашему сценарию", image: "/alean-official-hotel-pino.webp" },
];

export default function Home() {
  return <main>
    <AleanHeroCarousel />

    <section className="signal shell" aria-label="Преимущества Alean Collection">
      <p className="micro">Коллекция решений для отдыха</p><h2>Разные маршруты —<br/>единый уровень заботы</h2>
      <AleanRouteCarousel />
    </section>

    <section className="brands" id="brands">
      <div className="shell section-head"><div><p className="micro">Бренды и направления</p><h2>Найдите свой<br/>формат отдыха</h2></div><p>От семейных курортов на море до камерных отелей в горах. Выберите настроение - мы покажем подходящие места.</p></div>
      <div className="brand-grid shell">
        <article className="brand-card brand-family"><div className="brand-copy"><span>Море</span><h3>Отдых у моря<br/>для всей семьи</h3><p>Анапа, Геленджик и Сочи. Первая береговая линия, детские клубы, SPA и формат «Ультра все включено».</p><ul><li>7 семейных курортов</li><li>Отели 4* и 5*</li></ul></div><a href="#hotels">Смотреть отели <i className="arrow-ne" aria-hidden="true" /></a></article>
        <article className="brand-card brand-club"><div className="brand-copy"><span>Горы</span><h3>Архыз<br/>круглый год</h3><p>Зимой - катание, летом - маршруты, воздух и тишина. Для семейных поездок и отдыха вдвоем.</p><ul><li>Горнолыжный сезон</li><li>SPA и бассейны</li></ul></div><a href="#hotels">Открыть Архыз <i className="arrow-ne" aria-hidden="true" /></a></article>
        <article className="brand-card brand-select"><div className="brand-copy"><span>Отели</span><h3>Выбрать<br/>по настроению</h3><p>Сравните отели по бренду, локации, питанию и возможностям для детей.</p><ul><li>21 отель</li><li>8 городов</li></ul></div><a href="#hotels">Подобрать отель <i className="arrow-ne" aria-hidden="true" /></a></article>
      </div>
    </section>

    <section className="catalog shell" id="hotels">
      <div className="section-head"><div><p className="micro">Отели коллекции</p><h2>Место для<br/>вашей поездки</h2></div><button type="button" className="line-link">Выбрать отель <span className="arrow-ne" aria-hidden="true" /></button></div>
      <div className="filters" aria-label="Фильтры отелей"><button className="active">Все</button><button>Море</button><button>Горы</button><button>С детьми</button><button>SPA</button><button>Всё включено</button></div>
      <div className="hotel-grid">{hotels.map((hotel,index)=><article className="hotel-card" key={hotel.name}><a className="hotel-photo" href="#booking" style={{backgroundImage:`url('${hotel.image}')`}} aria-label={`Подробнее: ${hotel.name}`}><span>0{index+1}</span><i className="arrow-ne" aria-hidden="true" /></a><div><p>{hotel.place}</p><h3>{hotel.name}</h3><span>{hotel.note}</span></div></article>)}</div>
    </section>

    <OffersCarousel />

    <section className="loyalty shell" id="loyalty"><div className="loyalty-visual"><span className="loyalty-orbit"><img src="/alean-mark.svg" alt="Фирменный знак Alean"/></span><p>Alean Club</p></div><div className="loyalty-copy"><p className="micro">Программа лояльности</p><h2>В благодарность<br/>за постоянство</h2><p>Получайте 5% от оплаченной суммы бронирования бонусами и используйте их в следующем путешествии.</p><ul><li>5% бонусами</li><li>Комплимент при заезде</li><li>Особые условия для гостей клуба</li></ul><a className="dark-button" href="#booking">Вступить в клуб <span className="arrow-ne" aria-hidden="true" /></a></div></section>

    <section className="moments shell"><div className="section-head"><div><p className="micro">Моменты Alean</p><h2>Истории,<br/>которые остаются</h2></div><p>Отзывы гостей, кадры из поездок и свежие новости коллекции.</p></div><div className="moment-grid"><figure className="moment-a"><img src="/alean-official-offer-dolphins.jpg" alt="Дельфины в море на закате"/><figcaption>Море впечатлений</figcaption></figure><figure className="moment-b"><img src="/alean-official-moment-restaurant.webp" alt="Ресторан отеля Alean"/><figcaption>Вечер в Alean</figcaption></figure><blockquote><div><p>«Впервые за долгое время отдыхали всей семьей и никому не пришлось выбирать между спокойствием…»</p><a className="moments-more" href="#booking">Читать полностью<span className="arrow-ne" aria-hidden="true" /></a></div><cite>Гости Alean Family</cite></blockquote></div></section>

    <section className="events shell" id="events"><div className="section-head"><div><p className="micro">Афиша</p><h2>События<br/>этого сезона</h2></div><a className="line-link" href="#events">Вся афиша <span className="arrow-ne" aria-hidden="true" /></a></div><div className="event-list"><article><span>14.06</span><h3>Открытие летнего сезона</h3><p>Анапа · Alean Family</p><i className="arrow-ne" aria-hidden="true" /></article><article><span>28.06</span><h3>Гастрономические выходные</h3><p>Сочи · Alean Collection</p><i className="arrow-ne" aria-hidden="true" /></article><article><span>12.07</span><h3>Семейный фестиваль</h3><p>Геленджик · Alean Family</p><i className="arrow-ne" aria-hidden="true" /></article></div></section>

    <section className="faq shell"><div><p className="micro">Частые вопросы</p><h2>Перед поездкой</h2><a className="faq-more" href="https://aleancollection.ru/contacts/" target="_blank" rel="noreferrer">Узнать больше <span className="arrow-ne" aria-hidden="true" /></a></div><div className="faq-list"><details open><summary>Что входит в формат «Всё включено»?<span className="faq-toggle" aria-hidden="true" /></summary><p>Набор услуг зависит от бренда и конкретного отеля. На странице выбранного отеля показан полный состав питания, развлечений и инфраструктуры.</p></details><details><summary>Можно ли приехать с питомцем?<span className="faq-toggle" aria-hidden="true" /></summary><p>Условия размещения с животными различаются. Выберите фильтр «С питомцем» в каталоге.</p></details><details><summary>Как работают бонусы программы лояльности?<span className="faq-toggle" aria-hidden="true" /></summary><p>Бонусы начисляются после оплаченного проживания и доступны в личном кабинете.</p></details></div></section>

    <section className="development"><div className="shell development-grid"><div className="development-copy"><p className="micro">Alean Development</p><h2>Создаем новые<br/>места силы</h2><p>Развиваем гостиничные проекты, соединяя сильную локацию, продуманный продукт и опыт управления курортными отелями.</p><a href="#top">О девелопменте <span className="arrow-ne" aria-hidden="true" /></a></div><div className="development-photo" role="img" aria-label="Проект курортного отеля Alean"/></div></section>

    <section className="contact shell" id="booking"><div><p className="micro">Контакты</p><h2>Путешествие<br/>начинается здесь</h2><a href="tel:88002500030">8 800 250 00 30</a><a href="mailto:booking@aleancollection.ru">booking@aleancollection.ru</a></div><div className="map" aria-label="Карта отелей Alean Collection"><img src="/alean-official-hotels-map.jpg" alt="Карта отелей Alean Collection с официальными отметками объектов"/></div></section>

    <footer><div className="shell footer-top"><div><img src="/alean-logo.svg" alt="Alean Collection"/><p>Курортные отели 4* и 5* в России</p></div><div><p>Отдых</p><a href="#hotels">Отели</a><a href="#brands">Бренды</a><a href="#offers">Акции</a><a href="#loyalty">Лояльность</a></div><div><p>Компания</p><a href="https://aleancollection.ru/purchase/">Тендеры</a><a href="https://aleancollection.ru/sale-of-property/">Реализация имущества</a><a href="https://aleancollection.ru/career/">Карьера</a></div><a className="footer-up" href="#top">↑</a></div><div className="shell footer-bottom"><span>© 2026 Alean Collection</span><span>Концепция для тендерного предложения</span><span>Правовая информация</span></div></footer>
  </main>;
}
