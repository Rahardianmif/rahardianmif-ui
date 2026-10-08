/*
 * Rahardianmif UI
 * Internal Scroll Lock
 *
 * v0.5.1
 */

const scrollLockOwners = new Set();

let previousRootOverflow = "";
let previousBodyOverflow = "";


function getDocumentParts() {
  if (typeof document === "undefined") {
    return {
      root: null,
      body: null,
    };
  }

  return {
    root: document.documentElement,
    body: document.body,
  };
}


function lockDocumentScroll(owner) {
  if (
    !owner ||
    scrollLockOwners.has(owner)
  ) {
    return;
  }

  const {
    root,
    body,
  } = getDocumentParts();

  if (!root || !body) {
    return;
  }

  if (scrollLockOwners.size === 0) {
    previousRootOverflow =
      root.style.overflow;

    previousBodyOverflow =
      body.style.overflow;

    root.style.overflow =
      "hidden";

    body.style.overflow =
      "hidden";
  }

  scrollLockOwners.add(owner);
}


function unlockDocumentScroll(owner) {
  if (
    !owner ||
    !scrollLockOwners.has(owner)
  ) {
    return;
  }

  scrollLockOwners.delete(owner);

  if (scrollLockOwners.size !== 0) {
    return;
  }

  const {
    root,
    body,
  } = getDocumentParts();

  if (!root || !body) {
    return;
  }

  root.style.overflow =
    previousRootOverflow;

  body.style.overflow =
    previousBodyOverflow;

  previousRootOverflow = "";
  previousBodyOverflow = "";
}


export {
  lockDocumentScroll,
  unlockDocumentScroll,
};