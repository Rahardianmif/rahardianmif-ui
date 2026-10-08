# Disclosure + Accordion

## Version

Introduced in:

```text
v0.5.7 — Disclosure + Accordion
```

Part of:

```text
v0.5.0 — Modal + Overlays
```

## Purpose

Disclosure menyediakan primitive untuk membuka dan menutup sebuah content panel.

Accordion merupakan composition dari beberapa Disclosure dalam satu group.

Disclosure cocok digunakan untuk:

- expandable information;
- settings sections;
- detail sections;
- FAQ composition;
- progressive disclosure.

## Public CSS API

Disclosure:

```text
.rm-disclosure
.rm-disclosure__trigger
.rm-disclosure__label
.rm-disclosure__indicator
.rm-disclosure__panel
```

Accordion:

```text
.rm-accordion
.rm-accordion__item
```

## Declarative Hooks

Disclosure panel:

```html
data-rm-disclosure
```

Disclosure trigger:

```html
data-rm-disclosure-trigger
```

Accordion:

```html
data-rm-accordion
```

Accordion mode:

```html
data-rm-accordion-mode
```

## Standalone Disclosure Example

```html
<div class="rm-disclosure">
    <button
        class="rm-disclosure__trigger"
        type="button"
        data-rm-disclosure-trigger
        aria-controls="details-panel"
        aria-expanded="false"
    >
        <span class="rm-disclosure__label">
            Details
        </span>

        <span
            class="rm-disclosure__indicator"
            aria-hidden="true"
        >
            +
        </span>
    </button>

    <div
        id="details-panel"
        class="rm-disclosure__panel"
        data-rm-disclosure
        hidden
    >
        Disclosure content.
    </div>
</div>
```

## Trigger and Panel Relationship

Hubungan antara trigger dan controlled panel ditentukan oleh:

```html
aria-controls
```

Contoh:

```html
<button
    data-rm-disclosure-trigger
    aria-controls="account-panel"
    aria-expanded="false"
>
    Account
</button>

<div
    id="account-panel"
    data-rm-disclosure
    hidden
>
    Account content.
</div>
```

Nilai `aria-controls` menunjuk ke ID panel.

`data-rm-disclosure-trigger` berfungsi sebagai declarative initialization hook dan bukan source of truth hubungan trigger-panel.

## State

Native:

```html
hidden
```

pada panel merupakan source of truth untuk open/collapsed state.

Trigger disinkronkan melalui:

```html
aria-expanded="true"
```

atau:

```html
aria-expanded="false"
```

Tidak ada public:

```text
.is-open
```

state untuk Disclosure atau Accordion.

## Indicator

Indicator visual menggunakan:

```text
.rm-disclosure__indicator
```

Visual indicator dapat mengikuti `aria-expanded`.

Indicator bukan state source of truth.

## Accordion

Accordion adalah group dari Disclosure instances.

Contoh:

```html
<div
    class="rm-accordion"
    data-rm-accordion
    data-rm-accordion-mode="single"
>
    <div class="rm-accordion__item">
        <div class="rm-disclosure">
            <button
                class="rm-disclosure__trigger"
                type="button"
                data-rm-disclosure-trigger
                aria-controls="accordion-one"
                aria-expanded="true"
            >
                <span class="rm-disclosure__label">
                    First Section
                </span>

                <span
                    class="rm-disclosure__indicator"
                    aria-hidden="true"
                >
                    +
                </span>
            </button>

            <div
                id="accordion-one"
                class="rm-disclosure__panel"
                data-rm-disclosure
            >
                First content.
            </div>
        </div>
    </div>

    <div class="rm-accordion__item">
        <div class="rm-disclosure">
            <button
                class="rm-disclosure__trigger"
                type="button"
                data-rm-disclosure-trigger
                aria-controls="accordion-two"
                aria-expanded="false"
            >
                <span class="rm-disclosure__label">
                    Second Section
                </span>

                <span
                    class="rm-disclosure__indicator"
                    aria-hidden="true"
                >
                    +
                </span>
            </button>

            <div
                id="accordion-two"
                class="rm-disclosure__panel"
                data-rm-disclosure
                hidden
            >
                Second content.
            </div>
        </div>
    </div>
</div>
```

## Accordion Modes

### Single

```html
data-rm-accordion-mode="single"
```

Hanya satu panel terbuka pada satu waktu.

Single Accordion tetap collapsible.

Artinya active panel dapat ditutup sehingga seluruh group tidak mempunyai open panel.

### Multiple

```html
data-rm-accordion-mode="multiple"
```

Beberapa panel dapat terbuka secara bersamaan.

### Default

Jika `data-rm-accordion-mode` tidak diberikan, mode default adalah:

```text
single
```

## Initial State

Initial state berasal dari native `hidden` state pada panel.

Panel tanpa `hidden` dianggap open.

Jika single Accordion memiliki lebih dari satu initial open panel, normalisasi menggunakan aturan:

```text
first open item wins
```

## Standalone Keyboard

Standalone Disclosure menggunakan native `<button>` behavior:

```text
Enter
Space
```

## Accordion Keyboard

Accordion menambahkan:

```text
Arrow Down
Arrow Up
Home
End
```

### Arrow Down

Memindahkan focus ke available Accordion trigger berikutnya.

Navigation melakukan wrap.

### Arrow Up

Memindahkan focus ke available Accordion trigger sebelumnya.

Navigation melakukan wrap.

### Home

Memindahkan focus ke available trigger pertama.

### End

Memindahkan focus ke available trigger terakhir.

## Focus Management

Toggle panel tidak memindahkan focus dari trigger.

Arrow, Home, dan End hanya memindahkan focus antar Accordion trigger.

v0.5 tidak menggunakan roving tabindex untuk Accordion.

## Disabled Trigger

Disabled Disclosure trigger tidak melakukan toggle.

Dalam Accordion keyboard navigation, disabled trigger dilewati.

## Nested Behavior

Nested standalone Disclosure didukung.

Nested Accordion bukan official v0.5 supported composition.

## Accessibility

Disclosure trigger harus menggunakan native button:

```html
<button type="button">
```

Trigger harus mempunyai:

```html
aria-controls
aria-expanded
```

Controlled panel menggunakan:

```html
hidden
```

sebagai collapsed state.

Native button menyediakan Enter dan Space behavior.

## Theme

Disclosure dan Accordion mendukung:

```text
Light
Dark
System
```

## Responsive

Disclosure mengikuti normal document flow dan tidak membutuhkan breakpoint-specific behavior.

## Motion

v0.5 tidak menggunakan measured-height JavaScript animation.

Panel height tidak dihitung melalui JavaScript untuk membuka atau menutup content.

Jika CSS motion digunakan, Reduced Motion harus dihormati.

## Multiple Instances

Banyak standalone Disclosure dan Accordion dapat digunakan dalam satu halaman.

Setiap controlled panel harus mempunyai ID unik.

## Out of Scope

v0.5 tidak menyediakan:

- measured-height animation;
- official nested Accordion;
- tree navigation;
- Nested Menu;
- roving tabindex;
- public programmatic Disclosure API.

## Public JavaScript API

Public API tetap:

```js
RahardianmifUI.init()
```