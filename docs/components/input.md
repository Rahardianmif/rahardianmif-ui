# Form Field and Input

Rahardianmif UI menyediakan Form Field sebagai struktur umum untuk form controls dan Input sebagai native text-entry control.

## Form Field Structure

```html
<div class="rm-field">
  <label
    class="rm-field__label"
    for="name"
  >
    Name
  </label>

  <div class="rm-field__control">
    <input
      class="rm-input"
      id="name"
      type="text"
    >
  </div>

  <p class="rm-field__description">
    Supporting information.
  </p>
</div>
```

## Input Sizes

| Size | Class | Height |
|---|---|---:|
| SM | `rm-input--sm` | 36px |
| MD | `rm-input--md` | 44px |
| LG | `rm-input--lg` | 52px |

MD merupakan default size.

## Supported Initial Types

- text
- email
- password
- search
- tel
- url
- number

Native types seperti date, time, file, range, dan color belum termasuk scope awal v0.2.2.

## Disabled

Gunakan native `disabled`.

```html
<input
  class="rm-input"
  type="text"
  disabled
>
```

## Readonly

Gunakan native `readonly`.

```html
<input
  class="rm-input"
  type="text"
  readonly
>
```

Readonly tetap dapat menerima keyboard focus.

## Invalid

Gunakan visual state:

```text
.is-invalid
```

bersama semantic state:

```html
aria-invalid="true"
```

Jika terdapat error message, hubungkan menggunakan `aria-describedby`.

```html
<input
  class="rm-input is-invalid"
  id="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
>

<p
  class="rm-field__message"
  id="email-error"
>
  Enter a valid email address.
</p>
```

## Focus

Input menggunakan locked v0.2 focus contract:

```css
outline: 2px solid var(--rm-primary);
outline-offset: 2px;
```

## Reduced Motion

Transition dihilangkan ketika pengguna mengaktifkan reduced motion.

## Theme

Form Field dan Input tidak memiliki Light/Dark implementation sendiri.

Semua warna berasal dari semantic tokens sehingga component mengikuti active Rahardianmif UI theme.