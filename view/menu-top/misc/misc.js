import { style } from "/view/utilities.js";

const COLOR_BG = "rgb(200, 200, 200)";

const el = document.createElement("div");

init();

function activate() {
  style(el, {
    display: "inline-block",
  });
}

function deactivate() {
  style(el, {
    display: "none",
  });
}

function init() {
  style(el, {
    position: "absolute",
    right: 0,
    width: "400px",
    height: "300px",
    display: "none",
    "z-index": 55,
    border: "outset",
    "background-color": COLOR_BG,
  });
}

function resize(pxTop) {
  console.log("    misc.resize()");
  style(el, {
    top: `${pxTop}px`,
  });
}

export { activate, deactivate, el, resize };
