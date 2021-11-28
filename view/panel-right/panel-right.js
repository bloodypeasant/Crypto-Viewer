import * as pane from "/view/panel-right/pane.js";
import { style } from "/view/utilities.js";

const el = document.createElement("div");

init();

function init() {
  style(el, {
    position: "absolute",
    left: "50%",
    width: "50%",
  });
  el.appendChild(pane.el);
}

function resize(pxPanelTop, pxWindowHeight) {
  style(el, {
    top: `${pxPanelTop}px`,
    height: `${Math.floor(pxWindowHeight - pxPanelTop)}px`,
  });
  let bcr = el.getBoundingClientRect();
  pane.resize(bcr.width, bcr.height);
}

export { el, pane, resize };
