import { AleanHeroCarousel, AleanRouteCarousel, BrandLocationCards, DevelopmentShowcase } from "../components/ui/alean-hero-carousel";
import { HotelCatalog } from "../components/ui/hotel-catalog";
import { OffersCarousel } from "../components/ui/offers-carousel";
import { LoyaltySection } from "../components/ui/loyalty-section";
import { ScrollReveal } from "../components/ui/scroll-reveal";
import { ScrollToTop } from "../components/ui/scroll-to-top";
import { SiteFooter } from "../components/ui/site-footer";


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
        <article className="brand-card brand-select reveal"><div className="brand-copy"><span>Отели</span><h3>Выбрать<br/>по настроению</h3><p>Сравните отели по бренду, локации, питанию и возможностям для детей.</p><ul><li>21 отель</li><li>8 городов</li></ul></div><a href="#hotels">Подобрать отель <i className="arrow-ne" aria-hidden="true" /></a></article>
      </div>
    </section>

    <HotelCatalog />

    <OffersCarousel />

    <LoyaltySection />

    <section className="moments shell"><div className="section-head"><div><p className="micro">Моменты Alean</p><h2>Истории,<br/>которые остаются</h2></div><p>Отзывы гостей, кадры из поездок и свежие новости коллекции.</p></div><div className="moment-grid"><figure className="moment-a reveal"><img src="/alean-official-offer-dolphins.jpg" alt="Дельфины в море на закате"/><figcaption>Море впечатлений</figcaption></figure><figure className="moment-b reveal"><img src="/alean-official-moment-restaurant.webp" alt="Ресторан отеля Alean"/><figcaption>Вечер в Alean</figcaption></figure><blockquote className="reveal"><div><p>«Впервые за долгое время отдыхали всей семьей и никому не пришлось выбирать между спокойствием…»</p><span className="moments-more">Читать полностью<span className="arrow-ne" aria-hidden="true" /></span></div><cite>Гости Alean Family</cite></blockquote></div></section>

    <section className="events shell" id="events"><div className="section-head"><div><p className="micro">Афиша</p><h2>События<br/>этого сезона</h2></div><a className="line-link" href="#events">Вся афиша <span className="arrow-ne" aria-hidden="true" /></a></div><div className="event-list"><article className="reveal"><span>14.06</span><h3>Открытие летнего сезона</h3><p>Анапа · Alean Family</p><i className="arrow-ne" aria-hidden="true" /></article><article className="reveal"><span>28.06</span><h3>Гастрономические выходные</h3><p>Сочи · Alean Collection</p><i className="arrow-ne" aria-hidden="true" /></article><article className="reveal"><span>12.07</span><h3>Семейный фестиваль</h3><p>Геленджик · Alean Family</p><i className="arrow-ne" aria-hidden="true" /></article></div></section>

    <section className="social-recap shell">
      <div className="social-recap-head"><h3>Как это было</h3><div className="social-links"><span className="social-icon social-vk" aria-label="Alean Collection во ВКонтакте"><span aria-hidden="true">VK</span></span><span className="social-icon social-max" aria-label="Alean Collection в MAX"><span aria-hidden="true">MAX</span></span></div></div>
      <div className="social-recap-grid">
        {[
          { type: "image" as const, src: "/alean-vk-content-tips.jpg", title: "Снимаем красивый контент во время отпуска", date: "19 августа" },
          { type: "video" as const, src: "/alean-vk-arbuz-fest.mp4", title: "Фестиваль «Арбузный фреш»", date: "17 августа" },
          { type: "image" as const, src: "/alean-vk-magazine-cover.jpg", title: "Вам письмо! Новый номер журнала", date: "август 2026" },
          { type: "image" as const, src: "/alean-vk-squirrels-birthday.jpg", title: "День рождения белочек Вики и Чики", date: "1 августа" },
          { type: "video" as const, src: "/alean-vk-white-party.mp4", title: "Белая вечеринка", date: "28 июля" },
          { type: "video" as const, src: "/alean-vk-dolphins.mp4", title: "Дельфины у Alean Family Sputnik", date: "лето 2026" },
        ].map((post) => <article className="reveal" key={post.title}>
          {post.type === "video"
            ? <video src={post.src} muted autoPlay loop playsInline aria-label={post.title}/>
            : <img src={post.src} alt={post.title}/>}
          <div className="social-meta">
            <div className="social-meta-row"><span className="social-source-icon" aria-label="ВКонтакте"><span aria-hidden="true">VK</span></span><span className="social-date">{post.date}</span></div>
            <span>{post.title}</span>
          </div>
        </article>)}
      </div>
    </section>

    <section className="faq shell"><div><p className="micro">Частые вопросы</p><h2>Перед поездкой</h2><span className="faq-more">Узнать больше <span className="arrow-ne" aria-hidden="true" /></span></div><div className="faq-list"><details open><summary>Что входит в формат «Всё включено»?<span className="faq-toggle" aria-hidden="true" /></summary><p>Набор услуг зависит от бренда и конкретного отеля. На странице выбранного отеля показан полный состав питания, развлечений и инфраструктуры.</p></details><details><summary>Можно ли приехать с питомцем?<span className="faq-toggle" aria-hidden="true" /></summary><p>Условия размещения с животными различаются. Выберите фильтр «С питомцем» в каталоге.</p></details><details><summary>Как работают бонусы программы лояльности?<span className="faq-toggle" aria-hidden="true" /></summary><p>Бонусы начисляются после оплаченного проживания и доступны в личном кабинете.</p></details></div></section>

    <section className="development"><div className="shell development-grid"><div className="development-copy"><p className="micro">Alean Development</p><h2>Создаем новые<br/>места силы</h2><p>Развиваем гостиничные проекты, соединяя сильную локацию, продуманный продукт и опыт управления курортными отелями.</p><a href="#top">О девелопменте <span className="arrow-ne" aria-hidden="true" /></a></div><DevelopmentShowcase /></div></section>

    <section className="contact shell" id="contacts"><div><p className="micro">Контакты</p><h2>Путешествие<br/>начинается здесь</h2><a href="tel:88002500030">8 800 250 00 30</a><a href="mailto:booking@aleancollection.ru">booking@aleancollection.ru</a></div><div className="map" aria-label="Карта отелей Alean Collection"><iframe src="https://yandex.ru/map-widget/v1/?ll=39.8%2C44.3&z=6&l=map" title="Карта курортов Alean Collection: Анапа, Геленджик, Сочи, Архыз" loading="lazy" allowFullScreen /></div></section>

    <ScrollToTop />

    <ScrollReveal />

    <SiteFooter />
  </main>;
}
