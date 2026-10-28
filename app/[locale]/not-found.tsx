import { Link } from "@/components/locale-link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--iv-gold-ink)]">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
        <span lang="en">Page not found</span> · <span lang="ar">الصفحة غير موجودة</span>
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-[var(--iv-navy)] px-7 text-sm font-semibold text-[var(--iv-cream)] hover:bg-[var(--iv-night)]"
      >
        Invita DNA Lab
      </Link>
    </div>
  );
}
