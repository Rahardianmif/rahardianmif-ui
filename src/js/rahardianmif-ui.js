import {
  initTheme,
} from "./core/theme-manager.js";

import {
  initTabs,
} from "./components/tabs.js";

import {
  initModals,
} from "./components/modal.js";

import {
  initDrawers,
} from "./components/drawer.js";

import {
  initTooltips,
} from "./components/tooltip.js";

import {
  initPopovers,
} from "./components/popover.js";

import {
  initDropdowns,
} from "./components/dropdown.js";

import {
  initDisclosures,
} from "./components/disclosure.js";


function init() {
  initTheme();

  initTabs();

  initModals();

  initDrawers();

  initTooltips();

  initPopovers();

  initDropdowns();

  initDisclosures();
}


const RahardianmifUI = {
  init,
};


export default RahardianmifUI;