import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Lenis from "lenis";

import { LoadingScreen } from "@/components/wedding/LoadingScreen";
import { WeddingNavigation } from "@/components/wedding/WeddingNavigation";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { WelcomeSection } from "@/components/wedding/WelcomeSection";
import { CalendarButtons } from "@/components/wedding/CalendarButtons";
import { OurStory } from "@/components/wedding/OurStory";
import { WeddingTimeline } from "@/components/wedding/WeddingTimeline";
import { LocationSection } from "@/components/wedding/LocationSection";
import { Gallery } from "@/components/wedding/Gallery";
import { GiftSection } from "@/components/wedding/GiftSection";
import { RSVPForm } from "@/components/wedding/RSVPForm";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { Footer } from "@/components/wedding/Footer";
import { useScrollReveal } from "@/lib/reveal";

const title = "Silvia & Massimiliano — Our Wedding Day";
const description =
  "Digital wedding invitation for Silvia and Massimiliano, 12 June 2027, Lake Como. Schedule, venue, gallery and RSVP.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);

  useScrollReveal([entered]);

  useEffect(() => {
    if (!entered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [entered]);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <>
      {!entered && <LoadingScreen onEnter={() => setEntered(true)} />}

      <div
        className={`transition-opacity duration-1000 ${entered ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!entered}
      >
        <WeddingNavigation />
        <main>
          <Hero />
          <Countdown />
          <WelcomeSection />
          <CalendarButtons />
          <OurStory />
          <WeddingTimeline />
          <LocationSection />
          <Gallery />
          <GiftSection />
          <RSVPForm />
        </main>
        <Footer />
        <MusicToggle autoPlay={entered} />
      </div>
    </>
  );
}
