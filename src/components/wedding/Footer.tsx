import { weddingData } from "@/config/wedding";
import { Monogram } from "./Monogram";

export function Footer() {
  return (
    <footer className="bg-cream px-6 py-28 text-center sm:py-36">
      <Monogram
        className="reveal mx-auto text-champagne"
        size={64}
        letters={`${weddingData.couple.personOne[0]} ${weddingData.couple.personTwo[0]}`}
      />
      <p className="reveal text-base font-medium tracking-widest uppercase mt-10 text-ink">{weddingData.dateDisplay}</p>
      <p className="reveal text-sm font-medium tracking-wider uppercase mt-6 text-warmgray">With love</p>
    </footer>
  );
}