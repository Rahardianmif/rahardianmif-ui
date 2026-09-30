# Theme Manager

Theme Manager merupakan bagian dari:

```text
JS Core
```

Lokasi source:

```text
src/js/core/theme-manager.js
```

Theme Manager bertanggung jawab terhadap:

- Light preference
- Dark preference
- System preference
- Theme persistence
- `prefers-color-scheme` resolution
- Operating-system theme changes

Theme Manager tidak bertanggung jawab terhadap:

- Visual component styling
- Theme switcher UI
- Button
- Dropdown
- Project-specific settings screen

---

# Storage

Theme preference disimpan menggunakan:

```text
localStorage
```

Key:

```text
rm-theme
```

Valid values:

```text
light
dark
system
```

---

# Internal Functions

Module saat ini memiliki:

```javascript
initTheme()
setThemePreference()
getThemePreference()
getEffectiveTheme()
```

Function tersebut merupakan internal core API pada v0.1.

Mereka belum otomatis menjadi public consumer API Rahardianmif UI.

Public API v0.1 tetap dibuat seminimal mungkin.

---

# Initialization

Main JavaScript entry point:

```text
src/js/rahardianmif-ui.js
```

menyediakan:

```javascript
RahardianmifUI.init();
```

Initialization akan menjalankan Theme Manager.

Contoh ESM:

```javascript
import RahardianmifUI from "./rahardianmif-ui.js";

RahardianmifUI.init();
```

Core tidak auto-initialize secara diam-diam pada source v0.1.

Consumer melakukan initialization secara eksplisit.

---

# Theme Resolution

Theme resolution:

```text
light
    ↓
effective light

dark
    ↓
effective dark

system
    ↓
prefers-color-scheme
    ↓
light / dark
```

System preference tetap disimpan sebagai:

```text
system
```

meskipun root DOM menerima resolved Light atau Dark state.

---

# System Changes

Jika preference:

```text
system
```

Theme Manager mendengarkan perubahan:

```text
prefers-color-scheme
```

Jika operating system berubah:

```text
Dark → Light
```

effective theme ikut berubah.

Jika preference pengguna adalah:

```text
light
```

atau:

```text
dark
```

perubahan theme OS tidak boleh mengganti preference tersebut.

---

# Invalid Preference

Value selain:

```text
light
dark
system
```

tidak dianggap valid.

Theme Manager harus fallback ke valid markup preference atau System.

Contoh invalid:

```text
blue
auto-dark
night
purple
```

Value tersebut bukan bagian dari theme contract.

---

# Storage Failure

Theme Manager tidak boleh menyebabkan UI gagal hanya karena:

```text
localStorage
```

tidak tersedia.

Contoh penyebab:

- Browser privacy restriction
- Sandbox
- Security settings
- Storage access failure

Theme tetap harus berjalan meskipun persistence tidak tersedia.

---

# Browser API

Theme Manager menggunakan browser-native API:

```javascript
window.localStorage
window.matchMedia()
```

Tidak diperlukan runtime dependency eksternal.

---

# Public API Boundary

Pada v0.1:

```javascript
RahardianmifUI.init();
```

adalah public initializer.

Jangan menambahkan public API seperti:

```javascript
RahardianmifUI.setTheme();
RahardianmifUI.theme.set();
window.RMTheme;
```

tanpa keputusan public API contract.

Theme Switcher UI akan ditangani pada roadmap component yang relevan.

---

# Accessibility

Theme switching harus:

- Tidak mengubah semantic HTML
- Tidak menghilangkan focus
- Tidak bergantung pada animation
- Tetap kompatibel dengan reduced-motion requirement
- Tidak mengganggu keyboard navigation

Theme preference merupakan visual preference dan bukan pengganti accessibility preference lain.

---

# Framework Independence

Theme Manager tidak boleh bergantung pada:

- React
- Vue
- Angular
- jQuery
- Alpine
- Backend framework

Framework adapter dapat dibangun di luar core bila suatu hari diperlukan.

Core tetap Vanilla JavaScript.