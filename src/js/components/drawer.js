/*
 * Rahardianmif UI
 * Drawer / Offcanvas Component
 *
 * v0.5.3
 *
 * Native <dialog> foundation.
 * Public initialization remains:
 *
 * RahardianmifUI.init()
 */

import {
  restoreFocus,
} from "../internal/focus.js";

import {
  lockDocumentScroll,
  unlockDocumentScroll,
} from "../internal/scroll-lock.js";

import {
  pushOverlay,
  removeOverlay,
  isTopmostOverlay,
} from "../internal/overlay-stack.js";


const initializedDrawers =
  new WeakSet();

const initializedDrawerTriggers =
  new WeakSet();

const drawerOpeners =
  new WeakMap();


function getDefaultRoot() {
  if (
    typeof document
    ===
    "undefined"
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
    root.matches(
      selector
    )
  ) {
    elements.push(
      root
    );
  }

  elements.push(
    ...root.querySelectorAll(
      selector
    )
  );

  return elements;
}


function collectDrawers(
  root
) {
  return collectElements(
    root,
    "dialog[data-rm-drawer]"
  );
}


function collectDrawerTriggers(
  root
) {
  return collectElements(
    root,
    "[data-rm-drawer-trigger]"
  );
}


function isValidDrawer(
  drawer
) {
  return Boolean(
    drawer
    &&
    drawer.tagName
      ===
      "DIALOG"
    &&
    drawer.hasAttribute(
      "data-rm-drawer"
    )
    &&
    typeof drawer.showModal
      ===
      "function"
    &&
    typeof drawer.close
      ===
      "function"
  );
}


function getDrawerFromTrigger(
  trigger
) {
  if (
    typeof document
    ===
    "undefined"
  ) {
    return null;
  }


  const drawerId =
    trigger
      .getAttribute(
        "data-rm-drawer-trigger"
      )
      ?.trim();


  if (
    !drawerId
  ) {
    return null;
  }


  const drawer =
    document.getElementById(
      drawerId
    );


  return isValidDrawer(
    drawer
  )
    ? drawer
    : null;
}


function openDrawer(
  drawer,
  opener
) {
  if (
    !isValidDrawer(
      drawer
    )
    ||
    drawer.open
  ) {
    return;
  }


  try {
    drawer.showModal();
  } catch {
    return;
  }


  if (
    opener
  ) {
    drawerOpeners.set(
      drawer,
      opener
    );
  }


  pushOverlay(
    drawer
  );

  lockDocumentScroll(
    drawer
  );
}


function closeDrawer(
  drawer
) {
  if (
    !isValidDrawer(
      drawer
    )
    ||
    !drawer.open
  ) {
    return;
  }


  try {
    drawer.close();
  } catch {
    /*
     * Closing must fail safely if the
     * dialog is no longer closable.
     */
  }
}


function isBackdropClick(
  event,
  drawer
) {
  if (
    event.target
    !==
    drawer
  ) {
    return false;
  }


  const rect =
    drawer.getBoundingClientRect();


  return (
    event.clientX
      <
      rect.left
    ||
    event.clientX
      >
      rect.right
    ||
    event.clientY
      <
      rect.top
    ||
    event.clientY
      >
      rect.bottom
  );
}


function handleDrawerClick(
  event,
  drawer
) {
  const eventTarget =
    event.target;


  if (
    eventTarget
    &&
    typeof eventTarget.closest
      ===
      "function"
  ) {
    const closeControl =
      eventTarget.closest(
        "[data-rm-drawer-close]"
      );


    if (
      closeControl
      &&
      drawer.contains(
        closeControl
      )
    ) {
      event.preventDefault();

      closeDrawer(
        drawer
      );

      return;
    }
  }


  if (
    isTopmostOverlay(
      drawer
    )
    &&
    isBackdropClick(
      event,
      drawer
    )
  ) {
    closeDrawer(
      drawer
    );
  }
}


function handleDrawerCancel(
  event,
  drawer
) {
  /*
   * Escape belongs to the topmost
   * managed modal layer.
   */

  if (
    !isTopmostOverlay(
      drawer
    )
  ) {
    event.preventDefault();
  }
}


function handleDrawerClose(
  drawer
) {
  removeOverlay(
    drawer
  );

  unlockDocumentScroll(
    drawer
  );


  const opener =
    drawerOpeners.get(
      drawer
    );


  drawerOpeners.delete(
    drawer
  );


  restoreFocus(
    opener
  );
}


function initializeDrawer(
  drawer
) {
  if (
    initializedDrawers.has(
      drawer
    )
  ) {
    return;
  }


  drawer.addEventListener(
    "click",
    (event) => {
      handleDrawerClick(
        event,
        drawer
      );
    }
  );


  drawer.addEventListener(
    "cancel",
    (event) => {
      handleDrawerCancel(
        event,
        drawer
      );
    }
  );


  drawer.addEventListener(
    "close",
    () => {
      handleDrawerClose(
        drawer
      );
    }
  );


  initializedDrawers.add(
    drawer
  );
}


function initializeDrawerTrigger(
  trigger
) {
  if (
    initializedDrawerTriggers.has(
      trigger
    )
  ) {
    return;
  }


  trigger.addEventListener(
    "click",
    (event) => {
      const drawer =
        getDrawerFromTrigger(
          trigger
        );


      if (
        !drawer
      ) {
        return;
      }


      event.preventDefault();


      openDrawer(
        drawer,
        trigger
      );
    }
  );


  initializedDrawerTriggers.add(
    trigger
  );
}


function initDrawers(
  root =
    getDefaultRoot()
) {
  const drawers =
    collectDrawers(
      root
    );


  for (
    const drawer
    of drawers
  ) {
    initializeDrawer(
      drawer
    );
  }


  const triggers =
    collectDrawerTriggers(
      root
    );


  for (
    const trigger
    of triggers
  ) {
    initializeDrawerTrigger(
      trigger
    );
  }
}


export {
  initDrawers,
};