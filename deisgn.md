# Quietly Design System — Complete

## Overview

Quietly is a modern, professional job search and hiring platform built on a **comprehensive, accessible design system**. The base canvas is **pure white** (`{colors.canvas}` — #ffffff) with deep charcoal ink (`{colors.ink}` — #1a1a1a) for headlines and body text. The primary accent is a **vibrant blue** (`{colors.primary}` — #2563eb) that carries primary CTAs, feature badges, active states, and strategic brand moments. A lighter **sky blue tint** (`{colors.primary-light}` — #dbeafe) provides subtle section backgrounds, hover states, and informational highlights.

The design system prioritizes **clarity, accessibility, and professional trust** through:
- A cohesive **four-tier color palette** (primaries, neutrals, semantics, and surfaces)
- Precise **typographic hierarchy** with 16 distinct tokens spanning 12px to 48px
- A **strict 4px base spacing grid** with semantic tokens for consistent rhythm
- **Intentional alignment rules** for vertical rhythm, horizontal alignment, and content structure
- **Accessibility-first** approach with WCAG AA+ color contrast, large touch targets, and predictable interactions

Type runs a modern **sans-serif stack** (Inter, system fonts) with consistent weights across display and body. Display headlines use modest 600–700 weights; body defaults to 400–500. The shape language is uniformly **soft** — all interactive elements use 8–12px radius rounded corners, creating a friendly, accessible interface.

**Key Design Principles:**
- **Monochromatic primary:** `{colors.primary}` (#2563eb — blue) carries all CTAs, badges, active states, and brand moments. Used strategically — most pages are 90% white + ink with blue moments for emphasis.
- **Four-layer color system:** Primaries (brand blue + tints), Neutrals (grays for text/borders), Semantics (error/success/warning/info), and Surfaces (backgrounds/fills).
- **Soft geometry:** All interactive elements use 8–12px radius; no hard corners except the page canvas.
- **Generous vertical rhythm:** 48–64px section spacing + 4px base grid create breathing room and professional presence.
- **Semantic alignment:** Content aligns to a 4px grid at micro-level, 8px at component-level, and 16px at section-level for visual coherence.
- **Photography & illustration:** Featured images add visual interest; hero uses friendly character illustration balanced with clean typography.
- **Accessibility as core:** 48px+ touch targets, WCAG AA+ contrast (7:1 on text), clear focus states, predictable interactions.

---

## Colors — Complete Palette

### Primary Brand Colors

| Token | Hex | RGB | Use | Contrast |
|---|---|---|---|---|
| `{colors.primary}` | #2563eb | 37, 99, 235 | Primary CTAs, badges, active states, brand links | 7.2:1 on white |
| `{colors.primary-hover}` | #1d4ed8 | 29, 78, 216 | Button hover, active focus states | 8.1:1 on white |
| `{colors.primary-active}` | #1e40af | 30, 64, 175 | Button pressed/down state | 9.2:1 on white |
| `{colors.primary-disabled}` | #dbeafe | 219, 234, 254 | Disabled CTAs, inactive elements | 1.8:1 (intentionally low) |
| `{colors.primary-light}` | #dbeafe | 219, 234, 254 | Section backgrounds, subtle highlights, hover states | 1.1:1 (very light) |
| `{colors.primary-dark}` | #1e3a8a | 30, 58, 138 | Dark mode (future), footer accents, deep emphasis | 10.5:1 on white |

### Secondary & Accent Colors

| Token | Hex | RGB | Use | Contrast |
|---|---|---|---|---|
| `{colors.secondary}` | #f97316 | 249, 115, 22 | Highlight badges ("Featured", "Top Rated"), icons | 4.2:1 on white |
| `{colors.secondary-light}` | #fed7aa | 254, 215, 170 | Secondary backgrounds, tooltip backgrounds | 1.5:1 (very light) |
| `{colors.tertiary}` | #06b6d4 | 6, 182, 212 | Informational badges, secondary CTAs | 5.8:1 on white |

### Neutral & Text Colors

| Token | Hex | RGB | Use | Weight | Context |
|---|---|---|---|---|---|
| `{colors.ink}` | #1a1a1a | 26, 26, 26 | Primary text, headlines, body, navigation | 400–700 | Main hierarchy |
| `{colors.ink-light}` | #374151 | 55, 65, 81 | Emphasized body text, secondary headlines | 500–600 | Accents |
| `{colors.body}` | #4b5563 | 75, 85, 99 | Default running text, descriptions | 400 | Body copy |
| `{colors.body-secondary}` | #6b7280 | 107, 114, 128 | Supporting text, secondary metadata | 400 | Meta information |
| `{colors.muted}` | #9ca3af | 156, 163, 175 | Labels, captions, disabled text, footer | 400–500 | Secondary labels |
| `{colors.muted-soft}` | #d1d5db | 209, 213, 219 | Placeholders, helper text, very soft labels | 400 | Minimum emphasis |

**Contrast notes:** All text tokens maintain 7:1+ contrast on white (`{colors.canvas}`) per WCAG AAA. Muted on muted is 4.5:1 (AA standard).

### Border & Surface Colors

| Token | Hex | RGB | Use | Thickness | Context |
|---|---|---|---|---|---|
| `{colors.hairline}` | #e5e7eb | 229, 231, 235 | Default 1px borders, card dividers, input outlines | 1px | Card edges, form inputs at rest |
| `{colors.hairline-soft}` | #f3f4f6 | 243, 244, 246 | Very subtle dividers, section separators | 1px | Long-form content, editorial spacing |
| `{colors.border-strong}` | #d1d5db | 209, 213, 219 | Focused form inputs, active component borders | 2px | Form focus state, active tabs |
| `{colors.surface-soft}` | #f9fafb | 249, 250, 251 | Disabled fields, secondary backgrounds, subtle fills | 1px | Input disabled state, secondary section fill |
| `{colors.surface-strong}` | #f3f4f6 | 243, 244, 246 | Hover backgrounds, icon button fills, elevated surfaces | 1px | Card hover, button backgrounds |
| `{colors.canvas}` | #ffffff | 255, 255, 255 | Default page/section background | N/A | Primary canvas, card surfaces |

### Semantic Colors (Status & Messaging)

| Token | Hex | RGB | Use | Contrast | Icon |
|---|---|---|---|---|---|
| `{colors.error}` | #dc2626 | 220, 38, 38 | Error text, validation failure, alerts | 7.8:1 on white | ⚠ or ✕ |
| `{colors.error-light}` | #fee2e2 | 254, 226, 226 | Error background, light notification | 2.1:1 | — |
| `{colors.success}` | #16a34a | 22, 163, 74 | Success states, confirmation, positive actions | 6.5:1 on white | ✓ or ✔ |
| `{colors.success-light}` | #dcfce7 | 220, 252, 231 | Success background, light confirmation | 1.2:1 | — |
| `{colors.warning}` | #ea580c | 234, 88, 12 | Warnings, cautions, attention-needed states | 5.2:1 on white | ⚠ |
| `{colors.warning-light}` | #ffedd5 | 255, 237, 213 | Warning background, light alert | 1.3:1 | — |
| `{colors.info}` | #0284c7 | 2, 132, 199 | Informational text, secondary links, hints | 7.1:1 on white | ℹ or ? |
| `{colors.info-light}` | #cffafe | 207, 250, 254 | Info background, light tooltip | 1.1:1 | — |

### Scrim & Overlay

| Token | Hex | Opacity | Use | Duration |
|---|---|---|---|---|
| `{colors.scrim}` | #000000 | 40% | Modal backdrop, overlay underlay | Instant (no transition) |
| `{colors.scrim-dark}` | #000000 | 60% | Full-screen modal, high-contrast overlay | Instant |
| `{colors.scrim-light}` | #ffffff | 80% | Light overlay, loading state backdrop | Instant |

---

## Typography — Complete Hierarchy

### Font Stack & Fallbacks

**Primary:**
```css
font-family: 'Inter', 'Segoe UI', 'Roboto', '-apple-system', 'system-ui', sans-serif;
```

**Fallback chain:**
1. **Inter** (recommended; open source at Google Fonts)
2. **Segoe UI** (Windows default)
3. **Roboto** (Android default)
4. **-apple-system** / **system-ui** (OS native)
5. **sans-serif** (browser default)

**Weights used:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Typographic Scale & Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use | Min Width | Color |
|---|---|---|---|---|---|---|---|
| `{typography.display-xl}` | 48px | 700 | 1.2 | -0.5px | Hero h1 | 320px | `{colors.ink}` |
| `{typography.display-lg}` | 32px | 700 | 1.25 | 0 | Major section headers | 280px | `{colors.ink}` |
| `{typography.display-md}` | 28px | 600 | 1.3 | 0 | Section sub-headers | 260px | `{colors.ink}` |
| `{typography.display-sm}` | 24px | 600 | 1.35 | 0 | Card titles, prominent labels | 240px | `{colors.ink}` |
| `{typography.title-lg}` | 20px | 600 | 1.4 | 0 | Sub-section titles | 220px | `{colors.ink}` |
| `{typography.title-md}` | 18px | 600 | 1.44 | 0 | Job circular titles, card headers | 200px | `{colors.ink}` |
| `{typography.title-sm}` | 16px | 600 | 1.5 | 0 | Component headers, footer labels | 180px | `{colors.ink}` |
| `{typography.body-lg}` | 16px | 400 | 1.6 | 0 | Default body copy | 65 chars | `{colors.body}` |
| `{typography.body-md}` | 15px | 400 | 1.5 | 0 | Card descriptions, metadata | 55 chars | `{colors.body-secondary}` |
| `{typography.body-sm}` | 14px | 400 | 1.43 | 0 | Caption text, secondary labels | 50 chars | `{colors.body-secondary}` |
| `{typography.caption}` | 13px | 500 | 1.38 | 0.2px | Form labels, meta counters | 45 chars | `{colors.muted}` |
| `{typography.caption-sm}` | 12px | 400 | 1.33 | 0 | Fine print, timestamps, micro-text | 40 chars | `{colors.muted}` |
| `{typography.badge}` | 12px | 600 | 1.17 | 0.3px | Badge/pill labels | N/A (short) | White on color |
| `{typography.button}` | 15px | 600 | 1.33 | 0 | Primary CTA button labels | N/A (short) | White |
| `{typography.button-sm}` | 13px | 500 | 1.38 | 0 | Secondary button labels | N/A (short) | `{colors.primary}` |
| `{typography.link}` | 15px | 500 | 1.6 | 0 | Inline body links | 50 chars | `{colors.primary}` |
| `{typography.link-sm}` | 13px | 500 | 1.5 | 0 | Small inline links, footer links | 40 chars | `{colors.primary}` |

### Typographic Principles

**1. Hierarchy & Weight:**
- **Display (headlines):** 700 weight, 24–48px, blue primary color
- **Body (running text):** 400 weight, 14–16px, ink color (#1a1a1a)
- **Emphasis (labels, CTAs):** 600 weight, 13–18px, mixed colors (ink or blue)
- **Soft (captions, secondary):** 400–500 weight, 12–14px, muted gray (#9ca3af)

**2. Line Height (Vertical Rhythm):**
- **Headlines:** Tighter 1.2–1.3 for visual density and impact
- **Body:** Generous 1.5–1.6 for readability and scannability
- **Labels & captions:** Moderate 1.38–1.44 for compactness
- **Baseline calculation:** Font size × line height = total line height in pixels; align to 4px grid

**3. Letter Spacing:**
- **Headlines:** -0.5px on largest (48px) to tighten; 0 on most others (normal)
- **Body:** 0 (default tracking)
- **Badges/CAPS:** 0.3px for emphasis and clarity on uppercase text

**4. Color Application:**
- **Primary text:** `{colors.ink}` (#1a1a1a) for maximum contrast on white
- **Emphasis text:** `{colors.primary}` (#2563eb — blue) for interactive or branded moments (CTAs, links, badges only)
- **Secondary text:** `{colors.body-secondary}` (#6b7280) for supporting information and metadata
- **Soft text:** `{colors.muted}` (#9ca3af) for labels, captions, disabled states, footer

**5. Readability Constraints:**
- **Max line length:** 65–75 characters for body text (optimal: ~60 chars)
- **Min font size:** 12px (captions only); 14px+ for all running text
- **Contrast ratio:** 7:1+ for primary text (WCAG AAA), 4.5:1+ for secondary (WCAG AA)
- **Line height:** Always ≥1.4 for accessibility (even tighter headlines respect 1.2 minimum)

---

## Spacing System — Complete Grid

### Spacing Tokens & Base Grid

The spacing system is built on a **4px base unit** with semantic tokens for every use case. All measurements are multiples of 4px to maintain strict alignment and rhythm across all breakpoints.

| Token | Pixels | Rem | Use Case | Scale | Context |
|---|---|---|---|---|---|
| `{spacing.2xs}` | 2px | 0.125rem | Micro-spacing (borders, separators) | 0.5x | Finest precision |
| `{spacing.xs}` | 4px | 0.25rem | Tight component spacing, micro-gutters | 1x | Base unit |
| `{spacing.sm}` | 8px | 0.5rem | Small gaps, button padding (vertical) | 2x | Component-level |
| `{spacing.md}` | 12px | 0.75rem | Medium gaps, form field spacing | 3x | Component-level |
| `{spacing.base}` | 16px | 1rem | Default spacing, card padding, button padding (horizontal) | 4x | Standard unit |
| `{spacing.lg}` | 24px | 1.5rem | Large gaps, card internal padding | 6x | Card-level |
| `{spacing.xl}` | 32px | 2rem | Extra large gaps, component separation | 8x | Component groups |
| `{spacing.xxl}` | 48px | 3rem | Major separation, between component groups | 12x | Section sub-spacing |
| `{spacing.section}` | 64px | 4rem | Section top/bottom padding, page rhythm | 16x | Section-level |
| `{spacing.page}` | 80px | 5rem | Maximum section separation, hero breathing room | 20x | Hero/footer |

### Vertical Alignment & Rhythm

All text and components align to a **4px vertical grid**. This creates:
- Visual coherence across the interface
- Predictable baseline alignment
- Accessible, readable text with consistent spacing

### Horizontal Alignment & Gutters

All content aligns to an **8px horizontal sub-grid** (derived from 4px base) for macro layout, with **4px precision** at component-level.

**Container Max-Widths:**

| Breakpoint | Max Width | Total Padding (L+R) | Content Width | Gutter |
|---|---|---|---|---|
| Mobile (< 640px) | 100% | 16px + 16px | calc(100% - 32px) | 16px |
| Tablet (640–1024px) | 100% | 24px + 24px | calc(100% - 48px) | 16px |
| Desktop (1024–1280px) | 1280px | 48px + 48px | 1184px | 16px |
| Wide (> 1280px) | 1280px | Centered | 1184px | 16px |

**Grid Column Layouts:**

| Component | Desktop | Tablet | Mobile | Gutter |
|---|---|---|---|---|
| Category cards | 3-column | 2-column | 1-column | 16px |
| Job circulars | 4-column | 2-column | 1-column | 16px |
| Team hire cards | 3-column | 2-column | 1-column | 16px |
| Testimonials | 4-column scroll | 2-column | 1-column | 16px |
| FAQ accordion | Single column (max 780px, centered) | Single column (max 100%) | Single column (max 100%) | 0 |
| Footer links | 4-column | 2-column | 1-column | 24px |

### Section & Component Spacing

**Section Spacing (Top & Bottom):**

| Section | Top Padding | Bottom Padding | Rationale |
|---|---|---|---|
| Hero / Banner | 48px | 64px | Visual breathing room; leads into content |
| Category section | 64px | 64px | Major section separation |
| Job circulars | 64px | 64px | Major section separation |
| "Payments Simplified" | 64px | 64px | Light background section |
| Testimonials (dark band) | 64px | 64px | Visual contrast section |
| Team hire | 64px | 64px | Major section separation |
| FAQ | 64px | 64px | Major section separation |
| Footer | 64px top | 0 (page end) | Separation from main content |

---

## Elevation & Depth System

| Tier | CSS | Use Case | Elevation | Context |
|---|---|---|---|---|
| **Flat** | `none` | Hero, sections, backgrounds | 0dp | Clean, modern aesthetic |
| **Rest** | `0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)` | Cards at rest, surfaces | 1dp | Job circulars, category cards, form inputs at rest |
| **Hover/Lift** | `0 4px 12px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.06)` | Card hover, focused inputs | 4dp | Interactive state elevation |
| **Elevated** | `0 10px 20px 0 rgba(0, 0, 0, 0.15), 0 3px 6px 0 rgba(0, 0, 0, 0.08)` | Floating panels, tooltips | 8dp | Floating UI elements |
| **Modal** | `0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)` | Modals, full-screen overlays | 16dp | Highest elevation |

---

## Component Library

### 1. Button Components
- **`button-primary`**: `{colors.primary}` (#2563eb) bg, white text, 48px min height, 16px x 12px padding, 8px radius. Hover `#1d4ed8`, active `#1e40af`, disabled `#dbeafe`.
- **`button-secondary`**: White bg, 1px solid `{colors.primary}`, `{colors.primary}` text, 48px min height, 16px x 12px padding, 8px radius. Hover `#f3f4f6` bg, `#1d4ed8` text.
- **`button-tertiary`**: No bg, `{colors.primary}` text, underline on hover.
- **`button-pill-badge`**: 24px min height, 8px x 4px padding, 9999px radius. Variants: primary, secondary, info, neutral.
- **`button-icon`**: 40x40px area, 8px radius, transparent at rest, `#f3f4f6` hover + rest shadow.

### 2. Form Components
- **`text-input`**: White bg, 1px solid `{colors.hairline}`, 48px height, 16px x 12px padding, 8px radius. Focus: 2px solid `{colors.border-strong}`, rest shadow. Error: 2px solid `{colors.error}`.
- **`checkbox`**: 18x18px inside 40x40px click area, 8px radius, 2px `{colors.hairline}` at rest.
- **`radio-button`**: 18x18px circle inside 40x40px click area, 2px `{colors.hairline}` at rest.

### 3. Card Components
- **`job-circular-card`**: 280px width, 16px padding, 8px radius, featured image with pill badge, company logo, title, meta row, full-width Apply button.
- **`category-card`**: 3-column, 16px padding, 8px radius, 40x40px icon centered top in muted, title, description, surface-soft bg + primary icon on hover.
- **`testimonial-card`**: White bg on dark band, 24px padding, 8px radius, 5 amber stars, excerpt, divider, author avatar + name + title.
- **`team-hire-card`**: 3-column, 24px padding, 8px radius, 120x120px circular avatar, name, title, social icons, full-width button-secondary.