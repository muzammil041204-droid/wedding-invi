import { weddingData } from "@/config/wedding";

export function OurStory() {
  return (
    <section id="story" className="bg-cream px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-[1200px]">
        <header className="mx-auto max-w-xl text-center">
          <p className="reveal label-xs text-champagne">Our story</p>
          <h2 className="reveal mt-8 font-serif text-[clamp(1.9rem,6vw,3.5rem)] leading-tight font-light text-ink">
            From the first glance
            <span className="block italic">to forever</span>
          </h2>
        </header>

        <div className="mt-24 space-y-28 sm:space-y-40">
          {weddingData.story.map((chapter, i) => (
            <article
              key={chapter.title}
              className={`grid items-center gap-10 md:grid-cols-12 md:gap-16 ${
                i % 2 === 1 ? "md:[&>figure]:order-2" : ""
              }`}
            >
              <figure
                className={`reveal overflow-hidden md:col-span-7 ${
                  i % 2 === 1 ? "md:col-start-6" : ""
                }`}
              >
                <img
                  src={chapter.image}
                  alt={chapter.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-[58vh] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03] md:h-[70vh]"
                />
              </figure>

              <div
                className={`md:col-span-5 ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
              >
                <p className="reveal text-sm sm:text-base font-semibold tracking-widest uppercase text-champagne">{chapter.year}</p>
                <h3
                  className="reveal mt-6 font-serif text-[clamp(1.75rem,4.5vw,2.5rem)] font-light text-ink"
                  data-reveal-delay="80"
                >
                  {chapter.title}
                </h3>
                <p
                  className="reveal mt-6 max-w-lg text-base sm:text-lg leading-relaxed font-light text-warmgray"
                  data-reveal-delay="160"
                >
                  {chapter.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}