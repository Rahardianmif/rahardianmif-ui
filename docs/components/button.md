# Button

Button merupakan action control dasar Rahardianmif UI.

Gunakan native `<button>` untuk action.

---

## Base Class

```html
<button class="rm-button">
  Action
</button>
```

---

## Variants

```text
rm-button--primary
rm-button--secondary
rm-button--outline
rm-button--ghost
rm-button--danger
```

Primary digunakan untuk action utama.

Dalam satu section idealnya hanya terdapat satu primary action yang paling jelas.

Danger digunakan untuk destructive action dan tidak boleh disamakan secara visual dengan Primary.

---

## Sizes

```text
rm-button--sm
rm-button--md
rm-button--lg
```

Size contract:

| Size | Height |
|---|---:|
| SM | 36px |
| MD | 44px |
| LG | 52px |

`MD` adalah default.

SM ditujukan untuk dense interface. Untuk touch-heavy interface, MD atau LG lebih disarankan.

---

## Full Width

```html
<button
  class="rm-button rm-button--primary rm-button--full-width"
>
  Continue
</button>
```

---

## Icon Button

```html
<button
  class="rm-button rm-button--outline rm-button--icon"
  aria-label="Add item"
  title="Add item"
>
  <svg aria-hidden="true">
    ...
  </svg>
</button>
```

Icon-only button wajib memiliki accessible name.

Tooltip atau bantuan tambahan diperlukan bila arti icon tidak langsung jelas.

---

## Left and Right Icon

Posisi icon mengikuti urutan DOM.

```html
<button class="rm-button rm-button--primary">
  <svg aria-hidden="true">...</svg>
  Add item
</button>
```

```html
<button class="rm-button rm-button--outline">
  Continue
  <svg aria-hidden="true">...</svg>
</button>
```

Decorative icon menggunakan:

```html
aria-hidden="true"
```

---

## Disabled

Untuk native button gunakan native `disabled`:

```html
<button
  class="rm-button rm-button--primary"
  disabled
>
  Save
</button>
```

Jangan hanya memakai `.is-disabled` tanpa semantic disabled state.

---

## Loading

Loading menggunakan:

```text
.is-loading
```

dan semantic state:

```html
aria-busy="true"
```

Contoh:

```html
<button
  class="rm-button rm-button--primary is-loading"
  aria-busy="true"
  disabled
>
  Saving…
</button>
```

Bila action tidak boleh dipicu ulang selama loading, gunakan native `disabled`.

---

## Focus

Button menggunakan focus-visible contract:

```css
outline: 2px solid var(--rm-primary);
outline-offset: 2px;
```

Focus indicator tidak boleh dihilangkan.

---

## Reduced Motion

Button transition dimatikan ketika:

```css
@media (prefers-reduced-motion: reduce)
```

aktif.

---

## Theme

Button tidak memiliki Light/Dark selector sendiri.

Component hanya menggunakan semantic tokens sehingga theme ditangani oleh token system.

---

## Accessibility

Button harus:

- menggunakan semantic `<button>` untuk action;
- mempunyai accessible name;
- dapat dioperasikan dengan keyboard;
- mempunyai visible focus;
- tidak menyampaikan destructive state melalui warna saja;
- menggunakan `disabled` bila benar-benar tidak dapat digunakan;
- menggunakan `aria-busy` untuk loading state;
- menghormati reduced motion.

---

## v0.2 Core Variants

Button Core v0.2 mencakup:

```text
Primary
Secondary
Outline
Ghost
Danger
```

Success, Warning, Link Button, Button Group, Split Button, FAB, Speed Dial, dan Sticky Action Bar bukan bagian Button Core awal.