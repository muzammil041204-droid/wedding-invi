import { useEffect } from "react";

/**
 * Lightweight scroll reveal for elements carrying the `reveal` class.
 * Uses IntersectionObserver + CSS transitions (cheap, transform/opacity only).
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reduced) {
      nodes.forEach((n) => {
        n.style.opacity = "1";
        n.style.transform = "none";
      });
      return;
    }

    const isMobile = window.innerWidth < 768;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const rawDelay = Number(el.dataset["revealDelay"] ?? 0);
          const delay = isMobile ? Math.min(rawDelay, 120) : rawDelay;
          const duration = isMobile ? "0.85s" : "1.1s";
          
          el.style.transition = `opacity ${duration} cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration} cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        });
      },
      { rootMargin: isMobile ? "0px 0px -4% 0px" : "0px 0px -10% 0px", threshold: 0.05 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}