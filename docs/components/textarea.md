# Textarea

Textarea digunakan untuk input teks multi-baris.

## Basic Usage

```html
<div class="rm-field">
  <label
    class="rm-field__label"
    for="message"
  >
    Message
  </label>

  <div class="rm-field__control">
    <textarea
      class="rm-textarea"
      id="message"
    ></textarea>
  </div>
</div>
```

## Sizes

| Size | Class | Minimum Height |
|---|---|---:|
| SM | `rm-textarea--sm` | 96px |
| MD | `rm-textarea--md` | 120px |
| LG | `rm-textarea--lg` | 144px |

MD adalah default.

Textarea menggunakan minimum height, bukan fixed height.

## Resize

Textarea hanya dapat di-resize secara vertikal.

```css
resize: vertical;
```

## Readonly

Native `readonly` tetap dapat menerima focus.

## Disabled

Gunakan native `disabled`.

## Invalid

Gunakan:

```text
.is-invalid
aria-invalid="true"
aria-describedby
```

untuk menghubungkan validation message.

## Focus

Textarea memakai locked v0.2 focus contract:

```css
outline: 2px solid var(--rm-primary);
outline-offset: 2px;
```

## Theme

Textarea menggunakan semantic tokens dan otomatis mengikuti Light/Dark Theme.

## Reduced Motion

Transition dihilangkan ketika `prefers-reduced-motion: reduce` aktif.