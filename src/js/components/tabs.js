/*
 * Rahardianmif UI
 * Tabs Component
 *
 * v0.4.2
 *
 * Horizontal Tabs with automatic activation.
 *
 * Public initialization remains:
 *
 * RahardianmifUI.init()
 */

const initializedTabSets =
  new WeakSet();


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


function collectTabSets(
  root
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


  const tabSets = [];


  if (
    root.matches
    &&
    root.matches(
      "[data-rm-tabs]"
    )
  ) {
    tabSets.push(
      root
    );
  }


  tabSets.push(
    ...root.querySelectorAll(
      "[data-rm-tabs]"
    )
  );


  return tabSets;
}


function getTabs(
  tabSet
) {
  const tabList =
    tabSet.querySelector(
      '[role="tablist"]'
    );


  if (
    !tabList
  ) {
    return [];
  }


  return [
    ...tabList.querySelectorAll(
      '[role="tab"]'
    ),
  ].filter(
    (tab) =>
      tab.closest(
        "[data-rm-tabs]"
      )
      ===
      tabSet
  );
}


function getPanel(
  tabSet,
  tab
) {
  const panelId =
    tab.getAttribute(
      "aria-controls"
    );


  if (
    !panelId
    ||
    typeof document
    ===
    "undefined"
  ) {
    return null;
  }


  const panel =
    document.getElementById(
      panelId
    );


  if (
    !panel
    ||
    !tabSet.contains(
      panel
    )
  ) {
    return null;
  }


  return panel;
}


function isTabDisabled(
  tab
) {
  return (
    tab.disabled
    ||
    tab.getAttribute(
      "aria-disabled"
    )
    ===
    "true"
  );
}


function getEnabledTabs(
  tabs
) {
  return tabs.filter(
    (tab) =>
      !isTabDisabled(
        tab
      )
  );
}


function activateTab(
  tabSet,
  tabs,
  targetTab,
  {
    focus = false,
  } = {}
) {
  if (
    !targetTab
    ||
    isTabDisabled(
      targetTab
    )
  ) {
    return;
  }


  for (
    const tab
    of tabs
  ) {
    const selected =
      tab
      ===
      targetTab;


    tab.setAttribute(
      "aria-selected",
      String(
        selected
      )
    );


    tab.tabIndex =
      selected
        ? 0
        : -1;


    const panel =
      getPanel(
        tabSet,
        tab
      );


    if (
      panel
    ) {
      panel.hidden =
        !selected;
    }
  }


  if (
    focus
  ) {
    targetTab.focus();
  }
}


function handleTabKeydown(
  event,
  tabSet,
  tabs
) {
  const enabledTabs =
    getEnabledTabs(
      tabs
    );


  if (
    enabledTabs.length
    ===
    0
  ) {
    return;
  }


  const currentIndex =
    enabledTabs.indexOf(
      event.currentTarget
    );


  if (
    currentIndex
    ===
    -1
  ) {
    return;
  }


  let targetIndex =
    null;


  switch (
    event.key
  ) {
    case "ArrowRight":
      targetIndex =
        (
          currentIndex
          +
          1
        )
        %
        enabledTabs.length;

      break;


    case "ArrowLeft":
      targetIndex =
        (
          currentIndex
          -
          1
          +
          enabledTabs.length
        )
        %
        enabledTabs.length;

      break;


    case "Home":
      targetIndex =
        0;

      break;


    case "End":
      targetIndex =
        enabledTabs.length
        -
        1;

      break;


    default:
      return;
  }


  event.preventDefault();


  activateTab(
    tabSet,
    tabs,
    enabledTabs[
      targetIndex
    ],
    {
      focus: true,
    }
  );
}


function initializeTabSet(
  tabSet
) {
  if (
    initializedTabSets.has(
      tabSet
    )
  ) {
    return;
  }


  const tabs =
    getTabs(
      tabSet
    );


  if (
    tabs.length
    ===
    0
  ) {
    initializedTabSets.add(
      tabSet
    );

    return;
  }


  const initiallySelected =
    tabs.find(
      (tab) =>
        tab.getAttribute(
          "aria-selected"
        )
        ===
        "true"
      &&
      !isTabDisabled(
        tab
      )
    )
    ??
    getEnabledTabs(
      tabs
    )[0];


  if (
    initiallySelected
  ) {
    activateTab(
      tabSet,
      tabs,
      initiallySelected
    );
  }


  for (
    const tab
    of tabs
  ) {
    tab.addEventListener(
      "click",
      () => {
        activateTab(
          tabSet,
          tabs,
          tab
        );
      }
    );


    tab.addEventListener(
      "keydown",
      (event) => {
        handleTabKeydown(
          event,
          tabSet,
          tabs
        );
      }
    );
  }


  initializedTabSets.add(
    tabSet
  );
}


function initTabs(
  root =
    getDefaultRoot()
) {
  const tabSets =
    collectTabSets(
      root
    );


  for (
    const tabSet
    of tabSets
  ) {
    initializeTabSet(
      tabSet
    );
  }
}


export {
  initTabs,
};