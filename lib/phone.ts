/** Iraqi mobile helpers for the booking form. Pure — safe in client code. */

const IRAQ_CC = "964";

/** Arabic-Indic and Eastern Arabic-Indic digits → ASCII digits. */
export function toAsciiPhoneDigits(input: string): string {
  return String(input || "")
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

/** Digits with the Iraq country code forced on (`964…`); empty when there are none. */
function toIraqDigits(input: string): string {
  let digits = toAsciiPhoneDigits(String(input || "")).replace(/[^\d]/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (!digits.startsWith(IRAQ_CC)) {
    digits = digits.startsWith("0") ? `${IRAQ_CC}${digits.slice(1)}` : `${IRAQ_CC}${digits}`;
  }
  while (digits.startsWith(`${IRAQ_CC}${IRAQ_CC}`)) digits = digits.slice(IRAQ_CC.length);
  // Cap at a full Iraqi mobile: 964 + 10 national digits.
  if (digits.length > 13) digits = digits.slice(0, 13);
  return digits;
}

/** True for a complete Iraqi mobile, e.g. `07701234567` or `+9647701234567`. */
export function isIraqiWhatsAppMobile(input: string): boolean {
  return /^9647\d{9}$/.test(toIraqDigits(input));
}

/**
 * Formats input as `+964…` while the visitor types: `0770…` → `+964770…`.
 * Empty input stays empty.
 */
export function formatIraqiPhonePlus964(input: string): string {
  const digits = toIraqDigits(input);
  return digits ? `+${digits}` : "";
}
