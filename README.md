# Actually Human™

Marketing site for a (satirical, deadpan) human-in-the-loop review service:
*carbon-based quality assurance* for AI-generated text, video, code, design and ideas.

Branding is a **1990s American late-night cable infomercial** — the page is styled as a
paid-programming broadcast on the Human Broadcasting Network, ch. 07, originally aired 2:47 AM.

Live at **https://kikontroll.no**.

## Structure

    index.html          the entire page — no build step, no framework, no dependencies
    api/waitlist.js     Vercel serverless function; emails waiting-list signups
    vercel.json         cleanUrls

Everything on the page is inline except Google Fonts. The only runtime dependency is
the waiting-list endpoint, which uses `fetch` (built into the Vercel Node runtime) —
there is no `package.json` and nothing to install.

## Design system

Single committed visual world: a CRT broadcast. There is deliberately **no light theme** — a
1994 television screen is one look, so every colour is painted explicitly and the page holds
on any host background rather than inverting.

| Token | Value | Role |
|---|---|---|
| `--void` | `#150E33` | page ground (deep tube purple) |
| `--void-2` | `#0B0722` | letterbox bars, caption blocks, bevel shadows |
| `--screen` | `#241A5C` | card surface |
| `--white` | `#F6F1E4` | warm broadcast white — primary text |
| `--dim` / `--dim-2` | `#B7ACE4` / `#8175CC` | lavender-biased greys |
| `--pink` | `#FF2E88` | TV-graphics triad — lower thirds, ticker, drop shadows |
| `--cyan` | `#21E8D6` | TV-graphics triad — slates, links, accents |
| `--gold` | `#FFC531` | TV-graphics triad — buttons, prices, verdicts |
| `--ok` / `--warn` / `--crit` | `#3DE07A` / `#FFC531` / `#FF2E88` | severity, separate from decoration |

Type:

- **Bungee** — the show logo, headings, buttons, big numbers (marquee signage)
- **Jost** — body copy (Futura-adjacent, the VHS-box sans)
- **VT323** — CRT terminal: timecodes, channel bugs, closed-caption blocks, fine print

## Broadcast devices

- Fixed **scanline + tube vignette** overlay across the whole page
- **Broadcast header** with a blinking LIVE bug, network name, channel number
- **CSS-drawn CRT set** in the hero, with channel bug, timecode, and a skewed
  **lower third** delivering the verdict
- **Chromatic RGB split** on the show logo + a vertical-hold "tuning in" entrance
- Scrolling **ticker**: OPERATORS ARE STANDING BY ★ ACTUAL HUMANS ★ NOT A CHATBOT
- Skewed **slate bars** as section headers; **starburst** price badges
- **REAL CALLERS · NOT ACTORS** testimonial cards
- A **WE'LL BE RIGHT BACK** interstitial before the call block
- CC badge in the sign-off

## Imagery

All artwork is inline SVG or pure CSS — no external assets, no image files, nothing
fetched at runtime. Everything is drawn flat in the same broadcast-graphics style
using the triad above.

| Piece | Where | Built with |
|---|---|---|
| Memphis confetti tile | hero, offer, interstitial | tiled SVG data-URI, `opacity: 0.17` + radial mask that clears the centre so it never fights body copy |
| CRT snow | inside the hero television | `feTurbulence` data-URI, `mix-blend-mode: screen`, 3-step shuffle animation |
| Segment icons (5) | one per service card | inline SVG — marked-up page + red pen, film strip, terminal, palette, lightbulb struck through |
| Cast portraits (4) | the cast cards | inline SVG, flat geometric heads. Same cream face on all four, differentiated only by hair, colour and accessory (glasses, headphones, beret, cap) — deliberately abstract, no likeness. Every one has the same flat, unimpressed mouth. |
| SMPTE test card | WE'LL BE RIGHT BACK interstitial | CSS hard-stop gradients — 75% bars over the castellation strip, in a mini TV |
| Starburst | behind each price | animated `repeating-conic-gradient` |
| Rotary phone | beside the 1-800 number | inline SVG with ring arcs |
| Broadcast tower | sign-off | inline SVG with signal waves |
| AS SEEN ON BASIC CABLE | offer header | CSS oval badge |

All motion is disabled under `prefers-reduced-motion`.

## Waiting list

The form in the call block POSTs `{ email }` to `/api/waitlist`, which emails the
signup to **contact@promptshields.com** with `reply_to` set to the signup address,
so replying from the inbox reaches the person directly.

Protections: a hidden honeypot field (`company`) that bots fill and humans never see,
server-side email validation, and a 254-character cap.

Responses:

| Case | Status | Body |
|---|---|---|
| Success | 200 | `{"ok":true}` |
| Bad email | 400 | `{"ok":false,"error":"That email doesn't look right."}` |
| Honeypot filled | 200 | `{"ok":true}` — silently dropped |
| No API key set | 503 | `{"ok":false,"error":"Signups are not switched on yet..."}` |
| Non-POST | 405 | `{"ok":false,"error":"Use POST."}` |

### Required setup

The endpoint returns 503 until a Resend API key is configured:

```bash
vercel env add RESEND_API_KEY production
vercel deploy --prod --yes
```

Optional: `RESEND_FROM`. Without it the function falls back to Resend's shared
`onboarding@resend.dev` sender, which works immediately but is more likely to be
filtered as spam. Once a domain is verified in Resend, set it to something like
`Actually Human <hei@promptshields.com>`.

## Running it

Open `index.html` in a browser — the page renders fully, but the waiting-list form
will report "No connection" because `/api/waitlist` only exists when served by Vercel.
For the working endpoint locally, use `vercel dev`.

## Deploying

```bash
vercel deploy --prod --yes
```

DNS for `kikontroll.no` is delegated to Vercel's nameservers (`ns1`/`ns2.vercel-dns.com`),
so records are managed with `vercel dns` rather than at the registrar. The domain has a
null MX — if email is ever needed on it, the MX records go in on the Vercel side.

## Still placeholder

- `1-800-HUMAN-QA` (`tel:+18004862672`) in the call block is not a real number
- Testimonials and cast bios are illustrative — swap for real ones before this goes
  in front of buyers
