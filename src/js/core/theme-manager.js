/*
 * Rahardianmif UI
 * Theme Manager
 *
 * Storage key:
 * rm-theme
 */

const RM_THEME_STORAGE_KEY = "rm-theme";

const RM_THEME_LIGHT = "light";
const RM_THEME_DARK = "dark";
const RM_THEME_SYSTEM = "system";

const RM_THEME_VALUES = new Set([
  RM_THEME_LIGHT,
  RM_THEME_DARK,
  RM_THEME_SYSTEM,
]);

const RM_DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

let rmThemePreference = RM_THEME_SYSTEM;
let rmThemeMediaQuery = null;
let rmThemeInitialized = false;


/**
 * Check whether a value is a supported theme preference.
 *
 * @param {string|null} value
 * @returns {boolean}
 */
function isValidThemePreference(value) {
  return typeof value === "string" && RM_THEME_VALUES.has(value);
}


/**
 * Read the saved user preference.
 *
 * Storage failures must not prevent the UI from working.
 *
 * @returns {string|null}
 */
function readStoredThemePreference() {
  try {
    const value = window.localStorage.getItem(RM_THEME_STORAGE_KEY);

    return isValidThemePreference(value)
      ? value
      : null;
  } catch {
    return null;
  }
}


/**
 * Persist the user preference.
 *
 * @param {"light"|"dark"|"system"} preference
 */
function writeStoredThemePreference(preference) {
  try {
    window.localStorage.setItem(
      RM_THEME_STORAGE_KEY,
      preference
    );
  } catch {
    /*
     * Storage may be unavailable because of browser
     * privacy/security settings.
     *
     * Theme behavior should continue without persistence.
     */
  }
}


/**
 * Read a valid initial preference from the root element.
 *
 * This allows markup such as:
 *
 * <html data-rm-theme="dark">
 * <html data-rm-theme="system">
 *
 * @returns {string|null}
 */
function readRootThemePreference() {
  const value =
    document.documentElement.getAttribute(
      "data-rm-theme"
    );

  return isValidThemePreference(value)
    ? value
    : null;
}


/**
 * Resolve the operating-system theme.
 *
 * @returns {"light"|"dark"}
 */
function resolveSystemTheme() {
  if (
    typeof window.matchMedia !== "function"
  ) {
    return RM_THEME_LIGHT;
  }

  return window.matchMedia(
    RM_DARK_MODE_QUERY
  ).matches
    ? RM_THEME_DARK
    : RM_THEME_LIGHT;
}


/**
 * Resolve a preference into the effective theme.
 *
 * @param {"light"|"dark"|"system"} preference
 * @returns {"light"|"dark"}
 */
function resolveTheme(preference) {
  if (preference === RM_THEME_SYSTEM) {
    return resolveSystemTheme();
  }

  return preference;
}


/**
 * Apply the effective theme to the official root attribute.
 *
 * Important:
 * `system` is a user preference.
 * The DOM receives the resolved Light or Dark theme.
 *
 * @param {"light"|"dark"|"system"} preference
 * @returns {"light"|"dark"}
 */
function applyTheme(preference) {
  const effectiveTheme =
    resolveTheme(preference);

  document.documentElement.setAttribute(
    "data-rm-theme",
    effectiveTheme
  );

  return effectiveTheme;
}


/**
 * Respond to operating-system theme changes.
 *
 * OS changes affect the UI only while the user
 * preference is `system`.
 */
function handleSystemThemeChange() {
  if (
    rmThemePreference !== RM_THEME_SYSTEM
  ) {
    return;
  }

  applyTheme(rmThemePreference);
}


/**
 * Register the prefers-color-scheme listener.
 */
function registerSystemThemeListener() {
  if (
    typeof window.matchMedia !== "function"
  ) {
    return;
  }

  rmThemeMediaQuery =
    window.matchMedia(
      RM_DARK_MODE_QUERY
    );

  if (
    typeof rmThemeMediaQuery.addEventListener ===
    "function"
  ) {
    rmThemeMediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    );

    return;
  }

  /*
   * Compatibility fallback for environments
   * using the older MediaQueryList API.
   */
  if (
    typeof rmThemeMediaQuery.addListener ===
    "function"
  ) {
    rmThemeMediaQuery.addListener(
      handleSystemThemeChange
    );
  }
}


/**
 * Initialize Rahardianmif UI theme handling.
 *
 * Priority:
 *
 * 1. Saved user preference
 * 2. Valid data-rm-theme value in markup
 * 3. System
 *
 * @returns {{
 *   preference: "light"|"dark"|"system",
 *   effectiveTheme: "light"|"dark"
 * }}
 */
function initTheme() {
  const storedPreference =
    readStoredThemePreference();

  const markupPreference =
    readRootThemePreference();

  rmThemePreference =
    storedPreference ??
    markupPreference ??
    RM_THEME_SYSTEM;

  const effectiveTheme =
    applyTheme(rmThemePreference);

  if (!rmThemeInitialized) {
    registerSystemThemeListener();
    rmThemeInitialized = true;
  }

  return {
    preference: rmThemePreference,
    effectiveTheme,
  };
}


/**
 * Change the user theme preference.
 *
 * Supported values:
 * - light
 * - dark
 * - system
 *
 * @param {"light"|"dark"|"system"} preference
 * @returns {{
 *   preference: "light"|"dark"|"system",
 *   effectiveTheme: "light"|"dark"
 * }}
 */
function setThemePreference(preference) {
  if (!isValidThemePreference(preference)) {
    throw new TypeError(
      'Rahardianmif UI theme must be "light", "dark", or "system".'
    );
  }

  rmThemePreference = preference;

  writeStoredThemePreference(
    rmThemePreference
  );

  const effectiveTheme =
    applyTheme(rmThemePreference);

  return {
    preference: rmThemePreference,
    effectiveTheme,
  };
}


/**
 * Return the currently selected preference.
 *
 * @returns {"light"|"dark"|"system"}
 */
function getThemePreference() {
  return rmThemePreference;
}


/**
 * Return the theme currently rendered by the UI.
 *
 * @returns {"light"|"dark"}
 */
function getEffectiveTheme() {
  return resolveTheme(
    rmThemePreference
  );
}


export {
  initTheme,
  setThemePreference,
  getThemePreference,
  getEffectiveTheme,
};