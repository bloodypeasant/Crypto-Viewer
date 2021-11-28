import * as controls from "/view/menu-top/controls/controls.js";
import * as letters from "/view/menu-top/letters/letters.js";
import * as misc from "/view/menu-top/misc/misc.js";
import * as selector from "/view/menu-top/selector/selector.js";
import { style } from "/view/utilities.js";

const HEIGHT_DELTA = 2; // px

const el = document.createElement("div");

init();

function init() {
  style(el, {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
  });
  el.appendChild(letters.el);
  el.appendChild(controls.el);
  el.appendChild(selector.el);
  el.appendChild(misc.el);
}

function resize(pxWidthWindow) {
  let pxWidthLetters = Math.floor((pxWidthWindow / 30) * 27);
  letters.resize(pxWidthLetters);
  let stSizeLetter = letters.plainLetters[0].el.style.height;
  let pxHeightLetters = letters.el.getBoundingClientRect().bottom;
  controls.resize(
    pxWidthWindow - pxWidthLetters,
    pxHeightLetters,
    stSizeLetter
  );
  selector.resize(parseInt(stSizeLetter, 10), pxHeightLetters);
  misc.resize(controls.misc.el.getBoundingClientRect().bottom);
  style(el, {
    height: `${pxHeightLetters + HEIGHT_DELTA}px`,
  });
}

export { controls, el, letters, misc, resize, selector };
