"use client";

import { useCallback, useEffect, useState } from "react";

export type GalleryPhoto = { src: string; caption: string };

// Галерея открывается прямо на странице: в концепции переходов на другие сайты нет.
export function PhotoGallery({ photos, label = "Посмотреть все фотографии" }: { photos: GalleryPhoto[]; label?: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const step = useCallback((delta: number) => {
    setIndex((value) => (value + delta + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.body.classList.add("gallery-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("gallery-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = photos[index];

  return <>
    <button type="button" className="dv-gallery-link" onClick={() => { setIndex(0); setOpen(true); }}>
      {label} <span className="arrow-ne" aria-hidden="true" />
    </button>

    <div className={`gallery-overlay${open ? " open" : ""}`} aria-hidden={!open} onPointerDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="gallery-frame" role="dialog" aria-modal="true" aria-label="Фотографии отеля">
        <button type="button" className="gallery-close" onClick={() => setOpen(false)} aria-label="Закрыть галерею">×</button>
        <div className="gallery-stage" style={{ backgroundImage: `url('${current.src}')` }} role="img" aria-label={current.caption} />
        <div className="gallery-bar">
          <button type="button" onClick={() => step(-1)} aria-label="Предыдущее фото">←</button>
          <p><strong>{current.caption}</strong><span>{index + 1} / {photos.length}</span></p>
          <button type="button" onClick={() => step(1)} aria-label="Следующее фото">→</button>
        </div>
        <div className="gallery-thumbs">
          {photos.map((photo, position) => <button
            type="button"
            key={photo.src}
            className={position === index ? "active" : ""}
            style={{ backgroundImage: `url('${photo.src}')` }}
            aria-label={photo.caption}
            aria-current={position === index}
            onClick={() => setIndex(position)}
          />)}
        </div>
      </div>
    </div>
  </>;
}
