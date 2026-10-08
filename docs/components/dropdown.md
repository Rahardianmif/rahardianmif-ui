# Dropdown Menu

## Version

Introduced in:

```text
v0.5.6 — Dropdown Menu
```

Part of:

```text
v0.5.0 — Modal + Overlays
```

## Purpose

Dropdown Menu digunakan untuk menampilkan application actions dalam floating menu.

Contoh:

- Edit;
- Duplicate;
- Archive;
- View details;
- Delete.

Dropdown bukan general-purpose contextual content container.

Gunakan Popover untuk interactive contextual content yang bukan menu.

## Public CSS API

```text
.rm-dropdown
.rm-dropdown__item
.rm-dropdown__item--danger
.rm-dropdown__separator
```

## Declarative Hooks

Trigger:

```html
<button
    type="button"
    data-rm-dropdown-trigger="actions-menu"
    aria-haspopup="menu"
    aria-controls="actions-menu"
    aria-expanded="false"
>
    Actions
</button>
```

Dropdown:

```html
<div
    id="actions-menu"
    class="rm-dropdown"
    data-rm-dropdown
    popover="manual"
    role="menu"
    aria-label="Actions"
>
    ...
</div>
```

## Example

```html
<button
    class="rm-button rm-button--secondary"
    type="button"
    data-rm-dropdown-trigger="actions-menu"
    aria-haspopup="menu"
    aria-controls="actions-menu"
    aria-expanded="false"
>
    Actions
</button>

<div
    id="actions-menu"
    class="rm-dropdown"
    data-rm-dropdown
    data-rm-dropdown-placement="bottom"
    data-rm-dropdown-alignment="start"
    popover="manual"
    role="menu"
    aria-label="Actions"
>
    <button
        class="rm-dropdown__item"
        type="button"
        role="menuitem"
        tabindex="-1"
    >
        Edit
    </button>

    <button
        class="rm-dropdown__item"
        type="button"
        role="menuitem"
        tabindex="-1"
    >
        Duplicate
    </button>

    <div
        class="rm-dropdown__separator"
        role="separator"
    ></div>

    <button
        class="rm-dropdown__item rm-dropdown__item--danger"
        type="button"
        role="menuitem"
        tabindex="-1"
    >
        Delete
    </button>
</div>
```

## Alignment

Supported alignment:

```text
start
center
end
```

Example:

```html
data-rm-dropdown-alignment="start"
```

## Placement

Dropdown menggunakan shared floating positioning infrastructure.

Contoh:

```html
data-rm-dropdown-placement="bottom"
```

## Semantics

Dropdown container:

```html
role="menu"
```

Action:

```html
role="menuitem"
```

Separator:

```html
role="separator"
```

## Keyboard

Dropdown mendukung:

```text
Arrow Down
Arrow Up
Home
End
Enter
Space
Escape
Tab
Typeahead
```

### Arrow Down

Memindahkan focus ke available menu item berikutnya.

### Arrow Up

Memindahkan focus ke available menu item sebelumnya.

### Home

Memindahkan focus ke available item pertama.

### End

Memindahkan focus ke available item terakhir.

### Enter / Space

Mengaktifkan focused menu action sesuai native action behavior.

### Escape

Menutup active Dropdown.

### Tab

Dropdown tidak membuat custom focus trap.

### Typeahead

Character input dapat digunakan untuk mencari menu item berdasarkan accessible text.

## Disabled Items

Disabled items dilewati oleh keyboard navigation.

Gunakan native `disabled` state pada element yang mendukungnya.

## Focus Management

Dropdown mengelola keyboard focus antar menu item ketika menu aktif.

Disabled items tidak menerima keyboard menu navigation.

## Interactive Floating Ownership

Dropdown dan Popover berbagi interactive floating ownership.

Opening owner baru dapat menutup interactive floating owner sebelumnya.

## Outside Pointer

Pointer interaction di luar active Dropdown dapat menutup menu.

## Accessibility

Trigger direkomendasikan menggunakan:

```html
aria-haspopup="menu"
aria-controls="menu-id"
aria-expanded="false"
```

Container:

```html
role="menu"
```

Item:

```html
role="menuitem"
```

Separator:

```html
role="separator"
```

## Theme

Dropdown mendukung:

```text
Light
Dark
System
```

## Responsive

Floating position menyesuaikan trigger dan viewport.

## Motion

Dropdown dapat menggunakan lightweight entrance dan exit motion.

Reduced Motion harus dihormati.

## Multiple Instances

Beberapa Dropdown dapat tersedia dalam satu halaman.

Setiap Dropdown harus memiliki ID unik.

## Difference from Popover

Dropdown:

```text
Application actions
role="menu"
role="menuitem"
Menu keyboard navigation
Typeahead
```

Popover:

```text
General interactive contextual content
Dialog-like semantics
Tidak menggunakan menu keyboard model
```

## Out of Scope

v0.5 Dropdown tidak menyediakan:

- submenu;
- nested menu;
- checkbox menu item;
- radio menu item;
- Mega Menu;
- Dropdown Navigation;
- Context Menu.

## Public JavaScript API

Public API tetap:

```js
RahardianmifUI.init()
```