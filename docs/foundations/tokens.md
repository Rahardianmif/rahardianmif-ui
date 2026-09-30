# Design Tokens

Design tokens adalah foundation visual Rahardianmif UI.

Component harus menggunakan token yang tersedia dan tidak melakukan hard-code nilai apabila token yang sesuai sudah tersedia.

---

## Token Architecture

Alur penggunaan token:

```text
Primitive
    ↓
Semantic
    ↓
Theme
    ↓
Component
```

Contoh primitive token:

```css
--rm-color-cyan-600: #0891B2;
```

Semantic token:

```css
--rm-primary: var(--rm-color-cyan-600);
```

Component menggunakan:

```css
background: var(--rm-primary);
```

Bukan:

```css
background: #0891B2;
```

Dan sebisa mungkin bukan:

```css
background: var(--rm-color-cyan-600);
```

apabila semantic token yang sesuai sudah tersedia.

---

# Colors

## Primitive Slate

```css
--rm-color-slate-50: #F8FAFC;
--rm-color-slate-100: #F1F5F9;
--rm-color-slate-200: #E2E8F0;
--rm-color-slate-300: #CBD5E1;
--rm-color-slate-400: #94A3B8;
--rm-color-slate-500: #64748B;
--rm-color-slate-600: #475569;
--rm-color-slate-700: #334155;
--rm-color-slate-800: #1E293B;
--rm-color-slate-900: #0F172A;
--rm-color-slate-950: #020617;
```

Slate merupakan palette utama untuk:

- Neutral
- Surface
- Border
- Text

---

## Primitive Cyan

```css
--rm-color-cyan-50: #ECFEFF;
--rm-color-cyan-100: #CFFAFE;
--rm-color-cyan-200: #A5F3FC;
--rm-color-cyan-300: #67E8F9;
--rm-color-cyan-400: #22D3EE;
--rm-color-cyan-500: #06B6D4;
--rm-color-cyan-600: #0891B2;
--rm-color-cyan-700: #0E7490;
--rm-color-cyan-800: #155E75;
--rm-color-cyan-900: #164E63;
--rm-color-cyan-950: #083344;
```

Cyan merupakan:

- Primary
- Brand
- Accent

---

## Primitive Navy

```css
--rm-color-navy-50: #F2F7FB;
--rm-color-navy-100: #DFEBF5;
--rm-color-navy-200: #C5DCEC;
--rm-color-navy-300: #9CC5DF;
--rm-color-navy-400: #6AA9CE;
--rm-color-navy-500: #478CB7;
--rm-color-navy-600: #346F98;
--rm-color-navy-700: #2B597B;
--rm-color-navy-800: #274B66;
--rm-color-navy-900: #16324F;
--rm-color-navy-950: #0C1D2E;
```

Navy berfungsi sebagai supporting / structural color.

---

# Semantic Colors

Component harus mengutamakan semantic token berikut.

## Background and Surface

```css
--rm-page-bg
--rm-surface
--rm-surface-secondary
--rm-surface-strong
--rm-surface-elevated
```

## Border

```css
--rm-border
--rm-border-soft
```

## Text

```css
--rm-text-primary
--rm-text-secondary
--rm-text-muted
--rm-text-disabled
```

## Supporting

```css
--rm-supporting
```

## Primary

```css
--rm-primary
--rm-primary-hover
--rm-primary-active
--rm-primary-soft
```

---

# Status Colors

Rahardianmif UI menggunakan empat semantic status family.

## Success

```css
--rm-success: #16A34A;
--rm-success-hover: #15803D;
--rm-success-soft: #DCFCE7;
--rm-success-text-strong: #166534;
```

## Danger

```css
--rm-danger: #DC2626;
--rm-danger-hover: #B91C1C;
--rm-danger-soft: #FEE2E2;
--rm-danger-text-strong: #991B1B;
```

## Warning

```css
--rm-warning: #D97706;
--rm-warning-hover: #B45309;
--rm-warning-soft: #FEF3C7;
--rm-warning-text-strong: #92400E;
```

## Info

```css
--rm-info: #2563EB;
--rm-info-hover: #1D4ED8;
--rm-info-soft: #DBEAFE;
--rm-info-text-strong: #1E40AF;
```

Status tidak boleh disampaikan melalui warna saja.

Icon, text, label, atau semantic markup harus digunakan bila diperlukan agar informasi status tetap dapat dipahami secara aksesibel.

---

# Typography

## Font Family

```css
--rm-font-family-sans:
  "Inter",
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Font loading tidak menjadi tanggung jawab token.

---

## Font Size

| Token | Size |
|---|---:|
| `--rm-font-size-xs` | `0.75rem` |
| `--rm-font-size-sm` | `0.875rem` |
| `--rm-font-size-base` | `1rem` |
| `--rm-font-size-lg` | `1.125rem` |
| `--rm-font-size-xl` | `1.25rem` |
| `--rm-font-size-2xl` | `1.5rem` |
| `--rm-font-size-3xl` | `1.875rem` |
| `--rm-font-size-4xl` | `2.25rem` |
| `--rm-font-size-5xl` | `3rem` |
| `--rm-font-size-6xl` | `3.75rem` |

---

## Font Weight

```css
--rm-font-weight-regular: 400;
--rm-font-weight-medium: 500;
--rm-font-weight-semibold: 600;
--rm-font-weight-bold: 700;
--rm-font-weight-extrabold: 800;
```

Extra Bold digunakan secara terbatas.

---

## Line Height

```css
--rm-line-height-tight: 1.2;
--rm-line-height-snug: 1.375;
--rm-line-height-normal: 1.5;
--rm-line-height-relaxed: 1.625;
```

General intention:

```text
tight
→ large heading / display

snug
→ heading

normal
→ common UI / body

relaxed
→ long-form content
```

Letter-spacing tokens belum menjadi bagian v0.1.

---

# Spacing

Base spacing unit Rahardianmif UI adalah:

```text
4px
```

Scale:

```css
--rm-space-0: 0;
--rm-space-1: 4px;
--rm-space-2: 8px;
--rm-space-3: 12px;
--rm-space-4: 16px;
--rm-space-5: 20px;
--rm-space-6: 24px;
--rm-space-8: 32px;
--rm-space-10: 40px;
--rm-space-12: 48px;
--rm-space-16: 64px;
--rm-space-20: 80px;
--rm-space-24: 96px;
```

Jangan membuat spacing scale baru tanpa kebutuhan dan keputusan architecture.

Contoh penggunaan:

```css
padding: var(--rm-space-4);
gap: var(--rm-space-2);
```

---

# Radius

Radius values:

```css
--rm-radius-xs: 4px;
--rm-radius-sm: 6px;
--rm-radius-md: 8px;
--rm-radius-lg: 12px;
--rm-radius-xl: 16px;
--rm-radius-pill: 9999px;
--rm-radius-circle: 50%;
```

Gunakan token radius yang tersedia sebelum menambahkan nilai arbitrary.

---

# Shadow

Rahardianmif UI menyediakan:

```css
--rm-shadow-xs
--rm-shadow-sm
--rm-shadow-md
--rm-shadow-lg
--rm-shadow-xl
```

Shadow mempunyai mapping Light dan Dark yang berbeda tetapi menggunakan semantic token name yang sama.

Intended use:

```text
xs → subtle elevation
sm → card
md → dropdown / floating menu
lg → popover / drawer
xl → modal / dialog
```

Shadow digunakan secara restrained.

Border dan surface contrast tetap menjadi separator utama pada administrative UI.

---

# Z-Index

Global stacking hierarchy:

```css
--rm-z-base: 0;
--rm-z-sticky: 100;
--rm-z-dropdown: 200;
--rm-z-overlay: 300;
--rm-z-drawer: 400;
--rm-z-modal: 500;
--rm-z-toast: 600;
--rm-z-tooltip: 700;
```

Jangan menggunakan arbitrary global z-index seperti:

```css
z-index: 99999;
```

tanpa alasan architecture yang terdokumentasi.

Local stacking context pada component dapat menggunakan nilai lokal apabila diperlukan.

---

# Responsive Breakpoints

Rahardianmif UI menggunakan mobile-first strategy.

Canonical breakpoints:

| Breakpoint | Minimum |
|---|---:|
| XS | Default, `<36rem` |
| SM | `36rem` |
| MD | `48rem` |
| LG | `64rem` |
| XL | `80rem` |
| 2XL | `96rem` |

Contoh:

```css
/* XS */

@media (min-width: 36rem) {
  /* SM */
}

@media (min-width: 48rem) {
  /* MD */
}

@media (min-width: 64rem) {
  /* LG */
}
```

Breakpoint tidak digunakan melalui CSS custom properties di media-query condition.

---

# Motion

Duration tokens:

```css
--rm-motion-fast: 120ms;
--rm-motion-normal: 200ms;
--rm-motion-slow: 320ms;
--rm-motion-extended: 480ms;
```

Motion harus membantu:

- Feedback
- Continuity
- State understanding

Motion tidak digunakan hanya sebagai dekorasi.

---

## Easing

Easing tokens belum ditetapkan pada v0.1.

Jangan membuat:

```css
--rm-ease-*
```

tanpa keputusan architecture.

---

## Reduced Motion

Reduced Motion menggunakan strategi:

```text
component-level
```

Setiap component yang mempunyai transition atau animation bertanggung jawab untuk mempertimbangkan:

```css
@media (prefers-reduced-motion: reduce)
```

Rahardianmif UI tidak menggunakan global rule yang mematikan seluruh animation atau transition secara paksa.

---

# Token Usage Rules

## Do

```css
color: var(--rm-text-primary);

background: var(--rm-surface);

padding: var(--rm-space-4);

border-radius: var(--rm-radius-md);

box-shadow: var(--rm-shadow-sm);
```

## Don't

```css
color: #0F172A;

padding: 16px;

border-radius: 8px;

box-shadow:
  0 1px 3px rgb(0 0 0 / 0.1);
```

apabila token yang sesuai sudah tersedia.

---

# v0.1 Boundary

Foundation tokens tidak termasuk:

- Button
- Form
- Card
- Modal
- Table
- Navigation
- Layout utility
- Typography utility classes
- Spacing utility classes
- Application-specific UI

Component implementation dimulai pada roadmap berikutnya setelah v0.1 dinyatakan stabil.