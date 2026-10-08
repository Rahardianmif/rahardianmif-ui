/*
 * Rahardianmif UI
 * Tooltip Component
 *
 * v0.5.4
 * v0.5.5 shared floating ownership
 */

import {
  positionFloating,
  setActiveTooltipFloating,
  clearActiveTooltipFloating,
} from "../internal/floating.js";


const initializedTooltipTriggers =
  new WeakSet();

const tooltipStates =
  new WeakMap();

let activeTooltip = null;
let activeTrigger = null;

let updateFrame = null;

let globalListenersInitialized =
  false;


const POINTER_OPEN_DELAY = 300;
const POINTER_CLOSE_DELAY = 100;


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


function collectTooltipTriggers(
  root
) {
  return collectElements(
    root,
    "[data-rm-tooltip-trigger]"
  );
}


function isValidTooltip(
  tooltip
) {
  return Boolean(
    tooltip
    &&
    tooltip.hasAttribute(
      "data-rm-tooltip"
    )
    &&
    tooltip.getAttribute(
      "role"
    )
      ===
      "tooltip"
    &&
    tooltip.getAttribute(
      "popover"
    )
      ===
      "manual"
    &&
    typeof tooltip.showPopover
      ===
      "function"
    &&
    typeof tooltip.hidePopover
      ===
      "function"
  );
}


function getTooltipFromTrigger(
  trigger
) {
  if (
    typeof document === "undefined"
  ) {
    return null;
  }

  const tooltipId =
    trigger
      .getAttribute(
        "data-rm-tooltip-trigger"
      )
      ?.trim();

  if (!tooltipId) {
    return null;
  }

  const tooltip =
    document.getElementById(
      tooltipId
    );

  return isValidTooltip(
    tooltip
  )
    ? tooltip
    : null;
}


function getPreferredPlacement(
  tooltip
) {
  const placement =
    tooltip
      .getAttribute(
        "data-rm-tooltip-placement"
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

  return "top";
}


function isPopoverOpen(
  element
) {
  try {
    return element.matches(
      ":popover-open"
    );
  } catch {
    return false;
  }
}


function getTooltipState(
  trigger
) {
  let state =
    tooltipStates.get(
      trigger
    );

  if (state) {
    return state;
  }

  state = {
    hovered: false,
    focused: false,
    openTimer: null,
    closeTimer: null,
  };

  tooltipStates.set(
    trigger,
    state
  );

  return state;
}


function clearOpenTimer(
  state
) {
  if (
    state.openTimer === null
  ) {
    return;
  }

  window.clearTimeout(
    state.openTimer
  );

  state.openTimer =
    null;
}


function clearCloseTimer(
  state
) {
  if (
    state.closeTimer === null
  ) {
    return;
  }

  window.clearTimeout(
    state.closeTimer
  );

  state.closeTimer =
    null;
}


function clearTimers(
  state
) {
  clearOpenTimer(state);
  clearCloseTimer(state);
}


function hideTooltip(
  tooltip = activeTooltip
) {
  if (!tooltip) {
    return;
  }

  try {
    if (
      isPopoverOpen(
        tooltip
      )
    ) {
      tooltip.hidePopover();
    }
  } catch {
    /*
     * Popover may already have been
     * closed by the browser.
     */
  }

  clearActiveTooltipFloating(
    tooltip
  );

  if (
    activeTooltip === tooltip
  ) {
    activeTooltip = null;
    activeTrigger = null;
  }
}


function hideActiveTooltip() {
  hideTooltip(
    activeTooltip
  );
}


function updateActiveTooltipPosition() {
  if (
    !activeTooltip
    ||
    !activeTrigger
  ) {
    return;
  }

  if (
    !activeTooltip.isConnected
    ||
    !activeTrigger.isConnected
    ||
    !isPopoverOpen(
      activeTooltip
    )
  ) {
    hideActiveTooltip();

    return;
  }

  positionFloating(
    activeTrigger,
    activeTooltip,
    {
      placement:
        getPreferredPlacement(
          activeTooltip
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

        updateActiveTooltipPosition();
      }
    );
}


function showTooltip(
  trigger
) {
  const tooltip =
    getTooltipFromTrigger(
      trigger
    );

  if (
    !tooltip
    ||
    !trigger.isConnected
  ) {
    return;
  }

  try {
    if (
      !isPopoverOpen(
        tooltip
      )
    ) {
      tooltip.showPopover();
    }
  } catch {
    return;
  }

  setActiveTooltipFloating({
    element:
      tooltip,

    trigger,

    type:
      "tooltip",

    close:
      () => {
        hideTooltip(
          tooltip
        );
      },
  });

  activeTooltip =
    tooltip;

  activeTrigger =
    trigger;

  updateActiveTooltipPosition();
}


function shouldRemainOpen(
  state
) {
  return (
    state.hovered
    ||
    state.focused
  );
}


function requestPointerOpen(
  trigger
) {
  const state =
    getTooltipState(
      trigger
    );

  clearCloseTimer(state);

  if (state.focused) {
    showTooltip(trigger);

    return;
  }

  clearOpenTimer(state);

  state.openTimer =
    window.setTimeout(
      () => {
        state.openTimer = null;

        if (
          state.hovered
        ) {
          showTooltip(
            trigger
          );
        }
      },
      POINTER_OPEN_DELAY
    );
}


function requestPointerClose(
  trigger
) {
  const state =
    getTooltipState(
      trigger
    );

  clearOpenTimer(state);

  if (
    shouldRemainOpen(
      state
    )
  ) {
    return;
  }

  clearCloseTimer(state);

  state.closeTimer =
    window.setTimeout(
      () => {
        state.closeTimer = null;

        if (
          !shouldRemainOpen(
            state
          )
          &&
          activeTrigger === trigger
        ) {
          hideActiveTooltip();
        }
      },
      POINTER_CLOSE_DELAY
    );
}


function handlePointerEnter(
  trigger
) {
  const state =
    getTooltipState(
      trigger
    );

  state.hovered =
    true;

  requestPointerOpen(
    trigger
  );
}


function handlePointerLeave(
  trigger
) {
  const state =
    getTooltipState(
      trigger
    );

  state.hovered =
    false;

  requestPointerClose(
    trigger
  );
}


function handleFocus(
  trigger
) {
  const state =
    getTooltipState(
      trigger
    );

  state.focused =
    true;

  clearTimers(state);

  showTooltip(
    trigger
  );
}


function handleBlur(
  trigger
) {
  const state =
    getTooltipState(
      trigger
    );

  state.focused =
    false;

  clearOpenTimer(state);

  if (
    !state.hovered
    &&
    activeTrigger === trigger
  ) {
    hideActiveTooltip();
  }
}


function initializeTooltipTrigger(
  trigger
) {
  if (
    initializedTooltipTriggers.has(
      trigger
    )
  ) {
    return;
  }

  trigger.addEventListener(
    "pointerenter",
    () => {
      handlePointerEnter(
        trigger
      );
    }
  );

  trigger.addEventListener(
    "pointerleave",
    () => {
      handlePointerLeave(
        trigger
      );
    }
  );

  trigger.addEventListener(
    "focus",
    () => {
      handleFocus(
        trigger
      );
    }
  );

  trigger.addEventListener(
    "blur",
    () => {
      handleBlur(
        trigger
      );
    }
  );

  initializedTooltipTriggers.add(
    trigger
  );
}


function handleGlobalKeydown(
  event
) {
  if (
    event.key !== "Escape"
    ||
    !activeTooltip
  ) {
    return;
  }

  event.preventDefault();

  /*
   * Prevent Popover, Dropdown or native
   * Modal Escape handling from consuming
   * the same Escape press.
   */
  event.stopImmediatePropagation();

  hideActiveTooltip();
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


function initTooltips(
  root =
    getDefaultRoot()
) {
  if (!root) {
    return;
  }

  initializeGlobalListeners();

  const triggers =
    collectTooltipTriggers(
      root
    );

  for (
    const trigger
    of triggers
  ) {
    initializeTooltipTrigger(
      trigger
    );
  }
}


export {
  initTooltips,
};