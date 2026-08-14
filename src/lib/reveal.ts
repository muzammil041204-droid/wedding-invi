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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset["revealDelay"] ?? 0);
          el.style.transition = `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}