# Changelog

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