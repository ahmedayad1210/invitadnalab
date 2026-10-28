"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { localeHref, toLocale } from "@/lib/i18n";

/**
 * `next/link` that keeps the visitor in their language: in-site paths are
 * written without a locale (`/book`, `/#plans`) and prefixed here.
 */
export function Link({ href, ...props }: Omit<ComponentProps<typeof NextLink>, "href"> & { href: string }) {
  const params = useParams<{ locale?: string }>();
  return <NextLink href={localeHref(href, toLocale(params?.locale ?? ""))} {...props} />;
}
