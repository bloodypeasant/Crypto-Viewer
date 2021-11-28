import { style } from "/view/utilities.js";

const COLOR_BUTTON = "black";
const PATH_LETTERS = "view/menu-top/images/cipher-letters/";
const URL_UNKNOWN = "view/menu-top/images/unknown.svg";

class CipherLetter {
  constructor(ch) {
    this.el = document.createElement("div");
    this.ch = undefined;
    this.pos = ch.charCodeAt(0) - "a".charCodeAt(0);
    this.isAvailable = true;
    style(this.el, {
      position: "absolute",
      "background-color": "transparent",
      "background-image": `url('${URL_UNKNOWN}')`,
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "100% 100%",
      border: "inset",
    });
  }
  resize(pxSize, pxLeftOffset, pxInnerOffset, pxTopOffset) {
    // console.log(`      letter ${this.ch} resize()`);
    let left = pxLeftOffset + (pxSize + pxInnerOffset) * this.pos;
    style(this.el, {
      left: `${left}px`,
      top: `${pxTopOffset}px`,
      width: `${pxSize}px`,
      height: `${pxSize}px`,
    });
  }
  setLetter(ch) {
    this.ch = ch;
    style(this.el, {
      "background-color": COLOR_BUTTON,
      "background-image": `url('${PATH_LETTERS + ch}.svg')`,
    });
    this.isAvailable = false;
  }
  setUnknown() {
    this.ch = undefined;
    style(this.el, {
      "background-color": "transparent",
      "background-image": `url('${URL_UNKNOWN}')`,
    });
    this.isAvailable = true;
  }
}

export { CipherLetter };
