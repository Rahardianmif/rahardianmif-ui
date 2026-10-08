/*
 * Rahardianmif UI
 * Internal Focus Utilities
 *
 * v0.5.1
 */

function canRestoreFocus(element) {
  return Boolean(
    element &&
    element.isConnected &&
    typeof element.focus === "function" &&
    element.disabled !== true
  );
}


function restoreFocus(element) {
  if (!canRestoreFocus(element)) {
    return;
  }

  try {
    element.focus({
      preventScroll: true,
    });
  } catch {
    try {
      element.focus();
    } catch {
      /*
       * Focus restoration is best-effort.
       */
    }
  }
}


export {
  restoreFocus,
};