export type RsvpPayload = {
  firstName: string;
  lastName: string;
  attending: "yes" | "no";
  adults: number;
  children: number;
  dietary: string;
  notes: string;
};

export type RsvpResult = { ok: true } | { ok: false; error: string };

const STORAGE_KEY = "wedding-rsvp-submissions";

function submissionKey(payload: RsvpPayload) {
  return `${payload.firstName.trim().toLowerCase()}|${payload.lastName.trim().toLowerCase()}`;
}

function readSubmitted(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

/**
 * Single abstraction for RSVP delivery.
 * Swap the body of `send` for a Lovable Cloud insert into `wedding_rsvps`
 * when a backend is enabled — the UI does not change.
 */
export const rsvpService = {
  hasSubmitted(payload: RsvpPayload) {
    return readSubmitted().includes(submissionKey(payload));
  },

  async send(payload: RsvpPayload): Promise<RsvpResult> {
    if (this.hasSubmitted(payload)) {
      return { ok: false, error: "We have already received an RSVP under this name." };
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      const existing = readSubmitted();
      existing.push(submissionKey(payload));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      return { ok: true };
    } catch {
      return { ok: false, error: "Something went wrong. Please try again in a moment." };
    }
  },
};