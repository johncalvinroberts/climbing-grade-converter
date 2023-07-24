// small script to set the color scheme to the body on initial load
// should run before the document has finished parsing, to avoid FOUC
// aka, this script should run in the head

import { COLOR_SCHEME_KEY } from "./constants";
const schemes = ["dark", "light"];

const setColorMode = () => {
  let theme = "light";
  const locallyStoredPreference = localStorage.getItem(COLOR_SCHEME_KEY);
  if (locallyStoredPreference && schemes.includes(locallyStoredPreference)) {
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) theme = "dark";
  }
  document.body.className = theme;
};

// watch for changes in color mode
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", setColorMode);

// run the script on load
(() => setColorMode())();
