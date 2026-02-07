import { useState, useEffect } from "react";
import { format, formatDuration, intervalToDuration } from "date-fns";

/**
 * Returns a Date object that's only available on the client side.
 * Returns null during SSR to avoid hydration mismatches.
 */
export function useClientDate(dateInput?: string | Date): Date | null {
  const [clientDate, setClientDate] = useState<Date | null>(null);

  useEffect(() => {
    setClientDate(dateInput ? new Date(dateInput) : new Date());
  }, [dateInput]);

  return clientDate;
}

// Parse dates as local dates to avoid timezone issues
const parseLocalDate = (dateStr: string): Date => {
  const parts = dateStr.split("-");
  if (parts.length === 1) {
    // Just year: "2021"
    return new Date(parseInt(parts[0]), 0, 1);
  } else if (parts.length === 2) {
    // Year-month: "2021-08"
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
  } else if (parts.length === 3) {
    // Full date: "2021-08-15"
    return new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2]),
    );
  }
  // Fallback for other formats
  return new Date(dateStr);
};

/**
 * Formats a date range string with optional duration.
 * Handles "now" on client-side only to avoid hydration mismatches.
 */
export function useDateString({
  from,
  to,
}: {
  from: string;
  to: string | "now";
}): string {
  const clientNow = useClientDate();

  const fromDate = parseLocalDate(from);
  const toDate = to === "now" ? clientNow : parseLocalDate(to);

  const fromFormatted = format(fromDate, "MMM yyyy");
  const toFormatted = to === "now" ? "Present" : format(toDate!, "MMM yyyy");

  // If from and to are the same, just show the single date
  if (fromFormatted === toFormatted) {
    return fromFormatted;
  }

  // Only show duration when we have a valid toDate (client-side for "now")
  if (!toDate) {
    return `${fromFormatted} to ${toFormatted}`;
  }

  const duration = intervalToDuration({ start: fromDate, end: toDate });
  const durationStr = formatDuration(duration, { format: ["years", "months"] });

  return `${fromFormatted} to ${toFormatted} (${durationStr})`;
}
