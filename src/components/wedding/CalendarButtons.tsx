import { weddingData, weddingDateObj } from "@/config/wedding";
import { downloadIcs, googleCalendarUrl, outlookCalendarUrl } from "@/lib/calendar";

const event = {
  title: `The Wedding of ${weddingData.couple.personOne} & ${weddingData.couple.personTwo}`,
  description: `We look forward to celebrating with you at ${weddingData.location.name}, ${weddingData.location.city}.`,
  location: weddingData.location.address,
  start: weddingDateObj,
  durationHours: 9,
};

const itemClass =
  "text-sm sm:text-base font-medium tracking-wider uppercase group inline-flex cursor-pointer items-center gap-3 border-b border-hairline px-1 py-4 text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne focus-visible:border-champagne focus-visible:outline-none";

export function CalendarButtons() {
  return (
    <section className="bg-ivory px-6 pb-28 sm:pb-40">
      <div className="mx-auto max-w-3xl text-center">
        <p className="reveal text-sm sm:text-base font-semibold tracking-widest uppercase text-warmgray">+ Add to calendar</p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          <a className={itemClass} href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
            Google Calendar
          </a>
          <button type="button" className={itemClass} onClick={() => downloadIcs(event)}>
            Apple Calendar
          </button>
          <a className={itemClass} href={outlookCalendarUrl(event)} target="_blank" rel="noreferrer">
            Outlook
          </a>
        </div>
      </div>
    </section>
  );
}