# Modal

## Version

Introduced in:

```text
v0.5.1 — Modal Core
v0.5.2 — Dialog Patterns + Modal Variants
```

Part of:

```text
v0.5.0 — Modal + Overlays
```

## Purpose

Modal adalah blocking dialog yang digunakan ketika sebuah interaction membutuhkan perhatian pengguna sebelum kembali ke halaman utama.

Modal cocok digunakan untuk:

- form singkat;
- confirmation dialog;
- alert dialog;
- contextual workflow;
- detail yang membutuhkan blocking interaction.

Modal menggunakan native HTML `<dialog>` sebagai foundation.

## Public CSS API

```text
.rm-modal

.rm-modal__header
.rm-modal__title
.rm-modal__body
.rm-modal__footer
.rm-modal__close

.rm-modal--sm
.rm-modal--lg
.rm-modal--scrollable
.rm-modal--fullscreen
```

Tidak ada public `.is-open` state.

Open state mengikuti native `<dialog>`.

## Declarative Hooks

Modal:

```html
<dialog
    id="example-modal"
    class="rm-modal"
    data-rm-modal
>
    ...
</dialog>
```

Trigger:

```html
<button
    type="button"
    data-rm-modal-trigger="example-modal"
>
    Open Modal
</button>
```

Close control:

```html
<button
    type="button"
    data-rm-modal-close
>
    Close
</button>
```

Static backdrop dapat dideklarasikan menggunakan hook yang disediakan Modal contract.

## Basic Example

```html
<button
    class="rm-button rm-button--primary"
    type="button"
    data-rm-modal-trigger="profile-modal"
>
    Open Modal
</button>

<dialog
    id="profile-modal"
    class="rm-modal"
    data-rm-modal
    aria-labelledby="profile-modal-title"
>
    <header class="rm-modal__header">
        <h2
            id="profile-modal-title"
            class="rm-modal__title"
        >
            Edit Profile
        </h2>

        <button
            class="rm-modal__close"
            type="button"
            data-rm-modal-close
            aria-label="Close modal"
        >
            ×
        </button>
    </header>

    <div class="rm-modal__body">
        Modal content.
    </div>

    <footer class="rm-modal__footer">
        <button
            class="rm-button rm-button--secondary"
            type="button"
            data-rm-modal-close
        >
            Close
        </button>
    </footer>
</dialog>
```

## Sizes

Small:

```html
<dialog
    class="rm-modal rm-modal--sm"
    data-rm-modal
>
```

Default:

```html
<dialog
    class="rm-modal"
    data-rm-modal
>
```

Large:

```html
<dialog
    class="rm-modal rm-modal--lg"
    data-rm-modal
>
```

## Variants

Scrollable:

```html
<dialog
    class="rm-modal rm-modal--scrollable"
    data-rm-modal
>
```

Fullscreen:

```html
<dialog
    class="rm-modal rm-modal--fullscreen"
    data-rm-modal
>
```

## Dialog Patterns

Confirmation Dialog dan Alert Dialog merupakan composition dari Modal Core.

Tidak ada public JavaScript API khusus untuk Confirmation Dialog atau Alert Dialog.

Contoh:

```html
<dialog
    id="delete-dialog"
    class="rm-modal rm-modal--sm"
    data-rm-modal
    aria-labelledby="delete-dialog-title"
>
    <header class="rm-modal__header">
        <h2
            id="delete-dialog-title"
            class="rm-modal__title"
        >
            Delete Item?
        </h2>
    </header>

    <div class="rm-modal__body">
        This action cannot be undone.
    </div>

    <footer class="rm-modal__footer">
        <button
            class="rm-button rm-button--secondary"
            type="button"
            data-rm-modal-close
        >
            Cancel
        </button>

        <button
            class="rm-button rm-button--danger"
            type="button"
        >
            Delete
        </button>
    </footer>
</dialog>
```

## Behavior

Modal menggunakan native dialog behavior melalui:

```js
showModal()
close()
```

Rahardianmif UI menangani:

- declarative trigger;
- explicit close;
- backdrop dismissal;
- static backdrop behavior;
- focus restoration;
- document scroll locking;
- blocking overlay ownership;
- multiple instances;
- integration dengan Drawer.

## Focus Management

Native `<dialog>` menjadi foundation focus behavior.

Jika markup menyediakan `autofocus`, browser dapat menggunakan elemen tersebut sebagai initial focus target.

Setelah Modal ditutup, focus dikembalikan ke trigger pembuka jika trigger tersebut masih tersedia.

Rahardianmif UI tidak menambahkan custom focus trap apabila native dialog behavior telah mencukupi.

## Keyboard

### Escape

Escape menutup Modal sesuai native dialog behavior selama dismissal tidak dibatasi oleh static Modal behavior.

### Tab

Keyboard navigation mengikuti native modal dialog behavior.

## Backdrop

Modal normal dapat ditutup melalui backdrop.

Static Modal mempertahankan dialog ketika backdrop dismissal tidak diperbolehkan.

## Scroll Lock

Ketika blocking overlay aktif, document scrolling dikunci.

Scroll locking menggunakan shared reference-aware internal infrastructure sehingga multiple blocking overlays tidak membuka document scroll terlalu dini.

## Overlay Stack

Modal dan Drawer berbagi internal overlay stack.

Stack digunakan untuk menentukan ownership blocking overlay yang aktif.

## Accessibility

Modal harus memiliki accessible name menggunakan:

```html
aria-labelledby
```

atau:

```html
aria-label
```

Contoh:

```html
<dialog
    class="rm-modal"
    data-rm-modal
    aria-labelledby="modal-title"
>
    <h2 id="modal-title">
        Modal Title
    </h2>
</dialog>
```

Icon-only close control harus mempunyai accessible label.

Contoh:

```html
<button
    type="button"
    data-rm-modal-close
    aria-label="Close modal"
>
    ×
</button>
```

## Theme

Modal mendukung:

```text
Light
Dark
System
```

Styling menggunakan semantic tokens.

## Responsive

Modal tetap dibatasi terhadap viewport.

Fullscreen variant tersedia untuk workflow yang membutuhkan area lebih besar.

## Motion

Modal menggunakan motion token Rahardianmif UI.

Reduced Motion harus dihormati melalui `prefers-reduced-motion`.

Motion bukan source of truth untuk open state.

## Multiple Instances

Beberapa Modal dapat tersedia dalam satu halaman.

Setiap Modal harus menggunakan ID unik.

## Out of Scope

v0.5 tidak menyediakan:

- draggable Modal;
- resizable Modal;
- custom focus trap API;
- public Modal controller API;
- Lightbox;
- Image Viewer.

## Public JavaScript API

Tidak ada top-level Modal API baru.

Public API tetap:

```js
RahardianmifUI.init()
```