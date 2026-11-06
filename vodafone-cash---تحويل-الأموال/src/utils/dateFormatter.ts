/**
 * Format date and time for Vodafone Cash transactions in Arabic.
 * Produces authentic format with day, month name in Arabic, year, and 12-hour time with minutes and Arabic ص/م.
 * Example: "27 أكتوبر 2026 02:45 م"
 */
export function formatVodafoneCashDateTime(date: Date = new Date()): string {
  const arabicMonths = [
    'يناير',
    'فبراير',
    'مارس',
    'إبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];

  const day = date.getDate();
  const month = arabicMonths[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPm = hours >= 12;
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const paddedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const period = isPm ? 'م' : 'ص';

  return `${day} ${month} ${year} ${paddedHours}:${paddedMinutes} ${period}`;
}

/**
 * Generate an authentic 12-digit Vodafone Cash reference number starting with 100...
 */
export function generateVodafoneCashRef(): string {
  const randomSuffix = Math.floor(100000000 + Math.random() * 900000000);
  return `100${randomSuffix}`;
}

/**
 * Converts numbers or strings with digits - returns standard English digits (0-9) as requested
 */
export function toArabicDigits(val: number | string): string {
  return String(val);
}

