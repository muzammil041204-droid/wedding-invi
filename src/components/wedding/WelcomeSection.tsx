import { weddingData } from "@/config/wedding";
import { Divider } from "./Monogram";

export function WelcomeSection() {
  return (
    <section className="bg-ivory px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="reveal label-xs text-champagne">{weddingData.welcome.title}</p>

        <h2 className="reveal mt-10 font-serif text-[clamp(1.85rem,5vw,3.25rem)] leading-[1.35] font-light text-ink italic">
          {weddingData.welcome.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <Divider className="reveal mt-12" />

        <p className="reveal mx-auto mt-12 max-w-2xl text-lg sm:text-xl leading-relaxed font-light text-warmgray">
          {weddingData.welcome.body}
        </p>

        <p className="reveal mt-12 font-serif text-xl sm:text-2xl italic text-ink">
          {weddingData.couple.personOne} &amp; {weddingData.couple.personTwo}
        </p>
      </div>
    </section>
  );
}