export type RsvpPayload = {
  firstName: string;
  lastName: string;
  attending: "yes" | "no";
  adults: number;
  children: number;
  dietary: string;
  notes: string;
};

export type RsvpRecord = RsvpPayload & {
  id: string;
  createdAt: string;
};

export type RsvpResult = { ok: true } | { ok: false; error: string };

const STORAGE_KEY = "wedding-rsvp-records";

function readRecords(): RsvpRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RsvpRecord[];
  } catch {
    return [];
  }
}

function writeRecords(records: RsvpRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error("Failed to save RSVP records:", err);
  }
}

export const rsvpService = {
  getAll(): RsvpRecord[] {
    return readRecords();
  },

  hasSubmitted(payload: RsvpPayload): boolean {
    const records = readRecords();
    const key = `${payload.firstName.trim().toLowerCase()}|${payload.lastName.trim().toLowerCase()}`;
    return records.some(
      (r) => `${r.firstName.trim().toLowerCase()}|${r.lastName.trim().toLowerCase()}` === key
    );
  },

  async send(payload: RsvpPayload): Promise<RsvpResult> {
    if (this.hasSubmitted(payload)) {
      return { ok: false, error: "We have already received an RSVP under this name." };
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const records = readRecords();
      const newRecord: RsvpRecord = {
        ...payload,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      };
      records.unshift(newRecord);
      writeRecords(records);
      return { ok: true };
    } catch {
      return { ok: false, error: "Something went wrong. Please try again in a moment." };
    }
  },

  deleteRecord(id: string): void {
    const records = readRecords().filter((r) => r.id !== id);
    writeRecords(records);
  },

  clearAll(): void {
    writeRecords([]);
  },
};