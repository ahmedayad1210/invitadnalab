# Invita DNA Lab — invitadna.com

The bilingual (Arabic / English) public website for Invita DNA Lab: the three
test depths (Invita Single, Seven and Genome), the seven reports, how the home
swab works, and a booking form for a home visit.

How Invita works, as the site describes it:

1. An Invita specialist takes a painless cheek swab at the customer's home.
2. Invita ships the sealed sample by DHL cold-chain to its laboratory partner,
   24Genetics, in Madrid.
3. Reports come back in Arabic and English, and Invita's medical team walks the
   customer through them.

## Routes

| Path | Page |
|------|------|
| `/` | redirects to `/ar` (Arabic is the default) |
| `/ar`, `/en` | landing page |
| `/[locale]/[report]` | one page per report: `ancestry`, `health`, `nutrition`, `pharma`, `sports`, `skin`, `personality`, `all-in-one` |
| `/[locale]/book` | home-swab booking |
| `/sitemap.xml`, `/robots.txt` | generated from `lib/reports.ts` |

Every page is prerendered at build time.

## No patient data

The booking form validates the name, Iraqi mobile (auto-formatted to `+964…`),
area and consent, then opens Invita's WhatsApp line with the details filled
in. Nothing is posted to a server, Airtable or the report database. The
sampling team's intake form (invitadna.com) and the report builder
(form.invitadna.com) live in the separate `invitadna` repository.

## Where things live

| What | File |
|------|------|
| Prices, plans, reports, WhatsApp number, Instagram, address | `lib/reports.ts` |
| Images and their alt text | `lib/imagery.ts`, `public/images/` |
| Page copy (EN + AR side by side) | the `COPY` object at the top of each page in `app/[locale]/` |
| Brand colours (official Invita kit) | `app/globals.css` (`.invita` tokens) |
| Header, footer, logo | `components/invita-shell.tsx` |

Prices: `priceIqd: null` shows "Ask for today's price". Invita Seven and Invita
Genome stay that way until their prices are confirmed.

Imagery is Invita's own: the official logo files, Invita's report covers and
posts from Invita's Instagram. None show people. Don't add photos of people or
images, logos or copy from other DNA companies' sites.

## Deploying

Create a Netlify site from this repository (Add new project → Import an
existing project → GitHub → `invitadnalab`). The build command, publish
directory and headers come from `netlify.toml`; nothing needs setting by hand.
Merging to `main` then deploys it.

The site's domain is **invitadna.com** (primary on the Netlify site). Canonical
links, hreflang, the sitemap, robots.txt and share images all use it
(`lib/seo.ts`), including on deploy previews. Set `NEXT_PUBLIC_SITE_URL` only
if the domain changes.

The other Invita DNA addresses live elsewhere and must keep their own Netlify
sites: the sampling team's intake form is at reg.invitadna.com and the report
builder at form.invitadna.com (both in the `invitadna` repository).

Use a new Netlify site for this. The existing `invita-dna-lab` project serves
a separate app (a WhatsApp Flows booking endpoint), and deploying this site
over it would take that endpoint down.

## Checks

```sh
npm install
npm run check   # typecheck, lint, node --test (phone + locale helpers)
npm run build
npm run dev     # http://localhost:3000 → /ar
```
