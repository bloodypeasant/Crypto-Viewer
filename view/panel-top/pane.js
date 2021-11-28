import { style } from "/view/utilities.js";

const MARGIN_LEFT_PX = 2;
const MARGIN_TOP_PX = 0;
const MARGIN_RIGHT_PX = 8;
const MARGIN_BOTTOM_PX = 8;

const el = document.createElement("div");

init();

function init() {
  style(el, {
    position: "absolute",
    left: `${MARGIN_LEFT_PX}px`,
    top: `${MARGIN_TOP_PX}px`,
    border: "inset",
    "background-color": "white",
    "overflow-y": "auto",
  });
}

function resize(pxPanelWidth, pxPanelHeight) {
  console.log("    pane.resize()");
  style(el, {
    width: `${pxPanelWidth - MARGIN_LEFT_PX - MARGIN_RIGHT_PX}px`,
    height: `${pxPanelHeight - MARGIN_TOP_PX - MARGIN_BOTTOM_PX}px`,
  });
}

export { el, resize };
