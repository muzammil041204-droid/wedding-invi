import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { weddingData } from "@/config/wedding";

const spans = [
  "sm:col-span-5 sm:row-span-2",
  "sm:col-span-7",
  "sm:col-span-4 sm:row-span-2",
  "sm:col-span-3",
  "sm:col-span-4",
  "sm:col-span-8",
];

export function Gallery() {
  const images = weddingData.gallery;
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const move = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, move]);

  const current = index === null ? null : images[index]!;

  return (
    <section id="gallery" className="bg-ivory px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-[1400px]">
        <header className="text-center">
          <p className="reveal label-xs text-champagne">Gallery</p>
          <h2 className="reveal mt-8 font-serif text-[clamp(1.9rem,6vw,3.5rem)] font-light text-ink">
            Moments
          </h2>
        </header>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-6">
          {images.map((img, i) => (
            <button
              key={img.alt + i}
              type="button"
              onClick={() => setIndex(i)}
              data-reveal-delay={String((i % 3) * 90)}
              className={`reveal group relative cursor-pointer overflow-hidden focus-visible:outline-none ${spans[i % spans.length]}`}
              aria-label={`Open image: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                loading="lazy"
                decoding="async"
                className="h-full min-h-[42vh] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10 group-focus-visible:bg-ink/10" />
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="fixed inset-0 z-90 flex flex-col bg-ivory/97 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Full screen gallery"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-sm font-medium tracking-widest uppercase text-warmgray">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-champagne"
              aria-label="Close"
            >
              <X strokeWidth={1} className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 pb-6">
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="max-h-[76vh] w-auto max-w-full animate-[fade-in_0.6s_ease-out] object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-12 pb-10">
            <button
              type="button"
              onClick={() => move(-1)}
              className="flex h-12 w-12 items-center justify-center text-ink transition-colors hover:text-champagne"
              aria-label="Previous image"
            >
              <ChevronLeft strokeWidth={1} className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="flex h-12 w-12 items-center justify-center text-ink transition-colors hover:text-champagne"
              aria-label="Next image"
            >
              <ChevronRight strokeWidth={1} className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}