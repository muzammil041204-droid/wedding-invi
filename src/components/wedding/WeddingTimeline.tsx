import { Church, GlassWater, UtensilsCrossed, Music2 } from "lucide-react";
import { weddingData } from "@/config/wedding";

const icons = [Church, GlassWater, UtensilsCrossed, Music2];

export function WeddingTimeline() {
  return (
    <section id="schedule" className="bg-ivory px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <p className="reveal label-xs text-champagne">The day</p>
          <h2 className="reveal mt-8 font-serif text-[clamp(1.9rem,6vw,3.5rem)] font-light text-ink">
            Schedule
          </h2>
        </header>

        <ol className="mt-20">
          {weddingData.schedule.map((item, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <li
                key={item.title}
                className="reveal grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-t border-hairline py-8 sm:grid-cols-[6rem_auto_1fr] sm:gap-x-10 sm:py-10"
                data-reveal-delay={String(i * 90)}
              >
                <span className="font-serif text-3xl font-light text-ink tabular-nums sm:text-4xl">
                  {item.time}
                </span>
                <Icon
                  strokeWidth={0.9}
                  className="hidden h-6 w-6 shrink-0 self-center text-champagne sm:block"
                  aria-hidden="true"
                />
                <div className="col-span-2 mt-3 sm:col-span-1 sm:mt-0">
                  <h3 className="text-base sm:text-lg font-semibold tracking-wider text-ink uppercase">{item.title}</h3>
                  <p className="mt-2 text-base sm:text-lg font-light text-warmgray">{item.note}</p>
                </div>
              </li>
            );
          })}
          <li className="border-t border-hairline" aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}