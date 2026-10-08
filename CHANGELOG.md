# Changelog

## 0.5.0 — Modal + Overlays

### Added

- Modal Core based on the native `<dialog>` element.
- Modal dialog patterns for confirmation and alert use cases.
- Modal variants:
  - small;
  - large;
  - scrollable;
  - fullscreen.
- Static Modal backdrop behavior through `data-rm-modal-static`.
- Drawer / Offcanvas with `start` and `end` placement.
- Tooltip based on the native Popover API.
- Shared floating positioning foundation for Tooltip, Popover, and Dropdown.
- Popover for interactive contextual floating content.
- Dropdown Menu for application actions.
- Dropdown keyboard interaction:
  - Arrow Down;
  - Arrow Up;
  - Home;
  - End;
  - Enter;
  - Space;
  - Escape;
  - Tab;
  - typeahead.
- Disclosure primitive.
- Accordion composition with `single` and `multiple` modes.
- Accordion keyboard navigation:
  - Arrow Down;
  - Arrow Up;
  - Home;
  - End.
- Shared internal focus restoration.
- Shared reference-aware document scroll locking.
- Shared overlay stack ownership for Modal and Drawer.
- Shared interactive floating ownership for Popover and Dropdown.
- Overlay semantic color tokens.
- Reduced Motion handling for overlay/disclosure motion.
- Official v0.5 overlay examples.
- v0.5 component documentation.
- v0.5 unit contract coverage.
- v0.5 browser coverage across Chromium, Firefox, and WebKit.
- v0.5 Axe accessibility coverage.
- Overlay integration coverage.
- Unified v0.5 cumulative showcase coverage.

### Changed

- Unified showcase updated through v0.5.
- Documentation index updated through v0.5.
- Package metadata updated to `0.5.0`.
- JavaScript syntax release gate now includes all v0.5 component and internal overlay modules.
- Release contract now includes all frozen v0.5 Modal + Overlays components, examples, documentation, internal infrastructure, and metadata.

### Architecture

The public JavaScript API remains:

```js
RahardianmifUI.init()
```

v0.5 interactive behavior remains declarative through `data-rm-*` hooks.

Modal and Drawer share internal overlay infrastructure.

Tooltip, Popover, and Dropdown share internal floating infrastructure while keeping separate public semantics and behavior.

Disclosure remains independent from overlay ownership.

### Out of Scope

The following remain intentionally outside v0.5:

- Context Menu.
- Lightbox.
- Image Viewer.
- Navbar dropdown behavior.
- Mobile Navbar Drawer composition.
- Collapsible Sidebar behavior.
- Nested Accordion as an official supported composition.
- Dropdown submenus.
- Dropdown checkbox/radio menu items.

### Compatibility

No intentional breaking changes.

The following releases remain frozen:

- v0.1 Foundations + Tokens
- v0.2 Buttons + Basic Forms
- v0.3 Cards + Feedback
- v0.4 Navigation


## 0.4.0 — Navigation

### Added

- Breadcrumb.
- Horizontal Tabs.
- Pagination.
- Navbar.
- Sidebar.
- Declarative Tabs initialization through `data-rm-tabs`.
- Automatic Tabs activation.
- Tabs keyboard navigation:
  - Arrow Left
  - Arrow Right
  - Home
  - End
- Roving tabindex for Tabs.
- Tab / Tab Panel ARIA synchronization.
- Navigation documentation.
- Navigation examples.
- Navigation unit contract coverage.
- Navigation browser coverage across Chromium, Firefox, and WebKit.
- Navigation Axe accessibility coverage.
- Unified v0.4 Navigation showcase coverage.

### Changed

- Unified showcase updated through v0.4.
- Documentation index updated through v0.4.
- Package metadata updated to `0.4.0`.
- JavaScript syntax release gate now includes `src/js/components/tabs.js`.
- Release contract now includes all frozen Navigation components.

### Compatibility

No intentional breaking changes.

The following releases remain frozen:

- v0.1 Foundations + Tokens
- v0.2 Buttons + Basic Forms
- v0.3 Cards + Feedback

The public JavaScript API remains:

```js
RahardianmifUI.init()
```
