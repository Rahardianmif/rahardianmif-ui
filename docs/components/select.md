# Native Select

Rahardianmif UI Select menggunakan native HTML `<select>`.

Tidak ada custom dropdown atau JavaScript pada Native Select v0.2.

## Basic Usage

```html
<div class="rm-field">
  <label
    class="rm-field__label"
    for="country"
  >
    Country
  </label>

  <div class="rm-field__control">
    <select
      class="rm-select"
      id="country"
    >
      <option value="">
        Select country
      </option>

      <option value="id">
        Indonesia
      </option>
    </select>
  </div>
</div>
```

## Sizes

| Size | Class | Height |
|---|---|---:|
| SM | `rm-select--sm` | 36px |
| MD | `rm-select--md` | 44px |
| LG | `rm-select--lg` | 52px |

MD merupakan default size.

## Native Behavior

Komponen tetap menggunakan native `<select>` agar keyboard, screen reader, dan platform behavior tetap ditangani browser.

Visual arrow diganti dengan CSS-only chevron.

Tidak ada JavaScript.

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

Native Select mengikuti locked v0.2 focus contract:

```css
outline: 2px solid var(--rm-primary);
outline-offset: 2px;
```

## Theme

Semua warna menggunakan semantic tokens sehingga Select otomatis mengikuti Light/Dark Theme.

## Reduced Motion

Transition dihilangkan ketika `prefers-reduced-motion: reduce` aktif.

## Advanced Select

Custom Select, Combobox, Autocomplete, searchable dropdown, dan multi-select bukan bagian dari Native Select v0.2.4.