import { useEffect, useRef } from "react";
import gsap from "gsap";
import { weddingData } from "@/config/wedding";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-hero]", { opacity: 1, y: 0, scale: 1, clipPath: "inset(0%)" });
        return;
      }
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        "[data-hero='image']",
        { clipPath: "inset(12% 12% 12% 12%)", scale: 1.12, opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        },
      )
        .fromTo(
          "[data-hero='eyebrow']",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" },
          "-=1.5",
        )
        .fromTo(
          "[data-hero='name']",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.4, stagger: 0.22, ease: "power3.out" },
          "-=0.9",
        )
        .fromTo(
          "[data-hero='meta']",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.14, ease: "power2.out" },
          "-=0.8",
        )
        .fromTo(
          "[data-hero='scroll']",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.5",
        );

      // subtle parallax
      const onScroll = () => {
        if (!imageWrap.current) return;
        const y = window.scrollY * 0.12;
        gsap.set(imageWrap.current, { y });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden pt-24 pb-14 sm:pb-20"
    >
      <div ref={imageWrap} className="absolute inset-0 z-0 will-change-transform">
        <img
          data-hero="image"
          src={weddingData.images.hero}
          alt="The couple on a terrace overlooking Lake Como"
          width={1280}
          height={1600}
          fetchPriority="high"
          decoding="async"
          className="h-[112%] w-full object-cover object-center opacity-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/75 via-ivory/15 to-ivory" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ivory via-ivory/80 to-transparent" />
        <div className="absolute inset-0 bg-ivory/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <p data-hero="eyebrow" className="label-xs text-warmgray opacity-0">
          Together, with joy
        </p>

        <h1 className="mt-8 font-serif text-ink">
          <span
            data-hero="name"
            className="block text-[clamp(2.75rem,13vw,7.5rem)] leading-[0.95] font-light tracking-[0.01em] opacity-0"
          >
            {weddingData.couple.personOne}
          </span>
          <span
            data-hero="name"
            className="my-2 block text-[clamp(1.5rem,5vw,2.75rem)] leading-none font-light text-champagne italic opacity-0"
          >
            &
          </span>
          <span
            data-hero="name"
            className="block text-[clamp(2.1rem,9.2vw,6rem)] leading-[0.98] font-light tracking-[0.01em] opacity-0"
          >
            {weddingData.couple.personTwo}
          </span>
        </h1>

        <div className="mt-12 flex flex-col items-center gap-5">
          <span data-hero="meta" className="hairline block h-px w-14 opacity-0" aria-hidden="true" />
          <p data-hero="meta" className="text-base sm:text-lg font-medium tracking-widest uppercase text-ink opacity-0">
            {weddingData.dateDisplay}
          </p>
          <p data-hero="meta" className="text-sm sm:text-base tracking-wider uppercase text-warmgray opacity-0">
            {weddingData.location.city} · {weddingData.location.country}
          </p>
        </div>
      </div>

      <div
        data-hero="scroll"
        className="text-xs sm:text-sm font-medium tracking-widest uppercase relative z-10 mt-16 flex flex-col items-center gap-3 text-warmgray opacity-0"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <span className="h-10 w-px animate-pulse bg-hairline" />
      </div>
    </section>
  );
}