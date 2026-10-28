"use client";

import { useState } from "react";
import { invitaWhatsappUrl } from "@/lib/reports";
import {
  formatIraqiPhonePlus964,
  isIraqiWhatsAppMobile,
} from "@/lib/phone";
import { CheckIcon, WhatsAppGlyph } from "@/components/dna-icons";

export type BookSwabCopy = {
  name: string;
  nameError: string;
  phone: string;
  phoneHint: string;
  phoneError: string;
  area: string;
  areaPlaceholder: string;
  areaError: string;
  test: string;
  time: string;
  times: { value: string; label: string }[];
  consent: string;
  consentError: string;
  submit: string;
  successTitle: string;
  successBody: string;
  reopen: string;
  another: string;
  /** Message template — `{name}`, `{phone}`, `{area}`, `{test}`, `{time}` are replaced. */
  message: string;
};

type Errors = Partial<Record<"name" | "phone" | "area" | "consent", string>>;

/**
 * Home-swab booking — Invita specialists take the cheek swab at the customer's
 * home and ship it to the lab partner (24Genetics). Hands off to Invita's
 * WhatsApp line so the team confirms the visit in-thread.
 */
export function BookSwabForm({
  copy,
  tests,
  defaultTest,
}: {
  copy: BookSwabCopy;
  tests: { value: string; label: string }[];
  defaultTest: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [test, setTest] = useState(defaultTest);
  const [time, setTime] = useState(copy.times[0]?.value ?? "");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const validate = (): Errors => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = copy.nameError;
    if (!isIraqiWhatsAppMobile(phone)) next.phone = copy.phoneError;
    if (area.trim().length < 2) next.area = copy.areaError;
    if (!consent) next.consent = copy.consentError;
    return next;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    const testLabel = tests.find((t) => t.value === test)?.label ?? test;
    const timeLabel = copy.times.find((t) => t.value === time)?.label ?? time;
    const url = invitaWhatsappUrl(
      copy.message
        .replace("{name}", name.trim())
        .replace("{phone}", phone)
        .replace("{area}", area.trim())
        .replace("{test}", testLabel)
        .replace("{time}", timeLabel),
    );
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (sentUrl) {
    return (
      <div className="rounded-3xl bg-[var(--iv-cream)] p-6 ring-1 ring-[var(--iv-line)] sm:p-8" role="status">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--iv-navy)] text-[var(--iv-gold)]">
            <CheckIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-semibold">{copy.successTitle}</p>
            <p className="mt-1 text-sm text-[var(--iv-muted)]">{copy.successBody}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--iv-navy)] px-5 text-sm font-semibold text-[var(--iv-cream)] hover:bg-[var(--iv-night)]"
          >
            <WhatsAppGlyph />
            {copy.reopen}
          </a>
          <button
            type="button"
            onClick={() => {
              setSentUrl(null);
              setName("");
              setConsent(false);
            }}
            className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold ring-1 ring-[var(--iv-line)] hover:bg-[var(--iv-paper)]"
          >
            {copy.another}
          </button>
        </div>
      </div>
    );
  }

  const field =
    "mt-2 block w-full rounded-2xl border border-[var(--iv-line)] bg-white px-4 py-3.5 text-base text-[var(--iv-navy)] outline-none transition placeholder:text-[var(--iv-muted)]/60 focus:border-[var(--iv-gold)] focus:ring-4 focus:ring-[rgba(217,179,68,0.3)]";
  const label = "text-sm font-semibold";
  const errorText = "mt-1.5 text-xs font-medium text-[#b42318]";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="dna-name" className={label}>
          {copy.name}
        </label>
        <input
          id="dna-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          className={field}
        />
        {errors.name ? <p className={errorText}>{errors.name}</p> : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="dna-phone" className={label}>
            {copy.phone}
          </label>
          <input
            id="dna-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(formatIraqiPhonePlus964(e.target.value))}
            autoComplete="tel"
            placeholder="+9647XXXXXXXXX"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="dna-phone-hint"
            className={field}
          />
          <p id="dna-phone-hint" className="mt-1.5 text-xs text-[var(--iv-muted)]">
            {copy.phoneHint}
          </p>
          {errors.phone ? <p className={errorText}>{errors.phone}</p> : null}
        </div>
        <div>
          <label htmlFor="dna-area" className={label}>
            {copy.area}
          </label>
          <input
            id="dna-area"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            autoComplete="address-level2"
            placeholder={copy.areaPlaceholder}
            aria-invalid={Boolean(errors.area)}
            className={field}
          />
          {errors.area ? <p className={errorText}>{errors.area}</p> : null}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="dna-test" className={label}>
            {copy.test}
          </label>
          <select
            id="dna-test"
            name="test"
            value={test}
            onChange={(e) => setTest(e.target.value)}
            className={field}
          >
            {tests.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dna-time" className={label}>
            {copy.time}
          </label>
          <select
            id="dna-time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={field}
          >
            {copy.times.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-start gap-3 rounded-2xl bg-[var(--iv-cream)] p-4 text-sm leading-relaxed">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--iv-navy)]"
          />
          <span>{copy.consent}</span>
        </label>
        {errors.consent ? <p className={errorText}>{errors.consent}</p> : null}
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--iv-navy)] px-8 py-4 text-sm font-semibold text-[var(--iv-cream)] shadow-[var(--iv-glow)] transition hover:bg-[var(--iv-night)] sm:w-auto"
      >
        <WhatsAppGlyph />
        {copy.submit}
      </button>
    </form>
  );
}
