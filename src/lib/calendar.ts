type CalendarEvent = {
  title: string;
  description: string;
  location: string;
  start: Date;
  durationHours: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

function toUtcStamp(date: Date) {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`
  );
}

export function calendarRange(event: CalendarEvent) {
  const end = new Date(event.start.getTime() + event.durationHours * 3600_000);
  return { start: toUtcStamp(event.start), end: toUtcStamp(end) };
}

export function googleCalendarUrl(event: CalendarEvent) {
  const { start, end } = calendarRange(event);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(event: CalendarEvent) {
  const end = new Date(event.start.getTime() + event.durationHours * 3600_000);
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: event.start.toISOString(),
    enddt: end.toISOString(),
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function downloadIcs(event: CalendarEvent, filename = "wedding-invitation.ics") {
  const { start, end } = calendarRange(event);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//Invitation//IT",
    "BEGIN:VEVENT",
    `UID:${start}-wedding@invitation`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}