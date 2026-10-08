/*
 * Rahardianmif UI
 * Disclosure + Accordion
 *
 * v0.5.7
 *
 * Disclosure is the primitive.
 * Accordion is a grouping policy built
 * on top of Disclosure.
 *
 * Public initialization remains:
 *
 * RahardianmifUI.init()
 */


const initializedDisclosureTriggers =
  new WeakSet();


/* ========================================
 * Root Helpers
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


/* ========================================
 * Disclosure Lookup
 * ======================================== */

function getDisclosurePanelFromTrigger(
  trigger
) {
  if (
    typeof document === "undefined"
    ||
    !trigger
  ) {
    return null;
  }


  const panelId =
    trigger
      .getAttribute(
        "data-rm-disclosure-trigger"
      )
      ?.trim();


  if (!panelId) {
    return null;
  }


  const panel =
    document.getElementById(
      panelId
    );


  if (
    !panel
    ||
    !panel.hasAttribute(
      "data-rm-disclosure"
    )
  ) {
    return null;
  }


  return panel;
}


function isDisclosureOpen(
  panel
) {
  return Boolean(
    panel
    &&
    !panel.hidden
  );
}


/* ========================================
 * Disclosure State
 * ======================================== */

function setDisclosureState(
  trigger,
  panel,
  expanded
) {
  if (
    !trigger
    ||
    !panel
  ) {
    return;
  }


  panel.hidden =
    !expanded;


  trigger.setAttribute(
    "aria-expanded",
    expanded
      ? "true"
      : "false"
  );
}


function syncDisclosureState(
  trigger
) {
  const panel =
    getDisclosurePanelFromTrigger(
      trigger
    );


  if (!panel) {
    return;
  }


  trigger.setAttribute(
    "aria-expanded",
    isDisclosureOpen(
      panel
    )
      ? "true"
      : "false"
  );
}


/* ========================================
 * Accordion Membership
 * ======================================== */

/*
 * A nested standalone Disclosure may live
 * inside an Accordion panel.
 *
 * It must NOT become a peer Accordion item.
 *
 * Therefore a trigger is considered an
 * Accordion trigger only when:
 *
 * - it belongs to an .rm-accordion__item;
 * - that item belongs to the nearest
 *   data-rm-accordion root;
 * - the trigger is not nested inside another
 *   disclosure panel within that item.
 */

function getAccordionForTrigger(
  trigger
) {
  if (!trigger) {
    return null;
  }


  const accordion =
    trigger.closest(
      "[data-rm-accordion]"
    );


  if (!accordion) {
    return null;
  }


  const item =
    trigger.closest(
      ".rm-accordion__item"
    );


  if (
    !item
    ||
    item.closest(
      "[data-rm-accordion]"
    )
      !==
      accordion
  ) {
    return null;
  }


  let node =
    trigger.parentElement;


  while (
    node
    &&
    node !== item
  ) {
    if (
      node.hasAttribute(
        "data-rm-disclosure"
      )
    ) {
      return null;
    }


    if (
      node.hasAttribute(
        "data-rm-accordion"
      )
    ) {
      return null;
    }


    node =
      node.parentElement;
  }


  return accordion;
}


function getAccordionTriggers(
  accordion
) {
  if (
    !accordion
    ||
    typeof accordion.querySelectorAll
      !==
      "function"
  ) {
    return [];
  }


  return Array.from(
    accordion.querySelectorAll(
      "[data-rm-disclosure-trigger]"
    )
  ).filter(
    (trigger) => {
      if (
        trigger.disabled
      ) {
        /*
         * Disabled triggers still belong
         * to the group but are excluded
         * from keyboard movement later.
         *
         * Keep them here for state
         * normalization.
         */
      }


      return (
        getAccordionForTrigger(
          trigger
        )
        ===
        accordion
        &&
        Boolean(
          getDisclosurePanelFromTrigger(
            trigger
          )
        )
      );
    }
  );
}


function getEnabledAccordionTriggers(
  accordion
) {
  return getAccordionTriggers(
    accordion
  ).filter(
    (trigger) =>
      !trigger.disabled
  );
}


/* ========================================
 * Accordion Mode
 * ======================================== */

function getAccordionMode(
  accordion
) {
  const mode =
    accordion
      ?.getAttribute(
        "data-rm-accordion-mode"
      )
      ?.trim();


  return mode === "multiple"
    ? "multiple"
    : "single";
}


/* ========================================
 * Accordion Normalization
 * ======================================== */

function normalizeAccordion(
  accordion
) {
  const triggers =
    getAccordionTriggers(
      accordion
    );


  if (
    triggers.length === 0
  ) {
    return;
  }


  for (
    const trigger
    of triggers
  ) {
    syncDisclosureState(
      trigger
    );
  }


  if (
    getAccordionMode(
      accordion
    )
    !==
    "single"
  ) {
    return;
  }


  let foundOpenItem =
    false;


  for (
    const trigger
    of triggers
  ) {
    const panel =
      getDisclosurePanelFromTrigger(
        trigger
      );


    if (
      !panel
      ||
      !isDisclosureOpen(
        panel
      )
    ) {
      continue;
    }


    if (
      !foundOpenItem
    ) {
      foundOpenItem =
        true;

      continue;
    }


    /*
     * Contract A:
     * first initially-open item wins.
     */
    setDisclosureState(
      trigger,
      panel,
      false
    );
  }
}


/* ========================================
 * Accordion Group State
 * ======================================== */

function closeOtherAccordionItems(
  accordion,
  activeTrigger
) {
  const triggers =
    getAccordionTriggers(
      accordion
    );


  for (
    const trigger
    of triggers
  ) {
    if (
      trigger === activeTrigger
    ) {
      continue;
    }


    const panel =
      getDisclosurePanelFromTrigger(
        trigger
      );


    if (
      !panel
      ||
      !isDisclosureOpen(
        panel
      )
    ) {
      continue;
    }


    setDisclosureState(
      trigger,
      panel,
      false
    );
  }
}


/* ========================================
 * Toggle
 * ======================================== */

function toggleDisclosure(
  trigger
) {
  if (
    !trigger
    ||
    trigger.disabled
  ) {
    return;
  }


  const panel =
    getDisclosurePanelFromTrigger(
      trigger
    );


  if (!panel) {
    return;
  }


  const accordion =
    getAccordionForTrigger(
      trigger
    );


  const willOpen =
    !isDisclosureOpen(
      panel
    );


  /*
   * Standalone Disclosure.
   */
  if (!accordion) {
    setDisclosureState(
      trigger,
      panel,
      willOpen
    );

    return;
  }


  /*
   * Accordion single mode.
   *
   * Single mode remains collapsible,
   * therefore an already-open item may
   * still be closed.
   */
  if (
    getAccordionMode(
      accordion
    )
    ===
    "single"
    &&
    willOpen
  ) {
    closeOtherAccordionItems(
      accordion,
      trigger
    );
  }


  setDisclosureState(
    trigger,
    panel,
    willOpen
  );
}


/* ========================================
 * Accordion Keyboard Navigation
 * ======================================== */

function focusAccordionTrigger(
  accordion,
  currentTrigger,
  action
) {
  const triggers =
    getEnabledAccordionTriggers(
      accordion
    );


  if (
    triggers.length === 0
  ) {
    return;
  }


  let target =
    null;


  if (
    action === "first"
  ) {
    target =
      triggers[0];
  } else if (
    action === "last"
  ) {
    target =
      triggers[
        triggers.length - 1
      ];
  } else {
    const currentIndex =
      triggers.indexOf(
        currentTrigger
      );


    if (
      currentIndex === -1
    ) {
      target =
        triggers[0];
    } else {
      const direction =
        action === "previous"
          ? -1
          : 1;


      const nextIndex =
        (
          currentIndex
          +
          direction
          +
          triggers.length
        )
        %
        triggers.length;


      target =
        triggers[
          nextIndex
        ];
    }
  }


  if (
    !target
    ||
    typeof target.focus
      !==
      "function"
  ) {
    return;
  }


  try {
    target.focus({
      preventScroll: true,
    });
  } catch {
    try {
      target.focus();
    } catch {
      /*
       * Accordion keyboard focus is
       * best-effort.
       */
    }
  }
}


function handleDisclosureKeydown(
  event,
  trigger
) {
  const accordion =
    getAccordionForTrigger(
      trigger
    );


  if (!accordion) {
    return;
  }


  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();

      focusAccordionTrigger(
        accordion,
        trigger,
        "next"
      );

      break;


    case "ArrowUp":
      event.preventDefault();

      focusAccordionTrigger(
        accordion,
        trigger,
        "previous"
      );

      break;


    case "Home":
      event.preventDefault();

      focusAccordionTrigger(
        accordion,
        trigger,
        "first"
      );

      break;


    case "End":
      event.preventDefault();

      focusAccordionTrigger(
        accordion,
        trigger,
        "last"
      );

      break;


    default:
      /*
       * Enter and Space are handled by
       * native button activation.
       */
      break;
  }
}


/* ========================================
 * Trigger Initialization
 * ======================================== */

function initializeDisclosureTrigger(
  trigger
) {
  syncDisclosureState(
    trigger
  );


  if (
    initializedDisclosureTriggers.has(
      trigger
    )
  ) {
    return;
  }


  trigger.addEventListener(
    "click",
    (event) => {
      if (
        trigger.disabled
      ) {
        return;
      }


      event.preventDefault();


      toggleDisclosure(
        trigger
      );
    }
  );


  trigger.addEventListener(
    "keydown",
    (event) => {
      handleDisclosureKeydown(
        event,
        trigger
      );
    }
  );


  initializedDisclosureTriggers.add(
    trigger
  );
}


/* ========================================
 * Public Internal Initializer
 * ======================================== */

function initDisclosures(
  root =
    getDefaultRoot()
) {
  if (!root) {
    return;
  }


  const triggers =
    collectElements(
      root,
      "[data-rm-disclosure-trigger]"
    );


  for (
    const trigger
    of triggers
  ) {
    initializeDisclosureTrigger(
      trigger
    );
  }


  const accordions =
    collectElements(
      root,
      "[data-rm-accordion]"
    );


  for (
    const accordion
    of accordions
  ) {
    normalizeAccordion(
      accordion
    );
  }
}


export {
  initDisclosures,
};