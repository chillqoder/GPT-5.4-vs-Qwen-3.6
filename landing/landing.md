# Project Brief: Void Studio Landing Page
**Role:** Senior Creative Technologist & Lead Frontend Engineer  
**Objective:** Architect a high-fidelity, cinematic "1:1 Pixel Perfect" landing page for a boutique design studio.  
**Aesthetic Identity:** "Editorial Brutalism" / "Ink & Architecture" — a collision between a European art magazine, a modernist gallery, and a typographer's fever dream.

---

## 1. CORE DESIGN SYSTEM (STRICT)

### Palette
| Element | Color | Hex |
| :--- | :--- | :--- |
| **Primary** | Ink | `#0D0D0D` |
| **Accent** | Acid Yellow | `#E8F227` |
| **Background** | Raw Paper | `#F5F0E8` |
| **Muted** | Ash | `#A8A49C` |
| **Pop** | Vermillion | `#D4341A` |

### Typography
* **Display/Hero:** `Playfair Display` — Massive, ultra-tight tracking, used at 120–200px scale.
* **Interface/Body:** `DM Mono` — All UI labels, counters, metadata, navigation. Cold and precise.
* **Accent/Pull Quotes:** `Fraunces` Italic — For emotional contrast against the brutalism.
* **System Labels:** All-caps, letter-spacing `0.4em`, size `10–11px`. Used as micro-structural anchors.

### Visual Texture
* **Global Grain:** CSS SVG noise filter at `0.04` opacity over all sections — paper feel, never digital smoothness.
* **Border System:** Hairline `1px solid #0D0D0D` borders dominate. No `border-radius` except the cursor trail.
* **Geometry:** Bold full-bleed dividers — thick `6px` horizontal rules between sections as a typographic instrument.

---

## 2. COMPONENT ARCHITECTURE & BEHAVIOR

### A. NAVBAR (The Surgical Strip)
* **Structure:** Full-width, fixed, `56px` height. Left: `VOID®` logotype in DM Mono. Right: nav items + `[ OPEN FOR WORK ]` badge blinking in Acid Yellow.
* **Morphing Logic:**
    * *Top:* Raw Paper background, Ink text.
    * *Scroll:* Transitions to `#0D0D0D` with `1px` Acid Yellow bottom border. All text inverts.
* **Hover States:** Nav links use a vertical wipe-up fill in Acid Yellow (`::before` pseudo-element, `scaleY` transform).

### B. HERO SECTION (The Interrupt)
* **Visuals:** `100dvh` height. Right 40% is a single full-bleed image panel: [Black and white architecture](https://images.unsplash.com/photo-1486325212027-8081e485255e) — desaturated, `mix-blend-mode: multiply`.
* **Layout:** Left 60% typographic block, bottom-aligned.
* **Typography:** Line 1: `[ STUDIO — 2019 ]` in DM Mono `11px`. Lines 2–3: `"We build things that"` in Playfair Display `160px`. Line 4: `"cannot be ignored."` — Playfair Display Italic, **Vermillion**.
* **Animation:** GSAP staggered line-by-line mask reveal (`clipPath: inset(0 0 100% 0)` → `inset(0 0 0% 0)`). Duration `1.2s`, stagger `0.15s`.

### C. TICKER (The Pulse)
* **Full-width infinite marquee:** Alternating `VOID STUDIO` and `✦` separators in Acid Yellow on Ink background. Smooth CSS `translateX` loop.
* **Speed:** `30s` linear infinite. Pauses on hover.

### D. WORK GRID (The Archive)
* **Layout:** Asymmetric 12-column CSS grid. Items break the rhythm — some span 7 columns, some 5, next row reverses.
* **Card Idle State:** Image in grayscale, project index in DM Mono top-left (`01`, `02`...), title overlay hidden.
* **Card Hover State:** Color floods in over `0.6s` (`filter: grayscale(0)`), Vermillion underline animates under project name, year fades in top-right.
* **Captions:** All metadata in DM Mono `11px` — format: `BRAND IDENTITY — 2024`.

### E. PHILOSOPHY (The Statement Wall)
* **Visuals:** Full-bleed Ink section. Vertical rhythm via `6px` horizontal rule system.
* **Content:** One massive pull quote in Fraunces Italic, white, `clamp(48px, 8vw, 120px)`: *"Design is not decoration. It is the architecture of attention."*
* **Interaction:** GSAP SplitText word-by-word reveal — `y: 60px` → `y: 0`, stagger `0.04s` per word, triggered on scroll entry.
* **Side Column:** Right-aligned discipline list in DM Mono — `BRANDING / DIGITAL / SPATIAL / MOTION` — each line revealing on `200ms` delay.

### F. PROCESS (Numbered Accordion Archive)
* **Structure:** 4 expandable rows on Ink background. Numbered `01–04` in Playfair Display at `80px`.
* **Closed State:** Single-line title + year range in DM Mono.
* **Open State:** Expands via `max-height` spring animation into a 2-column layout: description in Fraunces Italic + small image.
* **Active Row:** Left border switches from `1px Ash` to `4px Acid Yellow`.
* **Titles:** `DISCOVERY`, `STRATEGY`, `CRAFT`, `LAUNCH`.

### G. CLIENTS (The Proof Strip)
* **Structure:** Full-width horizontal scroll strip on Raw Paper. Section label: `[ TRUSTED BY ]` — `10px` DM Mono, top-left.
* **Logos:** 8 client wordmarks rendered in DM Mono text — `#A8A49C` by default.
* **Hover:** Individual logo snaps to Ink. Subtle `scale(1.05)` transform.

### H. CONTACT CTA (The Closer)
* **Layout:** Full-screen. Left: massive `"Let's talk."` in Playfair Display `clamp(80px, 12vw, 180px)`. Right: minimal form — `border-bottom` inputs only, no box, no shadow.
* **Submit Button:** Full-width, Acid Yellow background, Ink text, DM Mono. Hover inverts: Ink background, Acid Yellow text. Transition `0.4s`.
* **Background Element:** Single enormous `°` in Playfair Display at `600px`, opacity `0.04`, absolutely positioned, slowly rotating at `0.5rpm`.

### I. FOOTER (The Colophon)
* **Structure:** Ink background. Three columns: `VOID®` logotype + tagline / Navigation / `[ SYSTEM ONLINE ]` with pulsing Acid Yellow dot.
* **Bottom Strip:** `© 2025 VOID STUDIO — ALL RIGHTS RESERVED — MADE WITH OBSESSION` in `10px` DM Mono, spaced full width.

---

## 3. TECHNICAL REQUIREMENTS

* **Stack:** React 19, Tailwind CSS, GSAP 3 (ScrollTrigger + SplitText), Lucide React.
* **Lifecycle:** Use `gsap.context()` inside `useEffect` for memory management.
* **Custom Cursor:** `24px` Acid Yellow circle + trailing ghost at `0.15s` lag. Expands to `64px` on project card hover. Smooth `lerp` on all positions.
* **Micro-Interactions:** Magnetic pull on CTA button (`mousemove` offset `±8px`). `overflow-hidden` sliding background transitions on all buttons.
* **Scroll Philosophy:** Every section uses `ScrollTrigger` with `start: "top 80%"`. No animation fires before viewport entry.
* **Code Quality:** Zero placeholder content. All grid items populated. Real Unsplash URLs only. Form fields functional in appearance with validation states.

> **Execution Directive:** Do not build a portfolio site. Build a statement of intent. Every element must feel like a deliberate editorial decision. The grid is not a layout — it is an argument. If it looks like a template, start over.
