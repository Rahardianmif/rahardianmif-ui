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


const initializedModals = new WeakSet();
const initializedModalTriggers = new WeakSet();
const modalOpeners = new WeakMap();


function getDefaultRoot() {
  if (typeof document === "undefined") {
    return null;
  }

  return document;
}


function collectElements(
  root,
  selector
) {
  if (
    !root ||
    typeof root.querySelectorAll !== "function"
  ) {
    return [];
  }

  const elements = [];

  if (
    root.matches &&
    root.matches(selector)
  ) {
    elements.push(root);
  }

  elements.push(
    ...root.querySelectorAll(selector)
  );

  return elements;
}


function collectModals(root) {
  return collectElements(
    root,
    "dialog[data-rm-modal]"
  );
}


function collectModalTriggers(root) {
  return collectElements(
    root,
    "[data-rm-modal-trigger]"
  );
}


function isValidModal(modal) {
  return Boolean(
    modal &&
    modal.tagName === "DIALOG" &&
    modal.hasAttribute("data-rm-modal") &&
    typeof modal.showModal === "function" &&
    typeof modal.close === "function"
  );
}


function getModalFromTrigger(trigger) {
  if (typeof document === "undefined") {
    return null;
  }

  const modalId = trigger
    .getAttribute("data-rm-modal-trigger")
    ?.trim();

  if (!modalId) {
    return null;
  }

  const modal =
    document.getElementById(modalId);

  return isValidModal(modal)
    ? modal
    : null;
}


function openModal(
  modal,
  opener
) {
  if (
    !isValidModal(modal) ||
    modal.open
  ) {
    return;
  }

  try {
    modal.showModal();
  } catch {
    return;
  }

  if (opener) {
    modalOpeners.set(
      modal,
      opener
    );
  }

  pushOverlay(modal);
  lockDocumentScroll(modal);
}


function closeModal(modal) {
  if (
    !isValidModal(modal) ||
    !modal.open
  ) {
    return;
  }

  try {
    modal.close();
  } catch {
    /*
     * Fail safely if dialog
     * cannot be closed.
     */
  }
}


function isBackdropClick(
  event,
  modal
) {
  if (event.target !== modal) {
    return false;
  }

  const rect =
    modal.getBoundingClientRect();

  return (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  );
}


function handleModalClick(
  event,
  modal
) {
  const eventTarget =
    event.target;

  if (
    eventTarget &&
    typeof eventTarget.closest === "function"
  ) {
    const closeControl =
      eventTarget.closest(
        "[data-rm-modal-close]"
      );

    if (
      closeControl &&
      modal.contains(closeControl)
    ) {
      event.preventDefault();

      closeModal(modal);

      return;
    }
  }


  const isStaticModal =
    modal.hasAttribute(
      "data-rm-modal-static"
    );


  if (isStaticModal) {
    return;
  }


  if (
    isTopmostOverlay(modal) &&
    isBackdropClick(
      event,
      modal
    )
  ) {
    closeModal(modal);
  }
}


function handleModalClose(modal) {
  removeOverlay(modal);
  unlockDocumentScroll(modal);

  const opener =
    modalOpeners.get(modal);

  modalOpeners.delete(modal);

  restoreFocus(opener);
}


function initializeModal(modal) {
  if (
    initializedModals.has(modal)
  ) {
    return;
  }

  modal.addEventListener(
    "click",
    (event) => {
      handleModalClick(
        event,
        modal
      );
    }
  );

  modal.addEventListener(
    "close",
    () => {
      handleModalClose(modal);
    }
  );

  initializedModals.add(modal);
}


function initializeModalTrigger(trigger) {
  if (
    initializedModalTriggers.has(
      trigger
    )
  ) {
    return;
  }

  trigger.addEventListener(
    "click",
    (event) => {
      const modal =
        getModalFromTrigger(
          trigger
        );

      if (!modal) {
        return;
      }

      event.preventDefault();

      openModal(
        modal,
        trigger
      );
    }
  );

  initializedModalTriggers.add(
    trigger
  );
}


function initModals(
  root =
    getDefaultRoot()
) {
  const modals =
    collectModals(root);

  for (
    const modal
    of modals
  ) {
    initializeModal(modal);
  }

  const triggers =
    collectModalTriggers(root);

  for (
    const trigger
    of triggers
  ) {
    initializeModalTrigger(
      trigger
    );
  }
}


export {
  initModals,
};