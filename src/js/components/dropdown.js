/*
 * Rahardianmif UI
 * Dropdown Menu
 *
 * v0.5.6
 *
 * Application action menu using:
 * - Native Popover API
 * - Shared floating foundation
 * - Roving tabindex
 * - Keyboard navigation
 * - Simple typeahead
 */

import {
  restoreFocus,
} from "../internal/focus.js";

import {
  positionFloating,
  setActiveInteractiveFloating,
  clearActiveInteractiveFloating,
} from "../internal/floating.js";


const initializedDropdowns =
  new WeakSet();

const initializedDropdownTriggers =
  new WeakSet();

const dropdownTriggers =
  new WeakMap();

const typeaheadStates =
  new WeakMap();


let activeDropdown = null;
let activeTrigger = null;

let updateFrame = null;

let globalListenersInitialized =
  false;


const TYPEAHEAD_TIMEOUT = 700;


/* ========================================
 * Collection
 * ======================================== */

function getDefaultRoot() {
  if (
    typeof document === "undefined"
  ) {
    return null;
  }

  return document;
}


function collectElements(
  root,
  selector
) {
  if (
    !root
    ||
    typeof root.querySelectorAll
      !==
      "function"
  ) {
    return [];
  }

  const elements = [];

  if (
    root.matches
    &&
    root.matches(selector)
  ) {
    elements.push(root);
  }

  elements.push(
    ...root.querySelectorAll(
      selector
    )
  );

  return elements;
}


function collectDropdowns(root) {
  return collectElements(
    root,
    "[data-rm-dropdown]"
  );
}


function collectDropdownTriggers(
  root
) {
  return collectElements(
    root,
    "[data-rm-dropdown-trigger]"
  );
}


/* ========================================
 * Validation
 * ======================================== */

function isValidDropdown(
  dropdown
) {
  return Boolean(
    dropdown
    &&
    dropdown.hasAttribute(
      "data-rm-dropdown"
    )
    &&
    dropdown.getAttribute(
      "popover"
    )
      ===
      "manual"
    &&
    dropdown.getAttribute(
      "role"
    )
      ===
      "menu"
    &&
    typeof dropdown.showPopover
      ===
      "function"
    &&
    typeof dropdown.hidePopover
      ===
      "function"
  );
}


function isDropdownOpen(
  dropdown
) {
  if (!dropdown) {
    return false;
  }

  try {
    return dropdown.matches(
      ":popover-open"
    );
  } catch {
    return false;
  }
}


function getDropdownFromTrigger(
  trigger
) {
  if (
    typeof document === "undefined"
  ) {
    return null;
  }

  const dropdownId =
    trigger
      .getAttribute(
        "data-rm-dropdown-trigger"
      )
      ?.trim();

  if (!dropdownId) {
    return null;
  }

  const dropdown =
    document.getElementById(
      dropdownId
    );

  return isValidDropdown(
    dropdown
  )
    ? dropdown
    : null;
}


/* ========================================
 * Placement / Alignment
 * ======================================== */

function getPreferredPlacement(
  dropdown
) {
  const placement =
    dropdown
      .getAttribute(
        "data-rm-dropdown-placement"
      )
      ?.trim();

  if (
    placement === "top"
    ||
    placement === "bottom"
    ||
    placement === "start"
    ||
    placement === "end"
  ) {
    return placement;
  }

  return "bottom";
}


function getPreferredAlignment(
  dropdown
) {
  const alignment =
    dropdown
      .getAttribute(
        "data-rm-dropdown-align"
      )
      ?.trim();

  if (
    alignment === "start"
    ||
    alignment === "center"
    ||
    alignment === "end"
  ) {
    return alignment;
  }

  return "start";
}


/* ========================================
 * Items
 * ======================================== */

function getMenuItems(
  dropdown
) {
  if (!dropdown) {
    return [];
  }

  return Array.from(
    dropdown.querySelectorAll(
      '[role="menuitem"]'
    )
  );
}


function isItemDisabled(
  item
) {
  return Boolean(
    !item
    ||
    item.getAttribute(
      "aria-disabled"
    )
      ===
      "true"
    ||
    item.disabled === true
  );
}


function getEnabledItems(
  dropdown
) {
  return getMenuItems(
    dropdown
  ).filter(
    (item) =>
      !isItemDisabled(item)
  );
}


function prepareMenuItems(
  dropdown
) {
  const items =
    getMenuItems(
      dropdown
    );

  for (
    const item
    of items
  ) {
    item.tabIndex = -1;
  }
}


function setActiveItem(
  dropdown,
  item,
  {
    focus = true,
  } = {}
) {
  if (
    !dropdown
    ||
    !item
    ||
    isItemDisabled(item)
  ) {
    return;
  }

  const items =
    getMenuItems(
      dropdown
    );

  for (
    const menuItem
    of items
  ) {
    menuItem.tabIndex =
      menuItem === item
        ? 0
        : -1;
  }

  if (!focus) {
    return;
  }

  try {
    item.focus({
      preventScroll: true,
    });
  } catch {
    try {
      item.focus();
    } catch {
      /*
       * Roving focus is best-effort.
       */
    }
  }
}


function focusFirstItem(
  dropdown
) {
  const items =
    getEnabledItems(
      dropdown
    );

  if (
    items.length === 0
  ) {
    return;
  }

  setActiveItem(
    dropdown,
    items[0]
  );
}


function focusLastItem(
  dropdown
) {
  const items =
    getEnabledItems(
      dropdown
    );

  if (
    items.length === 0
  ) {
    return;
  }

  setActiveItem(
    dropdown,
    items[
      items.length - 1
    ]
  );
}


function focusRelativeItem(
  dropdown,
  direction
) {
  const items =
    getEnabledItems(
      dropdown
    );

  if (
    items.length === 0
  ) {
    return;
  }

  const current =
    document.activeElement;

  let currentIndex =
    items.indexOf(
      current
    );

  if (
    currentIndex === -1
  ) {
    currentIndex =
      direction > 0
        ? -1
        : 0;
  }

  const nextIndex =
    (
      currentIndex
      +
      direction
      +
      items.length
    )
    %
    items.length;

  setActiveItem(
    dropdown,
    items[nextIndex]
  );
}


/* ========================================
 * ARIA
 * ======================================== */

function setTriggerExpanded(
  trigger,
  expanded
) {
  if (!trigger) {
    return;
  }

  trigger.setAttribute(
    "aria-expanded",
    expanded
      ? "true"
      : "false"
  );
}


/* ========================================
 * Typeahead
 * ======================================== */

function getTypeaheadState(
  dropdown
) {
  let state =
    typeaheadStates.get(
      dropdown
    );

  if (state) {
    return state;
  }

  state = {
    buffer: "",
    lastTime: 0,
  };

  typeaheadStates.set(
    dropdown,
    state
  );

  return state;
}


function getItemText(
  item
) {
  return (
    item.textContent
      ?.trim()
      .replace(
        /\s+/g,
        " "
      )
      .toLocaleLowerCase()
    ??
    ""
  );
}


function findTypeaheadMatch(
  items,
  search,
  current
) {
  if (
    items.length === 0
    ||
    !search
  ) {
    return null;
  }

  const currentIndex =
    items.indexOf(
      current
    );

  const startIndex =
    currentIndex === -1
      ? 0
      : (
        currentIndex + 1
      )
      %
      items.length;

  for (
    let offset = 0;
    offset < items.length;
    offset += 1
  ) {
    const index =
      (
        startIndex
        +
        offset
      )
      %
      items.length;

    const item =
      items[index];

    if (
      getItemText(item)
        .startsWith(
          search
        )
    ) {
      return item;
    }
  }

  return null;
}


function handleTypeahead(
  event,
  dropdown
) {
  if (
    event.key.length !== 1
    ||
    event.ctrlKey
    ||
    event.altKey
    ||
    event.metaKey
  ) {
    return false;
  }

  const character =
    event.key
      .toLocaleLowerCase();

  /*
   * Space belongs to menu item
   * activation, not typeahead.
   */
  if (
    character === " "
  ) {
    return false;
  }

  const state =
    getTypeaheadState(
      dropdown
    );

  const now =
    Date.now();

  const expired =
    now
    -
    state.lastTime
    >
    TYPEAHEAD_TIMEOUT;

  const repeatedSingleCharacter =
    !expired
    &&
    state.buffer.length === 1
    &&
    state.buffer === character;

  if (
    expired
    ||
    repeatedSingleCharacter
  ) {
    state.buffer =
      character;
  } else {
    state.buffer +=
      character;
  }

  state.lastTime =
    now;

  const items =
    getEnabledItems(
      dropdown
    );

  let match =
    findTypeaheadMatch(
      items,
      state.buffer,
      document.activeElement
    );

  /*
   * If a multi-character sequence has
   * no match, fall back to its newest
   * character.
   */
  if (
    !match
    &&
    state.buffer.length > 1
  ) {
    state.buffer =
      character;

    match =
      findTypeaheadMatch(
        items,
        state.buffer,
        document.activeElement
      );
  }

  if (!match) {
    return false;
  }

  event.preventDefault();

  setActiveItem(
    dropdown,
    match
  );

  return true;
}


/* ========================================
 * Position
 * ======================================== */

function updateActiveDropdownPosition() {
  if (
    !activeDropdown
    ||
    !activeTrigger
  ) {
    return;
  }

  if (
    !activeDropdown.isConnected
    ||
    !activeTrigger.isConnected
    ||
    !isDropdownOpen(
      activeDropdown
    )
  ) {
    hideDropdown(
      activeDropdown,
      {
        restoreTriggerFocus:
          false,
      }
    );

    return;
  }

  positionFloating(
    activeTrigger,
    activeDropdown,
    {
      placement:
        getPreferredPlacement(
          activeDropdown
        ),

      alignment:
        getPreferredAlignment(
          activeDropdown
        ),
    }
  );
}


function schedulePositionUpdate() {
  if (
    updateFrame !== null
  ) {
    return;
  }

  updateFrame =
    window.requestAnimationFrame(
      () => {
        updateFrame =
          null;

        updateActiveDropdownPosition();
      }
    );
}


/* ========================================
 * Open / Close
 * ======================================== */

function showDropdown(
  dropdown,
  trigger,
  {
    focus = "first",
  } = {}
) {
  if (
    !isValidDropdown(
      dropdown
    )
    ||
    !trigger
    ||
    !trigger.isConnected
  ) {
    return;
  }

  if (
    isDropdownOpen(
      dropdown
    )
  ) {
    return;
  }

  prepareMenuItems(
    dropdown
  );

  try {
    dropdown.showPopover();
  } catch {
    return;
  }

  dropdownTriggers.set(
    dropdown,
    trigger
  );

  setTriggerExpanded(
    trigger,
    true
  );

  setActiveInteractiveFloating({
    element:
      dropdown,

    trigger,

    type:
      "dropdown",

    close:
      () => {
        hideDropdown(
          dropdown,
          {
            restoreTriggerFocus:
              false,
          }
        );
      },
  });

  activeDropdown =
    dropdown;

  activeTrigger =
    trigger;

  updateActiveDropdownPosition();

  if (
    focus === "last"
  ) {
    focusLastItem(
      dropdown
    );
  } else {
    focusFirstItem(
      dropdown
    );
  }
}


function hideDropdown(
  dropdown,
  {
    restoreTriggerFocus =
      false,
  } = {}
) {
  if (!dropdown) {
    return;
  }

  const trigger =
    dropdownTriggers.get(
      dropdown
    )
    ??
    (
      activeDropdown
        ===
        dropdown
        ? activeTrigger
        : null
    );

  try {
    if (
      isDropdownOpen(
        dropdown
      )
    ) {
      dropdown.hidePopover();
    }
  } catch {
    /*
     * Native state may already have
     * changed.
     */
  }

  setTriggerExpanded(
    trigger,
    false
  );

  prepareMenuItems(
    dropdown
  );

  clearActiveInteractiveFloating(
    dropdown
  );

  if (
    activeDropdown
      ===
      dropdown
  ) {
    activeDropdown =
      null;

    activeTrigger =
      null;
  }

  if (
    restoreTriggerFocus
  ) {
    restoreFocus(
      trigger
    );
  }
}


function toggleDropdown(
  dropdown,
  trigger
) {
  if (
    isDropdownOpen(
      dropdown
    )
  ) {
    hideDropdown(
      dropdown,
      {
        restoreTriggerFocus:
          false,
      }
    );

    return;
  }

  showDropdown(
    dropdown,
    trigger,
    {
      focus: "first",
    }
  );
}


/* ========================================
 * Helpers
 * ======================================== */

function isEventWithin(
  event,
  element
) {
  if (
    !event
    ||
    !element
  ) {
    return false;
  }

  if (
    typeof event.composedPath
      ===
      "function"
  ) {
    return event
      .composedPath()
      .includes(
        element
      );
  }

  const target =
    event.target;

  return Boolean(
    target
    &&
    element.contains(
      target
    )
  );
}


function getMenuItemFromEvent(
  event,
  dropdown
) {
  const target =
    event.target;

  if (
    !target
    ||
    typeof target.closest
      !==
      "function"
  ) {
    return null;
  }

  const item =
    target.closest(
      '[role="menuitem"]'
    );

  if (
    !item
    ||
    !dropdown.contains(
      item
    )
  ) {
    return null;
  }

  return item;
}


/* ========================================
 * Dropdown Events
 * ======================================== */

function handleDropdownClick(
  event,
  dropdown
) {
  const item =
    getMenuItemFromEvent(
      event,
      dropdown
    );

  if (!item) {
    return;
  }

  if (
    isItemDisabled(
      item
    )
  ) {
    event.preventDefault();

    return;
  }

  const isNavigationLink =
    item.tagName === "A"
    &&
    item.hasAttribute(
      "href"
    );

  hideDropdown(
    dropdown,
    {
      restoreTriggerFocus:
        !isNavigationLink,
    }
  );
}


function activateMenuItem(
  event,
  item
) {
  if (
    !item
    ||
    isItemDisabled(
      item
    )
  ) {
    event.preventDefault();

    return;
  }

  event.preventDefault();

  try {
    item.click();
  } catch {
    /*
     * Activation must fail safely.
     */
  }
}


function handleDropdownKeydown(
  event,
  dropdown
) {
  const item =
    getMenuItemFromEvent(
      event,
      dropdown
    );

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();

      focusRelativeItem(
        dropdown,
        1
      );

      return;


    case "ArrowUp":
      event.preventDefault();

      focusRelativeItem(
        dropdown,
        -1
      );

      return;


    case "Home":
      event.preventDefault();

      focusFirstItem(
        dropdown
      );

      return;


    case "End":
      event.preventDefault();

      focusLastItem(
        dropdown
      );

      return;


    case "Enter":
    case " ":
      if (item) {
        activateMenuItem(
          event,
          item
        );
      }

      return;


    case "Tab":
      /*
       * Restore focus to the trigger before
       * allowing native Tab navigation to
       * continue from that point.
       *
       * Do not preventDefault().
       */
      hideDropdown(
        dropdown,
        {
          restoreTriggerFocus:
            true,
        }
      );

      return;


    default:
      handleTypeahead(
        event,
        dropdown
      );
  }
}


function handleDropdownToggle(
  event,
  dropdown
) {
  if (
    event.newState
      !==
      "closed"
  ) {
    return;
  }

  const trigger =
    dropdownTriggers.get(
      dropdown
    );

  setTriggerExpanded(
    trigger,
    false
  );

  prepareMenuItems(
    dropdown
  );

  clearActiveInteractiveFloating(
    dropdown
  );

  if (
    activeDropdown
      ===
      dropdown
  ) {
    activeDropdown =
      null;

    activeTrigger =
      null;
  }
}


/* ========================================
 * Global Events
 * ======================================== */

function handleGlobalPointerDown(
  event
) {
  if (
    !activeDropdown
    ||
    !activeTrigger
  ) {
    return;
  }

  if (
    isEventWithin(
      event,
      activeDropdown
    )
    ||
    isEventWithin(
      event,
      activeTrigger
    )
  ) {
    return;
  }

  hideDropdown(
    activeDropdown,
    {
      restoreTriggerFocus:
        false,
    }
  );
}


function handleGlobalKeydown(
  event
) {
  if (
    event.key !== "Escape"
    ||
    !activeDropdown
  ) {
    return;
  }

  event.preventDefault();

  /*
   * Prevent parent Modal/Drawer from
   * consuming this same Escape press.
   */
  event.stopImmediatePropagation();

  hideDropdown(
    activeDropdown,
    {
      restoreTriggerFocus:
        true,
    }
  );
}


/* ========================================
 * Trigger
 * ======================================== */

function initializeDropdownTrigger(
  trigger
) {
  if (
    initializedDropdownTriggers.has(
      trigger
    )
  ) {
    return;
  }

  const dropdown =
    getDropdownFromTrigger(
      trigger
    );

  setTriggerExpanded(
    trigger,
    Boolean(
      dropdown
      &&
      isDropdownOpen(
        dropdown
      )
    )
  );

  trigger.addEventListener(
    "click",
    (event) => {
      const targetDropdown =
        getDropdownFromTrigger(
          trigger
        );

      if (
        !targetDropdown
      ) {
        return;
      }

      event.preventDefault();

      toggleDropdown(
        targetDropdown,
        trigger
      );
    }
  );

  trigger.addEventListener(
    "keydown",
    (event) => {
      const targetDropdown =
        getDropdownFromTrigger(
          trigger
        );

      if (
        !targetDropdown
      ) {
        return;
      }

      if (
        event.key === "ArrowDown"
      ) {
        event.preventDefault();

        if (
          isDropdownOpen(
            targetDropdown
          )
        ) {
          focusFirstItem(
            targetDropdown
          );

          return;
        }

        showDropdown(
          targetDropdown,
          trigger,
          {
            focus: "first",
          }
        );

        return;
      }

      if (
        event.key === "ArrowUp"
      ) {
        event.preventDefault();

        if (
          isDropdownOpen(
            targetDropdown
          )
        ) {
          focusLastItem(
            targetDropdown
          );

          return;
        }

        showDropdown(
          targetDropdown,
          trigger,
          {
            focus: "last",
          }
        );
      }
    }
  );

  initializedDropdownTriggers.add(
    trigger
  );
}


/* ========================================
 * Initialization
 * ======================================== */

function initializeDropdown(
  dropdown
) {
  if (
    initializedDropdowns.has(
      dropdown
    )
  ) {
    /*
     * Items may have been inserted since
     * the previous init call.
     */
    prepareMenuItems(
      dropdown
    );

    return;
  }

  prepareMenuItems(
    dropdown
  );

  dropdown.addEventListener(
    "click",
    (event) => {
      handleDropdownClick(
        event,
        dropdown
      );
    }
  );

  dropdown.addEventListener(
    "keydown",
    (event) => {
      handleDropdownKeydown(
        event,
        dropdown
      );
    }
  );

  dropdown.addEventListener(
    "toggle",
    (event) => {
      handleDropdownToggle(
        event,
        dropdown
      );
    }
  );

  initializedDropdowns.add(
    dropdown
  );
}


function initializeGlobalListeners() {
  if (
    globalListenersInitialized
    ||
    typeof window === "undefined"
    ||
    typeof document === "undefined"
  ) {
    return;
  }

  document.addEventListener(
    "pointerdown",
    handleGlobalPointerDown,
    true
  );

  document.addEventListener(
    "keydown",
    handleGlobalKeydown,
    true
  );

  window.addEventListener(
    "resize",
    schedulePositionUpdate,
    {
      passive: true,
    }
  );

  window.addEventListener(
    "scroll",
    schedulePositionUpdate,
    {
      passive: true,
      capture: true,
    }
  );

  if (
    window.visualViewport
  ) {
    window.visualViewport.addEventListener(
      "resize",
      schedulePositionUpdate,
      {
        passive: true,
      }
    );

    window.visualViewport.addEventListener(
      "scroll",
      schedulePositionUpdate,
      {
        passive: true,
      }
    );
  }

  globalListenersInitialized =
    true;
}


function initDropdowns(
  root =
    getDefaultRoot()
) {
  if (!root) {
    return;
  }

  initializeGlobalListeners();

  const dropdowns =
    collectDropdowns(
      root
    );

  for (
    const dropdown
    of dropdowns
  ) {
    initializeDropdown(
      dropdown
    );
  }

  const triggers =
    collectDropdownTriggers(
      root
    );

  for (
    const trigger
    of triggers
  ) {
    initializeDropdownTrigger(
      trigger
    );
  }
}


export {
  initDropdowns,
};