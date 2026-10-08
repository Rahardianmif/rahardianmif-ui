# Drawer / Offcanvas

## Version

Introduced in:

```text
v0.5.3 — Drawer / Offcanvas
```

Part of:

```text
v0.5.0 — Modal + Overlays
```

## Purpose

Drawer adalah blocking offcanvas surface yang muncul dari sisi viewport.

Drawer cocok digunakan untuk:

- contextual panel;
- filter panel;
- settings panel;
- detail panel;
- mobile application composition.

Drawer menggunakan native `<dialog>` sebagai foundation.

## Public CSS API

```text
.rm-drawer

.rm-drawer__header
.rm-drawer__title
.rm-drawer__body
.rm-drawer__footer
.rm-drawer__close

.rm-drawer--start
.rm-drawer--end
```

Tidak ada public `.is-open` state.

## Declarative Hooks

Trigger:

```html
<button
    type="button"
    data-rm-drawer-trigger="example-drawer"
>
    Open Drawer
</button>
```

Drawer:

```html
<dialog
    id="example-drawer"
    class="rm-drawer rm-drawer--end"
    data-rm-drawer
>
    ...
</dialog>
```

Close control:

```html
<button
    type="button"
    data-rm-drawer-close
>
    Close
</button>
```

## Example

```html
<button
    class="rm-button rm-button--primary"
    type="button"
    data-rm-drawer-trigger="settings-drawer"
>
    Open Settings
</button>

<dialog
    id="settings-drawer"
    class="rm-drawer rm-drawer--end"
    data-rm-drawer
    aria-labelledby="settings-drawer-title"
>
    <header class="rm-drawer__header">
        <h2
            id="settings-drawer-title"
            class="rm-drawer__title"
        >
            Settings
        </h2>

        <button
            class="rm-drawer__close"
            type="button"
            data-rm-drawer-close
            aria-label="Close drawer"
        >
            ×
        </button>
    </header>

    <div class="rm-drawer__body">
        Drawer content.
    </div>

    <footer class="rm-drawer__footer">
        <button
            class="rm-button rm-button--secondary"
            type="button"
            data-rm-drawer-close
        >
            Close
        </button>
    </footer>
</dialog>
```

## Placement

Start:

```html
<dialog
    class="rm-drawer rm-drawer--start"
    data-rm-drawer
>
```

End:

```html
<dialog
    class="rm-drawer rm-drawer--end"
    data-rm-drawer
>
```

## Behavior

Drawer mendukung:

- declarative open;
- explicit close;
- Escape;
- backdrop dismissal;
- focus restoration;
- document scroll locking;
- shared blocking overlay ownership.

## Focus Management

Drawer menggunakan native modal dialog behavior.

Saat Drawer ditutup, focus dikembalikan ke trigger pembuka jika trigger tersebut masih tersedia.

Tidak ada custom public focus-trap API.

## Keyboard

Escape menutup active Drawer sesuai dialog dan overlay ownership behavior.

Tab navigation mengikuti native modal dialog behavior.

## Backdrop

Backdrop merupakan bagian dari blocking Drawer behavior.

Pointer interaction pada backdrop dapat menutup Drawer sesuai contract.

## Scroll Lock

Drawer mengunci document scrolling ketika aktif.

Modal dan Drawer menggunakan shared reference-aware scroll-lock infrastructure.

## Overlay Stack

Drawer menggunakan blocking overlay stack yang sama dengan Modal.

Internal stack membantu memastikan:

- overlay owner diketahui;
- Escape diarahkan ke overlay yang tepat;
- scroll lock tidak dilepas terlalu dini;
- focus restoration terjadi pada owner yang tepat.

## Accessibility

Drawer harus memiliki accessible name melalui:

```html
aria-labelledby
```

atau:

```html
aria-label
```

Icon-only close button harus menggunakan accessible label.

## Theme

Drawer mendukung:

```text
Light
Dark
System
```

Component menggunakan semantic theme tokens.

## Responsive

Drawer dirancang untuk bekerja dari mobile sampai desktop.

Placement tersedia pada sisi `start` dan `end`.

## Motion

Drawer dapat menggunakan entrance dan exit motion.

Reduced Motion harus dihormati.

## Relationship with Navigation

Drawer v0.5 menyediakan reusable offcanvas primitive.

Namun behavior berikut belum menjadi bagian dari Navigation contract:

```text
Navbar hamburger
Mobile Navbar Drawer
Collapsible Sidebar
Overlay Sidebar
```

Komposisi tersebut dapat menggunakan Drawer di versi berikutnya tanpa mengubah Drawer Core.

## Multiple Instances

Beberapa Drawer dapat tersedia pada satu halaman selama masing-masing mempunyai ID unik.

## Out of Scope

v0.5 tidak menyediakan:

- resizable Drawer;
- persistent Sidebar replacement;
- Navbar hamburger API;
- collapsible Sidebar API;
- public programmatic Drawer controller.

## Public JavaScript API

Public API tetap:

```js
RahardianmifUI.init()
```