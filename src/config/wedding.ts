import heroImg from "@/assets/hero.jpg";
import venueImg from "@/assets/venue.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import detail1 from "@/assets/detail-1.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

/**
 * Everything that is wedding-specific lives here.
 * Replace names, dates, texts and images below — no other file needs editing.
 */
export const weddingData = {
  couple: {
    personOne: "Silvia",
    personTwo: "Massimiliano",
    monogram: "S & M",
  },
  /** ISO date + time of the ceremony (local time) */
  weddingDate: "2027-06-12T15:00:00",
  dateDisplay: "12 · 06 · 2027",
  location: {
    name: "Villa Serena",
    city: "Lake Como",
    country: "Italy",
    address: "Via del Lago 12, 22021 Bellagio CO, Italy",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bellagio+Lake+Como+Italy",
  },
  welcome: {
    title: "A day to remember",
    lines: [
      "Some moments wait a lifetime to be lived.",
      "Ours has finally arrived.",
    ],
    body: "We are getting married, and we would love to have you beside us. On the shore of the lake, in the June light, surrounded by the people we love, the chapter we have always dreamed of begins.",
  },
  story: [
    {
      year: "2019",
      title: "The first meeting",
      text: "One September evening, a table shared by chance in a small trattoria in Milan. Two hours became four, and neither of us wanted to go home.",
      image: story1,
      alt: "Elegant couple walking along a cypress-lined path",
    },
    {
      year: "2020",
      title: "The first journey",
      text: "A week by the lake with no plans at all. That was when we knew our life would be simple: together.",
      image: detail1,
      alt: "White roses and eucalyptus on ivory linen",
    },
    {
      year: "2026",
      title: "The promise",
      text: "A ring hidden for months, an autumn afternoon, and an answer that came before the question.",
      image: story2,
      alt: "Hands with an engagement ring resting on antique lace",
    },
  ],
  schedule: [
    { time: "15:00", title: "Ceremony", note: "Church of San Giacomo" },
    { time: "17:00", title: "Cocktail hour", note: "The villa gardens" },
    { time: "19:30", title: "Dinner", note: "Lakeside terrace" },
    { time: "22:00", title: "Dancing & celebration", note: "Until late into the night" },
  ],
  gallery: [
    { src: gallery2, alt: "Detail of the bride's dress", w: 1000, h: 1400 },
    { src: gallery1, alt: "Long banquet table beneath the olive trees", w: 1400, h: 1000 },
    { src: gallery4, alt: "Stone doorway of an Italian chapel", w: 1000, h: 1400 },
    { src: gallery3, alt: "Champagne toast at sunset", w: 1200, h: 1200 },
    { src: detail1, alt: "White roses on linen", w: 1000, h: 1250 },
    { src: venueImg, alt: "Villa on Lake Como at dawn", w: 1600, h: 1008 },
  ],
  gift: {
    title: "Your gift",
    text: "The greatest gift is simply having you there. If you would like to contribute to the beginning of our life together, we will treasure the thought.",
    iban: "IT00 X000 0000 0000 0000 0000 000",
    holder: "Silvia Rossi & Massimiliano Conti",
  },
  images: {
    hero: heroImg,
    venue: venueImg,
  },
  rsvpDeadline: "30 April 2027",
} as const;

export const weddingDateObj = new Date(weddingData.weddingDate);