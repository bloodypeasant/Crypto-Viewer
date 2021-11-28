import * as pane from "/view/panel-top/pane.js";
import { style } from "/view/utilities.js";

const PCT_HEIGHT = 0.66;

const el = document.createElement("div");

init();

function init() {
  style(el, {
    position: "absolute",
    left: 0,
    width: "100%",
  });
  el.appendChild(pane.el);
}

function resize(pxPanelTop, pxWindowHeight) {
  style(el, {
    top: `${pxPanelTop}px`,
    height: `${Math.floor(PCT_HEIGHT * (pxWindowHeight - pxPanelTop))}px`,
  });
  let bcr = el.getBoundingClientRect();
  pane.resize(bcr.width, bcr.height);
}

export { el, pane, resize };
