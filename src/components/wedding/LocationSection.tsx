import { weddingData } from "@/config/wedding";

export function LocationSection() {
  return (
    <section id="location" className="bg-cream">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 py-28 sm:py-40 lg:grid-cols-2 lg:gap-24 lg:px-16">
        <figure className="reveal overflow-hidden">
          <img
            src={weddingData.images.venue}
            alt={`${weddingData.location.name}, ${weddingData.location.city}`}
            width={1600}
            height={1008}
            loading="lazy"
            decoding="async"
            className="h-[52vh] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03] lg:h-[78vh]"
          />
        </figure>

        <div className="lg:pr-10">
          <p className="reveal label-xs text-champagne">The venue</p>
          <h2 className="reveal mt-8 font-serif text-[clamp(2rem,6vw,3.75rem)] leading-[1.1] font-light text-ink">
            {weddingData.location.name}
          </h2>
          <p className="reveal text-base font-medium tracking-wider uppercase mt-6 text-warmgray">
            {weddingData.location.city} · {weddingData.location.country}
          </p>
          <p className="reveal mt-10 max-w-lg text-base sm:text-lg leading-relaxed font-light text-warmgray">
            A nineteenth-century villa above the water, framed by cypress trees and stone terraces.
            The ceremony, dinner and celebration all take place here.
          </p>
          <p className="reveal mt-8 text-base font-light text-warmgray">
            {weddingData.location.address}
          </p>

          <div className="reveal mt-12 flex flex-wrap gap-x-10 gap-y-2">
            <a
              href={weddingData.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm sm:text-base font-medium tracking-wider uppercase inline-flex items-center border-b border-hairline py-4 text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne"
            >
              Open in Google Maps
            </a>
            <a
              href={weddingData.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm sm:text-base font-medium tracking-wider uppercase inline-flex items-center border-b border-hairline py-4 text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne"
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}