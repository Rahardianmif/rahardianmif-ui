/*
 * Rahardianmif UI
 * Popover Component
 *
 * v0.5.5
 *
 * Interactive contextual floating surface.
 * Native Popover API foundation.
 */

import {
  restoreFocus,
} from "../internal/focus.js";

import {
  positionFloating,
  setActiveInteractiveFloating,
  clearActiveInteractiveFloating,
} from "../internal/floating.js";


const initializedPopovers =
  new WeakSet();

const initializedPopoverTriggers =
  new WeakSet();

const popoverTriggers =
  new WeakMap();

const pendingFocusRestores =
  new WeakMap();


let activePopover = null;
let activeTrigger = null;

let updateFrame = null;

let globalListenersInitialized =
  false;


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


function collectPopovers(
  root
) {
  return collectElements(
    root,
    "[data-rm-popover]"
  );
}


function collectPopoverTriggers(
  root
) {
  return collectElements(
    root,
    "[data-rm-popover-trigger]"
  );
}


/* ========================================
 * Validation
 * ======================================== */

function isValidPopover(
  popover
) {
  return Boolean(
    popover
    &&
    popover.hasAttribute(
      "data-rm-popover"
    )
    &&
    popover.getAttribute(
      "popover"
    )
      ===
      "manual"
    &&
    typeof popover.showPopover
      ===
      "function"
    &&
    typeof popover.hidePopover
      ===
      "function"
  );
}


function isPopoverOpen(
  popover
) {
  if (!popover) {
    return false;
  }

  try {
    return popover.matches(
      ":popover-open"
    );
  } catch {
    return false;
  }
}


function getPopoverFromTrigger(
  trigger
) {
  if (
    typeof document === "undefined"
  ) {
    return null;
  }

  const popoverId =
    trigger
      .getAttribute(
        "data-rm-popover-trigger"
      )
      ?.trim();

  if (!popoverId) {
    return null;
  }

  const popover =
    document.getElementById(
      popoverId
    );

  return isValidPopover(
    popover
  )
    ? popover
    : null;
}


function getPreferredPlacement(
  popover
) {
  const placement =
    popover
      .getAttribute(
        "data-rm-popover-placement"
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
 * Focus
 * ======================================== */

function focusAutofocusElement(
  popover
) {
  const autofocusTarget =
    popover.querySelector(
      "[autofocus]"
    );

  if (
    !autofocusTarget
    ||
    typeof autofocusTarget.focus
      !==
      "function"
    ||
    autofocusTarget.disabled
      ===
      true
  ) {
    return;
  }

  try {
    autofocusTarget.focus({
      preventScroll: true,
    });
  } catch {
    try {
      autofocusTarget.focus();
    } catch {
      /*
       * Explicit autofocus is best-effort.
       */
    }
  }
}


function isFocusInside(
  popover
) {
  if (
    typeof document === "undefined"
  ) {
    return false;
  }

  const focused =
    document.activeElement;

  return Boolean(
    focused
    &&
    popover.contains(
      focused
    )
  );
}


function restorePendingPopoverFocus(
  popover
) {
  const trigger =
    pendingFocusRestores.get(
      popover
    );

  pendingFocusRestores.delete(
    popover
  );

  if (!trigger) {
    return;
  }

  const restore =
    () => {
      /*
       * Do not steal focus if the Popover
       * has been opened again before the
       * deferred restoration executes.
       */
      if (
        isPopoverOpen(
          popover
        )
      ) {
        return;
      }

      restoreFocus(
        trigger
      );
    };

  /*
   * Native Popover focus settlement differs
   * slightly between engines. Restore on the
   * next frame after the native closed toggle.
   */
  if (
    typeof window !== "undefined"
    &&
    typeof window.requestAnimationFrame
      ===
      "function"
  ) {
    window.requestAnimationFrame(
      restore
    );

    return;
  }

  if (
    typeof queueMicrotask
      ===
      "function"
  ) {
    queueMicrotask(
      restore
    );

    return;
  }

  Promise.resolve().then(
    restore
  );
}


/* ========================================
 * Position
 * ======================================== */

function updateActivePopoverPosition() {
  if (
    !activePopover
    ||
    !activeTrigger
  ) {
    return;
  }

  if (
    !activePopover.isConnected
    ||
    !activeTrigger.isConnected
    ||
    !isPopoverOpen(
      activePopover
    )
  ) {
    hidePopover(
      activePopover,
      {
        restoreTriggerFocus:
          false,
      }
    );

    return;
  }

  positionFloating(
    activeTrigger,
    activePopover,
    {
      placement:
        getPreferredPlacement(
          activePopover
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
        updateFrame = null;

        updateActivePopoverPosition();
      }
    );
}


/* ========================================
 * Open / Close
 * ======================================== */

function showPopover(
  popover,
  trigger
) {
  if (
    !isValidPopover(
      popover
    )
    ||
    !trigger
    ||
    !trigger.isConnected
  ) {
    return;
  }

  if (
    isPopoverOpen(
      popover
    )
  ) {
    return;
  }

  try {
    popover.showPopover();
  } catch {
    return;
  }

  popoverTriggers.set(
    popover,
    trigger
  );

  setTriggerExpanded(
    trigger,
    true
  );

  setActiveInteractiveFloating({
    element:
      popover,

    trigger,

    type:
      "popover",

    close:
      () => {
        hidePopover(
          popover,
          {
            restoreTriggerFocus:
              false,
          }
        );
      },
  });

  activePopover =
    popover;

  activeTrigger =
    trigger;

  updateActivePopoverPosition();

  /*
   * Normal Popover keeps focus on trigger.
   * [autofocus] explicitly opts into
   * focus transfer.
   */
  focusAutofocusElement(
    popover
  );
}


function hidePopover(
  popover,
  {
    restoreTriggerFocus =
      false,

    forceTriggerFocus =
      false,
  } = {}
) {
  if (
    !popover
  ) {
    return;
  }


  const trigger =
    popoverTriggers.get(
      popover
    )
    ??
    (
      activePopover === popover
        ? activeTrigger
        : null
    );


  /*
   * Capture the current focus state before
   * native Popover closing changes it.
   */
  const focusWasInside =
    isFocusInside(
      popover
    );


  /*
   * Normal contextual restoration:
   *
   * restoreTriggerFocus = true
   * + focus actually inside Popover.
   *
   * Explicit close controls may use
   * forceTriggerFocus because WebKit does
   * not consistently preserve button focus
   * during pointer activation.
   */
  const shouldRestoreFocus =
    Boolean(
      trigger
      &&
      (
        forceTriggerFocus
        ||
        (
          restoreTriggerFocus
          &&
          focusWasInside
        )
      )
    );


  if (
    shouldRestoreFocus
  ) {
    pendingFocusRestores.set(
      popover,
      trigger
    );
  } else {
    pendingFocusRestores.delete(
      popover
    );
  }


  const wasOpen =
    isPopoverOpen(
      popover
    );


  try {
    if (
      wasOpen
    ) {
      popover.hidePopover();
    }
  } catch {
    /*
     * Fail safely if native state has
     * already changed.
     */
  }


  setTriggerExpanded(
    trigger,
    false
  );


  clearActiveInteractiveFloating(
    popover
  );


  if (
    activePopover === popover
  ) {
    activePopover = null;

    activeTrigger = null;
  }


  /*
   * Normally native toggle="closed"
   * performs the pending restoration.
   *
   * If the Popover was already closed,
   * there will be no new toggle event.
   */
  if (
    shouldRestoreFocus
    &&
    !wasOpen
  ) {
    restorePendingPopoverFocus(
      popover
    );
  }
}


function togglePopover(
  popover,
  trigger
) {
  if (
    isPopoverOpen(
      popover
    )
  ) {
    hidePopover(
      popover,
      {
        restoreTriggerFocus:
          false,
      }
    );

    return;
  }

  showPopover(
    popover,
    trigger
  );
}


/* ========================================
 * Events
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


function handlePopoverClick(
  event,
  popover
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
    return;
  }


  const closeControl =
    target.closest(
      "[data-rm-popover-close]"
    );


  if (
    !closeControl
    ||
    !popover.contains(
      closeControl
    )
  ) {
    return;
  }


  event.preventDefault();


  /*
   * Explicit close originates from inside
   * the Popover by definition.
   *
   * WebKit/Safari does not consistently
   * keep buttons focused during pointer
   * activation, so do not depend solely on
   * document.activeElement here.
   */
  hidePopover(
    popover,
    {
      restoreTriggerFocus:
        true,

      forceTriggerFocus:
        true,
    }
  );
}


function handlePopoverToggle(
  event,
  popover
) {
  if (
    event.newState !== "closed"
  ) {
    return;
  }

  const trigger =
    popoverTriggers.get(
      popover
    );

  setTriggerExpanded(
    trigger,
    false
  );

  clearActiveInteractiveFloating(
    popover
  );

  if (
    activePopover === popover
  ) {
    activePopover = null;
    activeTrigger = null;
  }

  /*
   * Complete contextual focus restoration
   * only after the native Popover lifecycle
   * has reached the closed state.
   */
  restorePendingPopoverFocus(
    popover
  );
}


function handleGlobalPointerDown(
  event
) {
  if (
    !activePopover
    ||
    !activeTrigger
  ) {
    return;
  }

  if (
    isEventWithin(
      event,
      activePopover
    )
    ||
    isEventWithin(
      event,
      activeTrigger
    )
  ) {
    return;
  }

  /*
   * Outside pointer dismissal deliberately
   * does not restore focus. The clicked
   * element must remain free to receive it.
   */
  hidePopover(
    activePopover,
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
    !activePopover
  ) {
    return;
  }


  event.preventDefault();


  event.stopImmediatePropagation();


  hidePopover(
    activePopover,
    {
      restoreTriggerFocus:
        true,
    }
  );
}


/* ========================================
 * Initialization
 * ======================================== */

function initializePopover(
  popover
) {
  if (
    initializedPopovers.has(
      popover
    )
  ) {
    return;
  }

  popover.addEventListener(
    "click",
    (event) => {
      handlePopoverClick(
        event,
        popover
      );
    }
  );

  popover.addEventListener(
    "toggle",
    (event) => {
      handlePopoverToggle(
        event,
        popover
      );
    }
  );

  initializedPopovers.add(
    popover
  );
}


function initializePopoverTrigger(
  trigger
) {
  if (
    initializedPopoverTriggers.has(
      trigger
    )
  ) {
    return;
  }

  const popover =
    getPopoverFromTrigger(
      trigger
    );

  /*
   * aria-expanded is dynamic state.
   */
  setTriggerExpanded(
    trigger,
    Boolean(
      popover
      &&
      isPopoverOpen(
        popover
      )
    )
  );

  trigger.addEventListener(
    "click",
    (event) => {
      const targetPopover =
        getPopoverFromTrigger(
          trigger
        );

      if (
        !targetPopover
      ) {
        return;
      }

      event.preventDefault();

      togglePopover(
        targetPopover,
        trigger
      );
    }
  );

  initializedPopoverTriggers.add(
    trigger
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


function initPopovers(
  root =
    getDefaultRoot()
) {
  if (!root) {
    return;
  }

  initializeGlobalListeners();

  const popovers =
    collectPopovers(
      root
    );

  for (
    const popover
    of popovers
  ) {
    initializePopover(
      popover
    );
  }

  const triggers =
    collectPopoverTriggers(
      root
    );

  for (
    const trigger
    of triggers
  ) {
    initializePopoverTrigger(
      trigger
    );
  }
}


export {
  initPopovers,
};