# Tooltip

## Version

Introduced in:

```text
v0.5.4 — Tooltip + Floating Foundation
```

Part of:

```text
v0.5.0 — Modal + Overlays
```

## Purpose

Tooltip menampilkan informasi singkat dan non-interactive yang berkaitan dengan sebuah trigger.

Tooltip cocok digunakan untuk:

- penjelasan icon;
- nama action;
- contextual hint singkat;
- supplementary information.

Tooltip bukan container untuk interactive controls.

## Public CSS API

```text
.rm-tooltip
```

## Declarative Hooks

Trigger:

```html
<button
    type="button"
    data-rm-tooltip-trigger="save-tooltip"
>
    Save
</button>
```

Tooltip:

```html
<div
    id="save-tooltip"
    class="rm-tooltip"
    data-rm-tooltip
    popover="manual"
    role="tooltip"
>
    Save changes
</div>
```

## Example

```html
<button
    class="rm-button rm-button--secondary"
    type="button"
    data-rm-tooltip-trigger="help-tooltip"
>
    Help
</button>

<div
    id="help-tooltip"
    class="rm-tooltip"
    data-rm-tooltip
    data-rm-tooltip-placement="top"
    popover="manual"
    role="tooltip"
>
    Additional information.
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

Contoh:

```html
data-rm-tooltip-placement="top"
```

## Behavior

Tooltip dapat ditampilkan melalui:

- pointer hover;
- keyboard focus.

Tooltip ditutup ketika interaction yang membutuhkannya berakhir.

Tooltip bersifat non-interactive.

## Semantics

Tooltip menggunakan:

```html
role="tooltip"
```

Floating surface menggunakan native Popover API:

```html
popover="manual"
```

## Focus Management

Tooltip tidak menerima focus.

Focus tetap berada pada trigger.

Tooltip tidak memindahkan keyboard focus ke floating surface.

## Keyboard

Focus pada trigger dapat menampilkan Tooltip.

Escape dapat menutup active Tooltip.

Tooltip tidak menggunakan menu atau dialog keyboard pattern.

## Interactive Content

Jangan menempatkan interactive element seperti:

```text
button
link
input
select
textarea
menu action
```

di dalam Tooltip.

Gunakan Popover jika content membutuhkan interaction.

## Floating Positioning

Tooltip menggunakan shared internal floating positioning infrastructure.

Floating engine merupakan internal implementation detail dan bukan public API.

## Multiple Instances

Beberapa Tooltip dapat tersedia dalam satu halaman.

Hanya active Tooltip yang relevan yang ditampilkan.

Initialization tetap idempotent.

## Accessibility

Tooltip harus:

- menggunakan `role="tooltip"`;
- mempunyai ID unik;
- mempunyai trigger yang sesuai;
- dapat digunakan melalui keyboard;
- tidak hanya bergantung pada hover pointer.

## Theme

Tooltip mendukung:

```text
Light
Dark
System
```

## Responsive

Floating positioning menyesuaikan trigger dan viewport.

## Motion

Tooltip menggunakan lightweight motion.

Reduced Motion harus dihormati.

## Difference from Popover

Tooltip:

```text
Non-interactive
role="tooltip"
Focus tetap pada trigger
Informasi singkat
```

Popover:

```text
Interactive
Contextual floating surface
Dapat berisi interactive controls
Dialog-like semantics
```

## Out of Scope

Tooltip tidak menyediakan:

- form;
- interactive actions;
- menu behavior;
- dialog behavior;
- document scroll locking;
- blocking backdrop.

## Public JavaScript API

Public API tetap:

```js
RahardianmifUI.init()
```