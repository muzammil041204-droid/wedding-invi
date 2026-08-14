import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const TOTAL_FRAMES = 132;

export function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sealBtnRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [opening, setOpening] = useState(false);
  const frameObj = useRef({ currentFrame: 0 });

  /* ─── Draw specific frame onto canvas with cover aspect ratio ─── */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Calculate aspect ratio cover
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, cx, cy, nw, nh);
  }, []);

  /* ─── Preload all 132 frame images on mount ─── */
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let isMounted = true;

    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
        canvasRef.current.height = window.innerHeight * Math.min(window.devicePixelRatio || 1, 2);
        drawFrame(Math.round(frameObj.current.currentFrame));
      }
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/invitation/frame_${frameNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        if (i === 1) {
          drawFrame(0);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [drawFrame]);

  /* ─── Play continuous animation sequence ─── */
  const handleOpen = useCallback(() => {
    if (opening) return;
    setOpening(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onEnter();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onEnter,
      });

      // Phase 1: Hint fades out cleanly
      tl.to(hintRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 0.25,
        ease: "power2.out",
      })

        // Phase 2: Smooth frame-by-frame animation from Frame 0 to Frame 131
        .to(
          frameObj.current,
          {
            currentFrame: TOTAL_FRAMES - 1,
            duration: 3.6,
            ease: "power1.inOut",
            onUpdate: () => {
              const idx = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.round(frameObj.current.currentFrame))
              );
              drawFrame(idx);
            },
          },
          "-=0.1"
        )

        // Phase 3: Hold on final frame for 2 full seconds as requested
        .to({}, { duration: 2.0 })

        // Phase 4: Seamless continuous zoom & fade into the website Hero
        .to(
          containerRef.current,
          {
            opacity: 0,
            scale: 1.04,
            duration: 0.7,
            ease: "power2.inOut",
          }
        );
    }, containerRef);

    return () => ctx.revert();
  }, [opening, onEnter, drawFrame]);

  return (
    <div
      ref={containerRef}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
      aria-label="Click anywhere to open the wedding invitation cover"
      className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden bg-[#e0d8cc] flex items-center justify-center focus:outline-none"
    >
      {/* High performance 60fps HTML5 Canvas renderer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Click Hint Bar at Bottom */}
      <div
        ref={hintRef}
        className="absolute bottom-10 sm:bottom-12 z-40 text-center px-4 pointer-events-none"
      >
        <p
          className="text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase font-sans font-medium px-6 py-2.5 rounded-full backdrop-blur-md animate-pulse shadow-sm"
          style={{
            color: "#6b5d43",
            background: "rgba(247, 243, 235, 0.75)",
            border: "1px solid rgba(180, 168, 142, 0.4)",
          }}
        >
          Tap to open invitation
        </p>
      </div>
    </div>
  );
}