import { useEffect, useState } from "react";
import { weddingDateObj } from "@/config/wedding";

function diff(target: Date) {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total / 3_600_000) % 24),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTime(diff(weddingDateObj));
    const id = window.setInterval(() => setTime(diff(weddingDateObj)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const items = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <section className="bg-cream px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="reveal text-sm sm:text-base font-semibold tracking-widest uppercase text-warmgray">Our day</p>
        <h2 className="reveal mt-6 font-serif text-[clamp(1.75rem,5vw,3rem)] font-light text-ink">
          Counting down
        </h2>

        <div className="reveal mt-14 grid grid-cols-4 divide-x divide-hairline">
          {items.map((item) => (
            <div key={item.label} className="px-1 sm:px-4">
              <div
                className="font-serif text-[clamp(2.2rem,9vw,5rem)] leading-none font-light text-ink tabular-nums"
                aria-hidden="true"
              >
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-widest uppercase mt-4 text-warmgray">{item.label}</div>
              <span className="sr-only">{`${item.value} ${item.label}`}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}