import { AleanHeroCarousel, AleanRouteCarousel } from "../components/ui/alean-hero-carousel";

const hotels = [
  { name: "Alean Family Doville", place: "Анапа · 5*", note: "Ультра все включено", image: "/alean-01.webp" },
  { name: "Alean Club Sophia", place: "Архыз · 4*", note: "Все включено в горах", image: "/alean-04.jpg" },
  { name: "Alean Select Pino", place: "Архыз · 4*", note: "Отдых по вашему сценарию", image: "/alean-05.webp" },
];

export default function Home() {
  return <main>
    <AleanHeroCarousel />

    <section className="signal shell" aria-label="Преимущества Alean Collection">
      <p className="micro">Коллекция решений для отдыха</p><h2>Разные маршруты.<br/>Единый уровень заботы.</h2>
      <AleanRouteCarousel />
    </section>

    <section className="brands" id="brands">
      <div className="shell section-head"><div><p className="micro">Бренды и направления</p><h2>Найдите свой<br/>формат отдыха</h2></div><p>От семейных курортов на море до камерных отелей в горах. Выберите настроение - мы покажем подходящие места.</p></div>
      <div className="brand-grid shell">
        <article className="brand-card brand-family"><div className="brand-copy"><span>01 / Море</span><h3>Отдых у моря<br/>для всей семьи</h3><p>Анапа, Геленджик и Сочи. Первая береговая линия, детские клубы, SPA и формат «Ультра все включено».</p><ul><li>7 семейных курортов</li><li>Отели 4* и 5*</li></ul></div><a href="#hotels">Смотреть отели <i>↗</i></a></article>
        <article className="brand-card brand-club"><div className="brand-copy"><span>02 / Горы</span><h3>Архыз<br/>круглый год</h3><p>Зимой - катание, летом - маршруты, воздух и тишина. Для семейных поездок и отдыха вдвоем.</p><ul><li>Горнолыжный сезон</li><li>SPA и бассейны</li></ul></div><a href="#hotels">Открыть Архыз <i>↗</i></a></article>
        <article className="brand-card brand-select"><div className="brand-copy"><span>03 / Отели</span><h3>Выбрать<br/>по настроению</h3><p>Сравните отели по бренду, локации, питанию и возможностям для детей.</p><ul><li>21 отель</li><li>8 городов</li></ul></div><a href="#hotels">Подобрать отель <i>↗</i></a></article>
      </div>
    </section>

    <section className="catalog shell" id="hotels">
      <div className="section-head"><div><p className="micro">Отели коллекции</p><h2>Место для<br/>вашей поездки</h2></div><button type="button" className="line-link">Выбрать отель</button></div>
      <div className="filters" aria-label="Фильтры отелей"><button className="active">Все</button><button>Море</button><button>Горы</button><button>С детьми</button><button>SPA</button><button>Всё включено</button></div>
      <div className="hotel-grid">{hotels.map((hotel,index)=><article className="hotel-card" key={hotel.name}><a className="hotel-photo" href="#booking" style={{backgroundImage:`url('${hotel.image}')`}} aria-label={`Подробнее: ${hotel.name}`}><span>0{index+1}</span><i>↗</i></a><div><p>{hotel.place}</p><h3>{hotel.name}</h3><span>{hotel.note}</span></div></article>)}</div>
    </section>

    <section className="offers" id="offers">
      <div className="shell section-head light"><div><p className="micro">Специальные предложения</p><h2>Поводы остаться<br/>чуть дольше</h2></div><div className="outline-arrows"><button aria-label="Назад">←</button><button aria-label="Вперед">→</button></div></div>
      <div className="offer-track shell"><article className="offer-large"><span>До 31 августа</span><h3>Лето в Alean</h3><p>Больше дней для общих воспоминаний</p><a href="#booking">Смотреть условия ↗</a></article><article className="offer-small"><span>Для семей</span><h3>Дети отдыхают бесплатно</h3><a href="#booking">Подробнее ↗</a></article></div>
    </section>

    <section className="loyalty shell" id="loyalty"><div className="loyalty-visual"><span className="loyalty-orbit">A</span><p>Alean Club</p></div><div className="loyalty-copy"><p className="micro">Программа лояльности</p><h2>В благодарность<br/>за постоянство</h2><p>Получайте 5% от оплаченной суммы бронирования бонусами и используйте их в следующем путешествии.</p><ul><li>5% бонусами</li><li>Комплимент при заезде</li><li>Особые условия для гостей клуба</li></ul><a className="dark-button" href="#booking">Вступить в клуб <span>↗</span></a></div></section>

    <section className="moments shell"><div className="section-head"><div><p className="micro">Моменты Alean</p><h2>Истории,<br/>которые остаются</h2></div><p>Отзывы гостей, кадры из поездок и свежие новости коллекции.</p></div><div className="moment-grid"><figure className="moment-a"><img src="/world-mountain.jpg" alt="Бассейн с видом на горы"/><figcaption>Архыз · зима</figcaption></figure><figure className="moment-b"><img src="/hero.jpg" alt="Ресторан отеля Alean"/><figcaption>Вечер в Alean</figcaption></figure><blockquote>«Впервые за долгое время отдыхали всей семьей и никому не пришлось выбирать между спокойствием и развлечениями»<cite>Гости Alean Family</cite></blockquote></div></section>

    <section className="events shell" id="events"><div className="section-head"><div><p className="micro">Афиша</p><h2>События<br/>этого сезона</h2></div><a className="line-link" href="#events">Вся афиша <span>↗</span></a></div><div className="event-list"><article><span>14.06</span><h3>Открытие летнего сезона</h3><p>Анапа · Alean Family</p><i>↗</i></article><article><span>28.06</span><h3>Гастрономические выходные</h3><p>Сочи · Alean Collection</p><i>↗</i></article><article><span>12.07</span><h3>Семейный фестиваль</h3><p>Геленджик · Alean Family</p><i>↗</i></article></div></section>

    <section className="faq shell"><div><p className="micro">Частые вопросы</p><h2>Перед поездкой</h2></div><div className="faq-list"><details open><summary>Что входит в формат «Всё включено»?<span>−</span></summary><p>Набор услуг зависит от бренда и конкретного отеля. На странице выбранного отеля показан полный состав питания, развлечений и инфраструктуры.</p></details><details><summary>Можно ли приехать с питомцем?<span>+</span></summary><p>Условия размещения с животными различаются. Выберите фильтр «С питомцем» в каталоге.</p></details><details><summary>Как работают бонусы программы лояльности?<span>+</span></summary><p>Бонусы начисляются после оплаченного проживания и доступны в личном кабинете.</p></details></div></section>

    <section className="development"><div className="shell development-grid"><div><p className="micro">Alean Development</p><h2>Создаем новые<br/>места силы</h2><a href="#top">О девелопменте ↗</a></div><div className="development-photo" role="img" aria-label="Проект курортного отеля Alean"/><p>Развиваем гостиничные проекты, соединяя сильную локацию, продуманный продукт и опыт управления курортными отелями.</p></div></section>

    <section className="contact shell" id="booking"><div><p className="micro">Контакты</p><h2>Путешествие<br/>начинается здесь</h2><a href="tel:88002500030">8 800 250 00 30</a><a href="mailto:booking@aleancollection.ru">booking@aleancollection.ru</a></div><div className="map" aria-label="Карта курортов Alean Collection"><iframe title="Карта курортов Alean Collection" src="https://www.openstreetmap.org/export/embed.html?bbox=36.8%2C43.2%2C42.0%2C45.4&amp;layer=mapnik" loading="lazy"/><span className="map-point map-anapa"><i/>Анапа</span><span className="map-point map-gelendzhik"><i/>Геленджик</span><span className="map-point map-sochi"><i/>Сочи</span><span className="map-point map-arkhyz"><i/>Архыз</span></div></section>

    <footer><div className="shell footer-top"><div><img src="/alean-logo.svg" alt="Alean Collection"/><p>Курортные отели 4* и 5* в России</p></div><div><p>Отдых</p><a href="#hotels">Отели</a><a href="#brands">Бренды</a><a href="#offers">Акции</a><a href="#loyalty">Лояльность</a></div><div><p>Компания</p><a href="#top">О нас</a><a href="#top">Девелопмент</a><a href="#top">Карьера</a><a href="#top">Партнерам</a></div><a className="footer-up" href="#top">↑</a></div><div className="shell footer-bottom"><span>© 2026 Alean Collection</span><span>Концепция для тендерного предложения</span><span>Правовая информация</span></div></footer>
  </main>;
}
