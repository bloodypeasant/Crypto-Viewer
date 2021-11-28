import { ControlMisc } from "/view/menu-top/controls/control-misc.js";
import { ControlUndo } from "/view/menu-top/controls/control-undo.js";
import { style } from "/view/utilities.js";

const RIGHT_OFFSET = 2; // px
const INNER_OFFSET = 8; // px
const TOP_OFFSET = 1; // px

const el = document.createElement("div");
const misc = new ControlMisc("misc.svg", 0, 2);
const undo = new ControlUndo("undo.svg", 1, 2);

init();

function init() {
  el.appendChild(undo.el);
  el.appendChild(misc.el);
  style(el, {
    position: "absolute",
    right: 0,
    top: 0,
  });
}

function resize(pxWidth, pxHeightControls, stSizeControl) {
  misc.resize(stSizeControl, RIGHT_OFFSET, INNER_OFFSET, TOP_OFFSET);
  undo.resize(stSizeControl, RIGHT_OFFSET, INNER_OFFSET, TOP_OFFSET);
  style(el, {
    width: `${pxWidth}px`,
    height: `${pxHeightControls}px`,
  });
}

export { el, misc, resize, undo };
