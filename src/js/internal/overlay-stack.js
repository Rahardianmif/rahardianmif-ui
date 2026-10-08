/*
 * Rahardianmif UI
 * Internal Overlay Stack
 *
 * v0.5.1
 */

const overlayStack = [];


function pruneOverlayStack() {
  for (
    let index = overlayStack.length - 1;
    index >= 0;
    index -= 1
  ) {
    const overlay =
      overlayStack[index];

    if (
      !overlay ||
      !overlay.isConnected ||
      !overlay.open
    ) {
      overlayStack.splice(
        index,
        1
      );
    }
  }
}


function pushOverlay(overlay) {
  if (!overlay) {
    return;
  }

  pruneOverlayStack();

  const existingIndex =
    overlayStack.indexOf(overlay);

  if (existingIndex !== -1) {
    overlayStack.splice(
      existingIndex,
      1
    );
  }

  overlayStack.push(overlay);
}


function removeOverlay(overlay) {
  const index =
    overlayStack.lastIndexOf(
      overlay
    );

  if (index === -1) {
    return;
  }

  overlayStack.splice(
    index,
    1
  );
}


function isTopmostOverlay(overlay) {
  pruneOverlayStack();

  return (
    overlayStack.length > 0 &&
    overlayStack[
      overlayStack.length - 1
    ] === overlay
  );
}


export {
  pushOverlay,
  removeOverlay,
  isTopmostOverlay,
};