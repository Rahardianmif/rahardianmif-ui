# Theme System

Rahardianmif UI mendukung:

```text
Light
Dark
System
```

Theme mechanism menggunakan official root attribute:

```html
data-rm-theme
```

Tidak boleh dibuat parallel theme attribute lain di core.

---

# Light Theme

Contoh root:

```html
<html data-rm-theme="light">
```

Semantic Light Theme menggunakan token yang sama dengan Dark Theme tetapi memiliki value berbeda.

Contoh token:

```css
--rm-page-bg
--rm-surface
--rm-text-primary
--rm-primary
--rm-shadow-sm
```

Component tidak perlu mengetahui apakah theme yang aktif adalah Light atau Dark.

---

# Dark Theme

Contoh:

```html
<html data-rm-theme="dark">
```

Component tetap menggunakan semantic token yang sama:

```css
.rm-example {
  color: var(--rm-text-primary);
  background: var(--rm-surface);
}
```

Hindari:

```css
.rm-example {
  color: #0F172A;
}

[data-rm-theme="dark"] .rm-example {
  color: #F8FAFC;
}
```

apabila semantic token dapat menyelesaikan kebutuhan tersebut.

---

# Surface Contract

Rahardianmif UI menggunakan:

```css
--rm-surface
--rm-surface-secondary
--rm-surface-strong
--rm-surface-elevated
```

Surface strategy v0.1 menggunakan model:

```text
Surface A1
```

---

## Light Theme Surface

```text
surface
→ #FFFFFF

surface-secondary
→ Slate 100

surface-strong
→ Slate 200

surface-elevated
→ aliases surface
```

Implementation:

```css
--rm-surface-elevated:
  var(--rm-surface);
```

---

## Dark Theme Surface

```text
surface
→ #0F1B2D

surface-secondary
→ #162337

surface-elevated
→ #1C2B40

surface-strong
→ aliases surface-elevated
```

Implementation:

```css
--rm-surface-strong:
  var(--rm-surface-elevated);
```

Tidak ada warna surface baru yang dibuat hanya untuk membuat kedua theme tampak simetris.

---

# System Theme

`system` merupakan user preference, bukan palette ketiga.

Alurnya:

```text
User Preference
      ↓
system
      ↓
prefers-color-scheme
      ↓
light / dark
      ↓
Effective Theme
```

Tidak ada:

```text
system-colors.css
```

atau:

```text
system-shadow.css
```

System menggunakan Light atau Dark semantic theme yang sudah tersedia.

---

# Theme Persistence

Preference disimpan melalui:

```text
localStorage
```

Storage key resmi v0.1:

```text
rm-theme
```

Valid preference:

```text
light
dark
system
```

Contoh:

```text
rm-theme = system
```

Storage menyimpan preference pengguna, bukan resolved operating-system theme.

---

# Root Attribute Runtime

Rahardianmif UI hanya menggunakan:

```text
data-rm-theme
```

Tidak boleh membuat:

```text
data-rm-theme-effective
```

atau parallel attribute lain tanpa architecture decision.

Pada System mode, JavaScript menyimpan:

```text
rm-theme = system
```

kemudian menentukan effective theme melalui:

```javascript
window.matchMedia(
  "(prefers-color-scheme: dark)"
);
```

Root element kemudian menerima effective Light atau Dark state.

Contoh ketika preference adalah System dan OS Dark:

```text
localStorage
rm-theme = system
```

Runtime DOM:

```html
<html data-rm-theme="dark">
```

Jika OS berubah menjadi Light:

```html
<html data-rm-theme="light">
```

Preference di storage tetap:

```text
system
```

---

# Preference Resolution Priority

Theme initialization menggunakan prioritas:

```text
1. Saved preference
2. Valid markup preference
3. System
```

Jika storage berisi value tidak valid, value tersebut tidak digunakan.

---

# Component Rule

Component harus theme-independent.

Correct:

```css
.rm-example {
  color: var(--rm-text-primary);
  background: var(--rm-surface);
  border-color: var(--rm-border);
}
```

Avoid:

```css
.rm-example {
  color: #0F172A;
}

[data-rm-theme="dark"] .rm-example {
  color: #F8FAFC;
}
```

kecuali terdapat alasan teknis yang benar-benar memerlukan theme-specific component declaration.

---

# Accessibility

Theme bukan hanya perubahan estetika.

Setiap theme harus mempertahankan:

- Readable text
- Visible focus
- Understandable states
- Usable interactive controls
- Sufficient visual distinction
- Status communication yang tidak bergantung pada warna saja

Contrast harus divalidasi pada component ketika component tersebut dibuat.

---

# Initial Theme Flash

Strategi khusus untuk menghilangkan initial theme flash belum menjadi contract v0.1.

Jangan menambahkan:

- Inline bootstrap script
- Duplicate theme engine
- Framework-specific theme loader

tanpa keputusan architecture.

Theme initialization strategy akan tetap mengikuti JS core dan distribution contract.