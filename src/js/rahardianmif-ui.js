import {
  initTheme,
} from "./core/theme-manager.js";

import {
  initTabs,
} from "./components/tabs.js";


function init() {
  initTheme();

  initTabs();
}


const RahardianmifUI = {
  init,
};


export default RahardianmifUI;