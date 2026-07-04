/**
 * Format a raw ISO-ish date string (e.g. "2025-05-09") into a human-friendly
 * date (e.g. "May 9, 2025"). Parsed as UTC so a date-only string doesn't shift
 * across timezones. Returns the original string if it can't be parsed.
 */
export function formatDate(raw: string): string {
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
