/*
 * Rahardianmif UI
 * Main JavaScript Entry Point
 *
 * Core:
 * HTML + CSS + Vanilla JavaScript
 *
 * Module format:
 * ESM source
 */

import "../css/rahardianmif-ui.css";

import {
  initTheme,
} from "./core/theme-manager.js";


/**
 * Initialize Rahardianmif UI.
 *
 * v0.1 responsibilities:
 * - Initialize theme handling.
 *
 * Future component discovery will be added here
 * according to the roadmap.
 */
function init() {
  initTheme();
}


/**
 * Main public library API.
 *
 * Keep this surface intentionally small during v0.1.
 */
const RahardianmifUI = {
  init,
};


export default RahardianmifUI;