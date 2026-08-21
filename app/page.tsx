import { AleanHeroCarousel, AleanRouteCarousel, BrandLocationCards, DevelopmentShowcase } from "../components/ui/alean-hero-carousel";
import { OffersCarousel } from "../components/ui/offers-carousel";
import { LoyaltySection } from "../components/ui/loyalty-section";
import { ScrollToTop } from "../components/ui/scroll-to-top";
import { SiteFooter } from "../components/ui/site-footer";

const hotels = [
  { name: "Alean Family Doville", place: "Анапа · 5*", note: "Ультра все включено", image: "/alean-official-hotel-doville.webp", href: "#booking" },
  { name: "Alean Club Sophia", place: "Архыз · 4*", note: "Все включено в горах", image: "/alean-official-hotel-sophia.webp", href: "/hotels/alean-club-sophia" },
  { name: "Alean Select Pino", place: "Архыз · 4*", note: "Отдых по вашему сценарию", image: "/alean-official-hotel-pino.webp", href: "#booking" },
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
        <BrandLocationCards />
        <article className="brand-card brand-select"><div className="brand-copy"><span>Отели</span><h3>Выбрать<br/>по настроению</h3><p>Сравните отели по бренду, локации, питанию и возможностям для детей.</p><ul><li>21 отель</li><li>8 городов</li></ul></div><a href="#hotels">Подобрать отель <i className="arrow-ne" aria-hidden="true" /></a></article>
      </div>
    </section>

    <section className="catalog shell" id="hotels">
      <div className="section-head"><div><p className="micro">Отели коллекции</p><h2>Место для<br/>вашей поездки</h2></div><button type="button" className="line-link">Выбрать отель <span className="arrow-ne" aria-hidden="true" /></button></div>
      <div className="filters" aria-label="Фильтры отелей"><button className="active">Все</button><button>Море</button><button>Горы</button><button>С детьми</button><button>SPA</button><button>Всё включено</button></div>
      <div className="hotel-grid">{hotels.map((hotel)=><article className="hotel-card" key={hotel.name}><a className="hotel-photo" href={hotel.href} style={{backgroundImage:`url('${hotel.image}')`}} aria-label={`Подробнее: ${hotel.name}`}></a><div><p>{hotel.place}</p><h3>{hotel.name}</h3><span>{hotel.note}</span></div></article>)}</div>
    </section>

    <OffersCarousel />

    <LoyaltySection />

    <section className="moments shell"><div className="section-head"><div><p className="micro">Моменты Alean</p><h2>Истории,<br/>которые остаются</h2></div><p>Отзывы гостей, кадры из поездок и свежие новости коллекции.</p></div><div className="moment-grid"><figure className="moment-a"><img src="/alean-official-offer-dolphins.jpg" alt="Дельфины в море на закате"/><figcaption>Море впечатлений</figcaption></figure><figure className="moment-b"><img src="/alean-official-moment-restaurant.webp" alt="Ресторан отеля Alean"/><figcaption>Вечер в Alean</figcaption></figure><blockquote><div><p>«Впервые за долгое время отдыхали всей семьей и никому не пришлось выбирать между спокойствием…»</p><a className="moments-more" href="#booking">Читать полностью<span className="arrow-ne" aria-hidden="true" /></a></div><cite>Гости Alean Family</cite></blockquote></div></section>

    <section className="events shell" id="events"><div className="section-head"><div><p className="micro">Афиша</p><h2>События<br/>этого сезона</h2></div><a className="line-link" href="#events">Вся афиша <span className="arrow-ne" aria-hidden="true" /></a></div><div className="event-list"><article><span>14.06</span><h3>Открытие летнего сезона</h3><p>Анапа · Alean Family</p><i className="arrow-ne" aria-hidden="true" /></article><article><span>28.06</span><h3>Гастрономические выходные</h3><p>Сочи · Alean Collection</p><i className="arrow-ne" aria-hidden="true" /></article><article><span>12.07</span><h3>Семейный фестиваль</h3><p>Геленджик · Alean Family</p><i className="arrow-ne" aria-hidden="true" /></article></div></section>

    <section className="social-recap shell">
      <div className="social-recap-head"><h3>Как это было</h3><div className="social-links"><a href="https://vk.ru/aleancollection" target="_blank" rel="noreferrer" className="social-icon social-vk" aria-label="Alean Collection во ВКонтакте"><span aria-hidden="true">VK</span></a><a href="#" className="social-icon social-max" aria-label="Alean Collection в MAX"><span aria-hidden="true">MAX</span></a></div></div>
      <div className="social-recap-grid">
        {[
          { type: "image" as const, src: "/alean-vk-content-tips.jpg", title: "Снимаем красивый контент во время отпуска", date: "19 августа", link: "https://vk.ru/wall-220998854_739" },
          { type: "video" as const, src: "/alean-vk-arbuz-fest.mp4", title: "Фестиваль «Арбузный фреш»", date: "17 августа", link: "https://vk.ru/wall-220998854_738" },
          { type: "image" as const, src: "/alean-vk-magazine-cover.jpg", title: "Вам письмо! Новый номер журнала", date: "август 2026", link: "https://vk.ru/aleancollection" },
          { type: "image" as const, src: "/alean-vk-squirrels-birthday.jpg", title: "День рождения белочек Вики и Чики", date: "1 августа", link: "https://vk.ru/aleancollection" },
          { type: "video" as const, src: "/alean-vk-white-party.mp4", title: "Белая вечеринка", date: "28 июля", link: "https://vk.ru/wall-220998854_730" },
          { type: "video" as const, src: "/alean-vk-dolphins.mp4", title: "Дельфины у Alean Family Sputnik", date: "лето 2026", link: "https://vk.ru/aleancollection" },
        ].map((post) => <article key={post.title}>
          {post.type === "video"
            ? <video src={post.src} muted autoPlay loop playsInline aria-label={post.title}/>
            : <img src={post.src} alt={post.title}/>}
          <div className="social-meta">
            <div className="social-meta-row"><span className="social-source-icon" aria-label="ВКонтакте"><span aria-hidden="true">VK</span></span><span className="social-date">{post.date}</span></div>
            <a href={post.link} target="_blank" rel="noreferrer">{post.title}</a>
          </div>
        </article>)}
      </div>
    </section>

    <section className="faq shell"><div><p className="micro">Частые вопросы</p><h2>Перед поездкой</h2><a className="faq-more" href="https://aleancollection.ru/contacts/" target="_blank" rel="noreferrer">Узнать больше <span className="arrow-ne" aria-hidden="true" /></a></div><div className="faq-list"><details open><summary>Что входит в формат «Всё включено»?<span className="faq-toggle" aria-hidden="true" /></summary><p>Набор услуг зависит от бренда и конкретного отеля. На странице выбранного отеля показан полный состав питания, развлечений и инфраструктуры.</p></details><details><summary>Можно ли приехать с питомцем?<span className="faq-toggle" aria-hidden="true" /></summary><p>Условия размещения с животными различаются. Выберите фильтр «С питомцем» в каталоге.</p></details><details><summary>Как работают бонусы программы лояльности?<span className="faq-toggle" aria-hidden="true" /></summary><p>Бонусы начисляются после оплаченного проживания и доступны в личном кабинете.</p></details></div></section>

    <section className="development"><div className="shell development-grid"><div className="development-copy"><p className="micro">Alean Development</p><h2>Создаем новые<br/>места силы</h2><p>Развиваем гостиничные проекты, соединяя сильную локацию, продуманный продукт и опыт управления курортными отелями.</p><a href="#top">О девелопменте <span className="arrow-ne" aria-hidden="true" /></a></div><DevelopmentShowcase /></div></section>

    <section className="contact shell" id="booking"><div><p className="micro">Контакты</p><h2>Путешествие<br/>начинается здесь</h2><a href="tel:88002500030">8 800 250 00 30</a><a href="mailto:booking@aleancollection.ru">booking@aleancollection.ru</a></div><div className="map" aria-label="Карта отелей Alean Collection"><iframe src="https://yandex.ru/map-widget/v1/?ll=39.8%2C44.3&z=6&l=map" title="Карта курортов Alean Collection: Анапа, Геленджик, Сочи, Архыз" loading="lazy" allowFullScreen /></div></section>

    <ScrollToTop />

    <SiteFooter />
  </main>;
}
