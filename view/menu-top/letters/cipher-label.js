import { style } from "/view/utilities.js";

const URL_IMG = "view/menu-top/images/cipher.svg";

const el = document.createElement("div");

init();

function init() {
  style(el, {
    position: "absolute",
    "background-image": `url('${URL_IMG}')`,
    "background-repeat": "no-repeat",
    "background-position": "center",
    "background-size": "100% 100%",
  });
}

function resize(pxSize, pxLeftOffset, pxInnerOffset, pxTopOffset) {
  let left = pxLeftOffset + (pxSize + pxInnerOffset) * 26;
  style(this.el, {
    left: `${left}px`,
    top: `${pxTopOffset + Math.floor(pxSize / 3)}px`,
    width: `${pxSize}px`,
    height: `${Math.floor(pxSize / 2)}px`,
  });
}

export { el, resize };
