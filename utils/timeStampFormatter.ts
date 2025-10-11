import { format, isToday, isYesterday, isThisWeek } from "date-fns";

export class TimestampFormatter {
  /**
   * Formats a timestamp for chat previews like WhatsApp.
   * - Today: shows "10:45 AM"
   * - Yesterday: shows "Yesterday"
   * - Within this week: shows weekday "Mon", "Tue"
   * - Older: shows date "10/06/2025"
   * @param dateString ISO string or Date object
   */
  static format(dateString: string | Date): string {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;

    if (isToday(date)) {
      return format(date, "h:mm a"); // e.g., 10:45 AM
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisWeek(date)) {
      return format(date, "EEE"); // Mon, Tue
    } else {
      return format(date, "MM/dd/yyyy"); // 10/06/2025
    }
  }

  /**
   * Formats a timestamp for full message view (shows date + time)
   * Example: "Oct 10, 2025, 10:45 AM"
   */
  static formatFull(dateString: string | Date): string {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return format(date, "MMM d, yyyy, h:mm a");
  }
}
