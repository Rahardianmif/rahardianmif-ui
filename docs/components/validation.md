# Validation and Form States

Rahardianmif UI menggunakan kombinasi semantic HTML, explicit messages, dan visual borders untuk menyampaikan validation state.

## Required

Gunakan native `required`.

```html
<input
  class="rm-input"
  required
>
```

Visual indicator:

```html
<span
  class="rm-field__required"
  aria-hidden="true"
>
  *
</span>
```

Native `required` tetap menjadi semantic source.

## Optional

```html
<span class="rm-field__optional">
  Optional
</span>
```

## Valid

Gunakan:

```text
.is-valid
```

Valid controls menggunakan:

```css
var(--rm-success)
```

pada border.

## Invalid

Gunakan:

```text
.is-invalid
aria-invalid="true"
aria-describedby
```

Invalid controls menggunakan:

```css
var(--rm-danger)
```

pada border.

## Validation Message

Success:

```html
<p
  class="rm-field__message rm-field__message--success"
>
  Username is available.
</p>
```

Error:

```html
<p
  class="rm-field__message rm-field__message--error"
>
  Enter a valid email address.
</p>
```

Status tidak disampaikan melalui warna teks saja.

Message text tetap menggunakan semantic text color.

## Dynamic Validation

Jika message baru muncul setelah interaction, aplikasi dapat menggunakan:

```html
role="alert"
```

atau:

```html
aria-live="polite"
```

sesuai kebutuhan.

Core Rahardianmif UI tidak menambahkan live region secara otomatis.

## Covered Components

Validation contract berlaku untuk:

- Input
- Textarea
- Native Select
- Checkbox
- Radio
- Switch

## JavaScript

Tidak ada validation JavaScript di core.

Business rules dan validation logic tetap menjadi tanggung jawab aplikasi.