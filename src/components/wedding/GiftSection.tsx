import { useEffect, useRef, useState } from "react";
import { weddingData } from "@/config/wedding";
import { Divider } from "./Monogram";

export function GiftSection() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(weddingData.gift.iban.replace(/\s/g, ""));
      setCopied(true);
      timer.current = window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="bg-cream px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="reveal label-xs text-champagne">{weddingData.gift.title}</p>
        <p className="reveal mx-auto mt-10 max-w-xl text-base sm:text-lg leading-relaxed font-light text-warmgray">
          {weddingData.gift.text}
        </p>

        <Divider className="reveal mt-14" />

        <div className="reveal mt-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-warmgray">IBAN</p>
          <p className="mt-5 font-serif text-[clamp(1.2rem,4vw,1.75rem)] font-light tracking-[0.08em] text-ink break-all">
            {weddingData.gift.iban}
          </p>
          <p className="mt-5 text-base font-light text-warmgray">{weddingData.gift.holder}</p>

          <button
            type="button"
            onClick={copy}
            aria-live="polite"
            className="text-sm sm:text-base font-medium tracking-wider uppercase mt-10 inline-flex cursor-pointer items-center gap-2 border-b border-hairline px-1 py-4 text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne focus-visible:border-champagne focus-visible:outline-none"
          >
            <span
              className={`transition-opacity duration-500 ${copied ? "text-champagne" : ""}`}
            >
              {copied ? "Copied ✓" : "Copy IBAN"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}