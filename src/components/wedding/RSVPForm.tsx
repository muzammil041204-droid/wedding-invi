import { useState, type FormEvent } from "react";
import { rsvpService, type RsvpPayload } from "@/lib/rsvp";
import { weddingData } from "@/config/wedding";
import { ConfirmationMessage } from "./ConfirmationMessage";

const dietaryOptions = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten free",
  "Dairy free",
  "Other",
];

const fieldClass =
  "w-full border-0 border-b border-hairline bg-transparent py-3 text-base sm:text-lg font-light text-ink transition-colors duration-500 placeholder:text-warmgray/60 focus:border-champagne focus:outline-none";

const labelClass = "text-sm sm:text-base font-medium tracking-wider uppercase block text-warmgray";

export function RSVPForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState<RsvpPayload>({
    firstName: "",
    lastName: "",
    attending: "yes",
    adults: 1,
    children: 0,
    dietary: "None",
    notes: "",
  });

  const update = <K extends keyof RsvpPayload>(key: K, value: RsvpPayload[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setStatus("error");
      setError("Please enter your first and last name.");
      return;
    }
    setStatus("loading");
    setError("");
    const result = await rsvpService.send(form);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setError(result.error);
    }
  };

  return (
    <section id="rsvp" className="bg-ivory px-6 py-28 sm:py-40">
      <div className="mx-auto max-w-xl">
        <header className="text-center">
          <p className="reveal label-xs text-champagne">RSVP</p>
          <h2 className="reveal mt-8 font-serif text-[clamp(1.9rem,6vw,3.5rem)] font-light text-ink italic">
            Will you join us?
          </h2>
          <p className="reveal label-xs mt-8 text-warmgray">
            Kindly reply by {weddingData.rsvpDeadline}
          </p>
        </header>

        {status === "success" ? (
          <ConfirmationMessage />
        ) : (
          <form onSubmit={onSubmit} className="reveal mt-16 space-y-12" noValidate>
            <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
              <div>
                <label className={labelClass} htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  className={`${fieldClass} mt-3`}
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  className={`${fieldClass} mt-3`}
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
              </div>
            </div>

            <fieldset>
              <legend className={labelClass}>Will you be attending?</legend>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:gap-10">
                {[
                  { value: "yes", label: "Yes, with pleasure" },
                  { value: "no", label: "Sadly, I can't make it" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-3 text-base sm:text-lg font-light text-ink"
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={opt.value}
                      checked={form.attending === opt.value}
                      onChange={() => update("attending", opt.value as "yes" | "no")}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="relative h-3.5 w-3.5 rounded-full border border-hairline transition-colors duration-500 peer-checked:border-champagne peer-focus-visible:border-champagne after:absolute after:inset-1 after:rounded-full after:bg-champagne after:opacity-0 after:transition-opacity after:duration-500 peer-checked:after:opacity-100"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {form.attending === "yes" && (
              <>
                <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
                  <div>
                    <label className={labelClass} htmlFor="adults">
                      Number of adults
                    </label>
                    <input
                      id="adults"
                      type="number"
                      min={1}
                      max={10}
                      className={`${fieldClass} mt-3`}
                      value={form.adults}
                      onChange={(e) => update("adults", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="children">
                      Number of children
                    </label>
                    <input
                      id="children"
                      type="number"
                      min={0}
                      max={10}
                      className={`${fieldClass} mt-3`}
                      value={form.children}
                      onChange={(e) => update("children", Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="dietary">
                    Dietary preferences
                  </label>
                  <select
                    id="dietary"
                    className={`${fieldClass} mt-3 cursor-pointer appearance-none rounded-none`}
                    value={form.dietary}
                    onChange={(e) => update("dietary", e.target.value)}
                  >
                    {dietaryOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className={labelClass} htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                className={`${fieldClass} mt-3 resize-none`}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm font-light text-destructive">
                {error}
              </p>
            )}

            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={status === "loading"}
                className="label-xs inline-flex min-h-12 cursor-pointer items-center justify-center border border-hairline px-10 py-4 text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne focus-visible:border-champagne focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Send RSVP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}