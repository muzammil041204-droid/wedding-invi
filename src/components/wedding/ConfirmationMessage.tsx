import { Divider } from "./Monogram";

export function ConfirmationMessage() {
  return (
    <div className="mt-16 animate-[fade-in_0.9s_ease-out] text-center" role="status">
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        className="mx-auto text-champagne"
        aria-hidden="true"
      >
        <circle
          cx="26"
          cy="26"
          r="24"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.5"
          className="origin-center animate-[scale-in_0.9s_ease-out]"
        />
        <path
          d="M16 27L23 34L37 20"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 0,
            animation: "draw 1.2s cubic-bezier(0.22,1,0.36,1) 0.2s both",
          }}
        />
      </svg>

      <h3 className="mt-10 font-serif text-[clamp(1.75rem,5vw,2.75rem)] font-light text-ink">
        Thank you
      </h3>
      <p className="mt-6 text-base sm:text-lg leading-relaxed font-light text-warmgray">
        We can't wait to celebrate with you.
      </p>
      <Divider className="mt-12" />

      <style>{`@keyframes draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }`}</style>
    </div>
  );
}