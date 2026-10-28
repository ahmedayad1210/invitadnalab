// Pure helpers behind the booking form and locale routing. Node strips the
// TypeScript types on import, so these run with no dependencies:
//   npm test   (node --test test/*.test.mjs)
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatIraqiPhonePlus964, isIraqiWhatsAppMobile } from "../lib/phone.ts";
import { formatCurrency, localeHref, switchLocalePath } from "../lib/i18n.ts";

test("phone input is formatted to +964 while typing", () => {
  assert.equal(formatIraqiPhonePlus964("07701234567"), "+9647701234567");
  assert.equal(formatIraqiPhonePlus964("٠٧٧٠١٢٣٤٥٦٧"), "+9647701234567");
  assert.equal(formatIraqiPhonePlus964("00964 770 123 4567"), "+9647701234567");
  assert.equal(formatIraqiPhonePlus964("+964964770123"), "+964770123");
  assert.equal(formatIraqiPhonePlus964("0770"), "+964770");
  assert.equal(formatIraqiPhonePlus964(""), "");
});

test("only a complete Iraqi mobile passes validation", () => {
  assert.equal(isIraqiWhatsAppMobile("+9647701234567"), true);
  assert.equal(isIraqiWhatsAppMobile("07701234567"), true);
  assert.equal(isIraqiWhatsAppMobile("0770123456"), false);
  assert.equal(isIraqiWhatsAppMobile("+96417123456"), false);
  assert.equal(isIraqiWhatsAppMobile(""), false);
});

test("in-site links keep the visitor's locale", () => {
  assert.equal(localeHref("/", "ar"), "/ar");
  assert.equal(localeHref("/#plans", "en"), "/en#plans");
  assert.equal(localeHref("/book", "ar"), "/ar/book");
  assert.equal(localeHref("#faq", "ar"), "#faq");
  assert.equal(localeHref("https://wa.me/1", "en"), "https://wa.me/1");
  assert.equal(switchLocalePath("/ar/health", "en"), "/en/health");
  assert.equal(switchLocalePath("/en", "ar"), "/ar");
});

test("prices read naturally in both languages", () => {
  assert.equal(formatCurrency(200_000, "en"), "IQD 200,000");
  assert.match(formatCurrency(200_000, "ar"), /٢٠٠٬٠٠٠ د\.ع\./);
});
