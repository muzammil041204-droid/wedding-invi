import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { weddingData } from "@/config/wedding";

const links = [
  { id: "home", label: "Home" },
  { id: "story", label: "Our story" },
  { id: "schedule", label: "Schedule" },
  { id: "location", label: "Venue" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
];

export function WeddingNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }),
      open ? 260 : 0,
    );
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-ivory/90 backdrop-blur-[6px]" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 transition-all duration-700 sm:px-10 ${
            scrolled ? "py-4" : "py-6"
          }`}
        >
          <button
            type="button"
            onClick={() => go("home")}
            className="text-base font-semibold tracking-widest text-ink uppercase min-w-0 cursor-pointer truncate text-left transition-colors hover:text-champagne"
          >
            {weddingData.couple.monogram}
          </button>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigazione principale">
            {links.slice(1).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="text-sm font-medium tracking-wider uppercase link-underline cursor-pointer text-warmgray transition-colors duration-500 hover:text-ink"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center justify-self-end text-ink transition-colors hover:text-champagne lg:hidden"
            aria-label="Open menu"
          >
            <Menu strokeWidth={1} className="h-5 w-5" />
          </button>
        </div>
        <div
          className={`hairline mx-auto h-px max-w-[1600px] transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      <div
        className={`fixed inset-0 z-60 bg-ivory transition-all duration-700 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="text-sm font-medium tracking-widest uppercase text-warmgray">{weddingData.dateDisplay}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center text-ink"
            aria-label="Close menu"
          >
            <X strokeWidth={1} className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-10 flex flex-col gap-7 px-8" aria-label="Mobile navigation">
          {links.map((l, i) => (
            <button
              key={l.id}
              type="button"
              onClick={() => go(l.id)}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={`text-left font-serif text-4xl font-light text-ink transition-all duration-700 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}