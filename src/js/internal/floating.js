/*
 * Rahardianmif UI
 * Internal Floating Foundation
 *
 * v0.5.4 — Tooltip
 * v0.5.5 — Shared floating ownership
 * v0.5.6 — Alignment support
 *
 * Internal only.
 * Not part of the public JavaScript API.
 */

const DEFAULT_GAP = 8;
const DEFAULT_VIEWPORT_PADDING = 8;

let activeTooltipOwner = null;
let activeInteractiveOwner = null;


/* ========================================
 * Direction
 * ======================================== */

function getDirection(element) {
  if (
    typeof window === "undefined"
    ||
    !element
  ) {
    return "ltr";
  }

  const direction =
    window
      .getComputedStyle(element)
      .direction;

  return direction === "rtl"
    ? "rtl"
    : "ltr";
}


/* ========================================
 * Placement
 * ======================================== */

function resolveLogicalPlacement(
  placement,
  anchor
) {
  if (
    placement !== "start"
    &&
    placement !== "end"
  ) {
    return placement;
  }

  const direction =
    getDirection(anchor);

  if (placement === "start") {
    return direction === "rtl"
      ? "right"
      : "left";
  }

  return direction === "rtl"
    ? "left"
    : "right";
}


function getOppositePlacement(
  placement
) {
  const opposites = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };

  return opposites[placement]
    ?? "bottom";
}


/* ========================================
 * Alignment
 * ======================================== */

function normalizeAlignment(
  alignment
) {
  if (
    alignment === "start"
    ||
    alignment === "end"
    ||
    alignment === "center"
  ) {
    return alignment;
  }

  return "center";
}


function getHorizontalAlignmentCoordinate(
  anchorRect,
  floatingRect,
  alignment,
  direction
) {
  if (alignment === "center") {
    return (
      anchorRect.left
      +
      (
        anchorRect.width
        -
        floatingRect.width
      )
      /
      2
    );
  }

  if (alignment === "start") {
    return direction === "rtl"
      ? (
        anchorRect.right
        -
        floatingRect.width
      )
      : anchorRect.left;
  }

  return direction === "rtl"
    ? anchorRect.left
    : (
      anchorRect.right
      -
      floatingRect.width
    );
}


function getVerticalAlignmentCoordinate(
  anchorRect,
  floatingRect,
  alignment
) {
  if (alignment === "start") {
    return anchorRect.top;
  }

  if (alignment === "end") {
    return (
      anchorRect.bottom
      -
      floatingRect.height
    );
  }

  return (
    anchorRect.top
    +
    (
      anchorRect.height
      -
      floatingRect.height
    )
    /
    2
  );
}


/* ========================================
 * Coordinate Calculation
 * ======================================== */

function calculateCoordinates(
  anchorRect,
  floatingRect,
  placement,
  alignment,
  gap,
  direction
) {
  let left = 0;
  let top = 0;

  switch (placement) {
    case "bottom":
      left =
        getHorizontalAlignmentCoordinate(
          anchorRect,
          floatingRect,
          alignment,
          direction
        );

      top =
        anchorRect.bottom
        +
        gap;

      break;


    case "left":
      left =
        anchorRect.left
        -
        floatingRect.width
        -
        gap;

      top =
        getVerticalAlignmentCoordinate(
          anchorRect,
          floatingRect,
          alignment
        );

      break;


    case "right":
      left =
        anchorRect.right
        +
        gap;

      top =
        getVerticalAlignmentCoordinate(
          anchorRect,
          floatingRect,
          alignment
        );

      break;


    case "top":
    default:
      left =
        getHorizontalAlignmentCoordinate(
          anchorRect,
          floatingRect,
          alignment,
          direction
        );

      top =
        anchorRect.top
        -
        floatingRect.height
        -
        gap;

      break;
  }

  return {
    left,
    top,
  };
}


/* ========================================
 * Viewport
 * ======================================== */

function getViewportSize() {
  if (
    typeof window === "undefined"
  ) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width:
      window.innerWidth,

    height:
      window.innerHeight,
  };
}


function hasPrimaryCollision(
  coordinates,
  floatingRect,
  placement,
  viewport,
  padding
) {
  switch (placement) {
    case "bottom":
      return (
        coordinates.top
        +
        floatingRect.height
        >
        viewport.height
        -
        padding
      );


    case "left":
      return (
        coordinates.left
        <
        padding
      );


    case "right":
      return (
        coordinates.left
        +
        floatingRect.width
        >
        viewport.width
        -
        padding
      );


    case "top":
    default:
      return (
        coordinates.top
        <
        padding
      );
  }
}


function clamp(
  value,
  minimum,
  maximum
) {
  if (
    maximum < minimum
  ) {
    return minimum;
  }

  return Math.min(
    Math.max(
      value,
      minimum
    ),
    maximum
  );
}


function clampCoordinates(
  coordinates,
  floatingRect,
  viewport,
  padding
) {
  const maximumLeft =
    viewport.width
    -
    floatingRect.width
    -
    padding;

  const maximumTop =
    viewport.height
    -
    floatingRect.height
    -
    padding;

  return {
    left:
      clamp(
        coordinates.left,
        padding,
        maximumLeft
      ),

    top:
      clamp(
        coordinates.top,
        padding,
        maximumTop
      ),
  };
}


/* ========================================
 * Motion Direction
 * ======================================== */

function getMotionOffset(
  placement
) {
  switch (placement) {
    case "bottom":
      return {
        x: "0px",
        y: "-4px",
      };


    case "left":
      return {
        x: "4px",
        y: "0px",
      };


    case "right":
      return {
        x: "-4px",
        y: "0px",
      };


    case "top":
    default:
      return {
        x: "0px",
        y: "4px",
      };
  }
}


/* ========================================
 * Position Floating
 * ======================================== */

function positionFloating(
  anchor,
  floating,
  {
    placement = "top",
    alignment = "center",
    gap = DEFAULT_GAP,
    viewportPadding =
      DEFAULT_VIEWPORT_PADDING,
  } = {}
) {
  if (
    !anchor
    ||
    !floating
    ||
    !anchor.isConnected
    ||
    !floating.isConnected
  ) {
    return null;
  }

  const direction =
    getDirection(anchor);

  const preferredPlacement =
    resolveLogicalPlacement(
      placement,
      anchor
    );

  const normalizedAlignment =
    normalizeAlignment(
      alignment
    );

  const anchorRect =
    anchor.getBoundingClientRect();

  const floatingRect =
    floating.getBoundingClientRect();

  const viewport =
    getViewportSize();

  let actualPlacement =
    preferredPlacement;

  let coordinates =
    calculateCoordinates(
      anchorRect,
      floatingRect,
      actualPlacement,
      normalizedAlignment,
      gap,
      direction
    );

  if (
    hasPrimaryCollision(
      coordinates,
      floatingRect,
      actualPlacement,
      viewport,
      viewportPadding
    )
  ) {
    const oppositePlacement =
      getOppositePlacement(
        actualPlacement
      );

    const oppositeCoordinates =
      calculateCoordinates(
        anchorRect,
        floatingRect,
        oppositePlacement,
        normalizedAlignment,
        gap,
        direction
      );

    if (
      !hasPrimaryCollision(
        oppositeCoordinates,
        floatingRect,
        oppositePlacement,
        viewport,
        viewportPadding
      )
    ) {
      actualPlacement =
        oppositePlacement;

      coordinates =
        oppositeCoordinates;
    }
  }

  coordinates =
    clampCoordinates(
      coordinates,
      floatingRect,
      viewport,
      viewportPadding
    );

  floating.style.left =
    `${Math.round(
      coordinates.left
    )}px`;

  floating.style.top =
    `${Math.round(
      coordinates.top
    )}px`;

  const motionOffset =
    getMotionOffset(
      actualPlacement
    );

  floating.style.setProperty(
    "--rm-floating-enter-x",
    motionOffset.x
  );

  floating.style.setProperty(
    "--rm-floating-enter-y",
    motionOffset.y
  );

  return {
    placement:
      actualPlacement,

    alignment:
      normalizedAlignment,

    left:
      coordinates.left,

    top:
      coordinates.top,
  };
}


/* ========================================
 * Floating Ownership
 * ======================================== */

function isValidOwner(owner) {
  return Boolean(
    owner
    &&
    owner.element
    &&
    typeof owner.close === "function"
  );
}


function invokeClose(
  owner,
  reason
) {
  if (
    !isValidOwner(owner)
  ) {
    return;
  }

  try {
    owner.close(reason);
  } catch {
    /*
     * Floating cleanup must fail safely.
     */
  }
}


/* ========================================
 * Tooltip Ownership
 * ======================================== */

function setActiveTooltipFloating(
  owner
) {
  if (
    !isValidOwner(owner)
  ) {
    return;
  }

  if (
    activeTooltipOwner
    &&
    activeTooltipOwner.element
      !==
      owner.element
  ) {
    const previous =
      activeTooltipOwner;

    activeTooltipOwner =
      null;

    invokeClose(
      previous,
      "superseded"
    );
  }

  activeTooltipOwner =
    owner;
}


function clearActiveTooltipFloating(
  element
) {
  if (
    activeTooltipOwner?.element
      !==
      element
  ) {
    return;
  }

  activeTooltipOwner =
    null;
}


function closeActiveTooltipFloating(
  reason = "dismiss"
) {
  if (
    !activeTooltipOwner
  ) {
    return;
  }

  const owner =
    activeTooltipOwner;

  activeTooltipOwner =
    null;

  invokeClose(
    owner,
    reason
  );
}


/* ========================================
 * Interactive Floating Ownership
 * ======================================== */

function setActiveInteractiveFloating(
  owner
) {
  if (
    !isValidOwner(owner)
  ) {
    return;
  }

  closeActiveTooltipFloating(
    "interactive-open"
  );

  if (
    activeInteractiveOwner
    &&
    activeInteractiveOwner.element
      !==
      owner.element
  ) {
    const previous =
      activeInteractiveOwner;

    activeInteractiveOwner =
      null;

    invokeClose(
      previous,
      "superseded"
    );
  }

  activeInteractiveOwner =
    owner;
}


function clearActiveInteractiveFloating(
  element
) {
  if (
    activeInteractiveOwner?.element
      !==
      element
  ) {
    return;
  }

  activeInteractiveOwner =
    null;
}


function closeActiveInteractiveFloating(
  reason = "dismiss"
) {
  if (
    !activeInteractiveOwner
  ) {
    return;
  }

  const owner =
    activeInteractiveOwner;

  activeInteractiveOwner =
    null;

  invokeClose(
    owner,
    reason
  );
}


export {
  positionFloating,

  setActiveTooltipFloating,
  clearActiveTooltipFloating,
  closeActiveTooltipFloating,

  setActiveInteractiveFloating,
  clearActiveInteractiveFloating,
  closeActiveInteractiveFloating,
};