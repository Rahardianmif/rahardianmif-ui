# Switch

Rahardianmif UI Switch menggunakan native checkbox sebagai semantic source.

Switch v0.2 tidak menggunakan JavaScript dan tidak menambahkan `role="switch"`.

## Basic Usage

```html
<label class="rm-switch-field">
  <input
    class="rm-switch"
    type="checkbox"
  >

  <span
    class="rm-switch__track"
    aria-hidden="true"
  >
    <span class="rm-switch__thumb"></span>
  </span>

  <span class="rm-switch__label">
    Enable notifications
  </span>
</label>
```

## Sizes

| Size | Class | Track |
|---|---|---:|
| SM | `rm-switch-field--sm` | 32 × 18px |
| MD | `rm-switch-field--md` | 40 × 22px |
| LG | `rm-switch-field--lg` | 48 × 26px |

MD merupakan default.

## Semantic Source

Switch tetap menggunakan:

```html
<input type="checkbox">
```

Native input tidak menggunakan `display: none`.

Keyboard dan checked state tetap berasal dari native browser behavior.

## Checked

Checked track menggunakan:

```css
var(--rm-primary)
```

## Description

Gunakan:

```html
<span class="rm-switch__description">
  Supporting information.
</span>
```

Jika description harus menjadi accessible description, hubungkan dengan `aria-describedby`.

## Disabled

Gunakan native:

```html
disabled
```

## Invalid

Gunakan:

```text
.is-invalid
aria-invalid="true"
aria-describedby
```

## Focus

Switch menggunakan locked v0.2 focus contract:

```css
outline: 2px solid var(--rm-primary);
outline-offset: 2px;
```

Focus ditampilkan pada visual track ketika native checkbox memperoleh `:focus-visible`.

## Theme

Switch hanya menggunakan semantic tokens sehingga mengikuti Light/Dark Theme.

## Reduced Motion

Track dan thumb transition dihilangkan ketika:

```css
prefers-reduced-motion: reduce
```

aktif.

## JavaScript

Switch dasar tidak membutuhkan JavaScript.

JavaScript hanya diperlukan oleh aplikasi jika perubahan checked state harus memicu business logic.