# Popover

## Version

Introduced in:

```text
v0.5.5 — Popover
```

Part of:

```text
v0.5.0 — Modal + Overlays
```

## Purpose

Popover adalah interactive contextual floating surface.

Popover digunakan ketika content membutuhkan interaction tetapi tidak membutuhkan blocking Modal.

Contoh penggunaan:

- profile preview;
- contextual settings;
- quick information;
- contextual controls;
- compact action panel.

## Public CSS API

```text
.rm-popover

.rm-popover__header
.rm-popover__title
.rm-popover__body
.rm-popover__footer
.rm-popover__close
```

## Declarative Hooks

Trigger:

```html
<button
    type="button"
    data-rm-popover-trigger="profile-popover"
    aria-haspopup="dialog"
    aria-controls="profile-popover"
    aria-expanded="false"
>
    Profile
</button>
```

Popover:

```html
<div
    id="profile-popover"
    class="rm-popover"
    data-rm-popover
    popover="manual"
    role="dialog"
    aria-labelledby="profile-popover-title"
>
    ...
</div>
```

Close control:

```html
<button
    type="button"
    data-rm-popover-close
>
    Close
</button>
```

## Example

```html
<button
    class="rm-button rm-button--secondary"
    type="button"
    data-rm-popover-trigger="profile-popover"
    aria-haspopup="dialog"
    aria-controls="profile-popover"
    aria-expanded="false"
>
    Profile
</button>

<div
    id="profile-popover"
    class="rm-popover"
    data-rm-popover
    data-rm-popover-placement="bottom"
    popover="manual"
    role="dialog"
    aria-labelledby="profile-popover-title"
>
    <header class="rm-popover__header">
        <h2
            id="profile-popover-title"
            class="rm-popover__title"
        >
            Profile
        </h2>

        <button
            class="rm-popover__close"
            type="button"
            data-rm-popover-close
            aria-label="Close popover"
        >
            ×
        </button>
    </header>

    <div class="rm-popover__body">
        Interactive contextual content.
    </div>
</div>
```

## Placement

Supported placement:

```text
top
bottom
start
end
```

Example:

```html
data-rm-popover-placement="bottom"
```

## Behavior

Popover menggunakan native Popover API dalam manual mode:

```html
popover="manual"
```

Rahardianmif UI menangani:

- declarative trigger;
- `aria-expanded` synchronization;
- floating positioning;
- explicit close;
- Escape;
- outside pointer dismissal;
- interactive floating ownership;
- focus restoration pada dismissal yang memerlukannya.

## Focus Management

Membuka Popover tidak memaksa focus berpindah dari trigger.

Jika content menyediakan `autofocus`, elemen tersebut dapat menjadi initial focus target.

Explicit close dapat mengembalikan focus ke trigger.

Escape dapat mengembalikan focus sesuai ownership.

Outside pointer dismissal tidak memaksa focus kembali ke trigger.

## Keyboard

Escape menutup active Popover.

Interactive elements di dalam Popover tetap menggunakan native keyboard behavior masing-masing.

Popover tidak menggunakan keyboard pattern `menu`.

Jika content berupa application action menu, gunakan Dropdown Menu.

## Outside Pointer

Pointer interaction di luar active Popover dapat menutup Popover.

## Interactive Floating Ownership

Popover dan Dropdown berbagi internal interactive floating ownership.

Membuka floating surface interaktif lain dapat menutup owner sebelumnya.

Tooltip tetap mempunyai non-interactive behavior sendiri.

## Accessibility

Recommended trigger:

```html
aria-haspopup="dialog"
aria-expanded="false"
aria-controls="popover-id"
```

Recommended Popover:

```html
role="dialog"
aria-labelledby="popover-title"
```

Accessible name juga dapat diberikan menggunakan:

```html
aria-label
```

## Theme

Popover mendukung:

```text
Light
Dark
System
```

## Responsive

Floating positioning menyesuaikan trigger dan viewport.

## Motion

Popover menggunakan lightweight entrance dan exit motion.

Reduced Motion harus dihormati.

## Multiple Instances

Beberapa Popover dapat tersedia dalam satu halaman.

Setiap instance harus mempunyai ID unik.

## Difference from Tooltip

Tooltip:

```text
Non-interactive
role="tooltip"
Focus tetap pada trigger
```

Popover:

```text
Interactive
role="dialog"
Dapat berisi interactive controls
```

## Difference from Dropdown

Popover tidak menggunakan:

```text
role="menu"
role="menuitem"
Arrow-key menu navigation
Menu typeahead behavior
```

Gunakan Dropdown Menu untuk application action menu.

## Scroll Lock

Popover tidak mengunci document scrolling.

## Backdrop

Popover tidak menggunakan blocking backdrop.

## Out of Scope

v0.5 tidak menyediakan:

- blocking Popover;
- nested Popover contract;
- menu semantics;
- Modal behavior;
- scroll locking.

## Public JavaScript API

Public API tetap:

```js
RahardianmifUI.init()
```