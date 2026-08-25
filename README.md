# Actually Human™

Marketing site for a (satirical, deadpan) human-in-the-loop review service:
*carbon-based quality assurance* for AI-generated text, video, code, design and ideas.

Branding is a **1990s American late-night cable infomercial** — the page is styled as a
paid-programming broadcast on the Human Broadcasting Network, ch. 07, originally aired 2:47 AM.

## Structure

Single self-contained page — `index.html`. No build step, no dependencies, no framework.
Everything is inline except Google Fonts.

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

All motion is disabled under `prefers-reduced-motion`.

## Running it

Open `index.html` in a browser. That's it.

## Deploying

Static — drop it on anything:

```bash
npx serve .
```

GitHub Pages: push to `main`, enable Pages on the repo root.

## Placeholders to replace before launch

- `1-800-HUMAN-QA` (`tel:+18004862672`) in the call block
- `inspect@actuallyhuman.example` / `hello@actuallyhuman.example`
- Testimonials and cast bios are illustrative — swap for real ones before this goes
  in front of buyers
