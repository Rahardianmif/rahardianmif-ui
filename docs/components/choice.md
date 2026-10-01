# Checkbox and Radio

Rahardianmif UI Choice menyediakan visual system bersama untuk native Checkbox dan Radio.

Native `<input>` tetap menjadi semantic source dan tidak menggunakan `display: none`.

## Checkbox

```html
<label class="rm-choice">
  <input
    class="rm-checkbox"
    type="checkbox"
  >

  <span
    class="rm-choice__control"
    aria-hidden="true"
  ></span>

  <span class="rm-choice__label">
    Remember me
  </span>
</label>
```

## Radio

```html
<label class="rm-choice">
  <input
    class="rm-radio"
    type="radio"
    name="payment"
    value="card"
  >

  <span
    class="rm-choice__control"
    aria-hidden="true"
  ></span>

  <span class="rm-choice__label">
    Credit card
  </span>
</label>
```

## Sizes

| Size | Class | Control |
|---|---|---:|
| SM | `rm-choice--sm` | 16px |
| MD | `rm-choice--md` | 20px |
| LG | `rm-choice--lg` | 24px |

MD merupakan default.

## Description

Gunakan:

```html
<span class="rm-choice__description">
  Supporting information.
</span>
```

## Checked State

Checked state menggunakan semantic token:

```css
var(--rm-primary)
```

## Disabled

Gunakan native `disabled`.

Disabled Choice menggunakan opacity `0.5` dan cursor `not-allowed`.

## Invalid

Gunakan:

```text
.is-invalid
aria-invalid="true"
aria-describedby
```

## Focus

Native Checkbox dan Radio tetap menerima keyboard focus.

Visual control menampilkan locked focus contract:

```css
outline: 2px solid var(--rm-primary);
outline-offset: 2px;
```

## Accessibility

Native inputs tidak boleh dihilangkan dengan:

```css
display: none;
```

Visual `.rm-choice__control` menggunakan `aria-hidden="true"` karena semantic state berasal dari native input.

Radio dengan hubungan pilihan yang sama harus menggunakan `name` yang sama.

Gunakan `fieldset` dan `legend` untuk kelompok Radio yang membutuhkan group label.

## Theme

Choice menggunakan semantic tokens sehingga mengikuti Light/Dark Theme.

## Reduced Motion

Visual transition dihilangkan ketika `prefers-reduced-motion: reduce` aktif.