import { style } from "/view/utilities.js";

const COLOR_BUTTON = "black";
const COLOR_MOUSEOVER = "cornflowerblue";
// const COLOR_PRESSED = "yellow";
const PATH_LETTERS = "view/menu-top/images/cipher-letters/";

class SelectorLetter {
  constructor(ch) {
    this.el = document.createElement("div");
    this.ch = ch.toLowerCase();
    let pos = ch.charCodeAt(0) - "a".charCodeAt(0);
    this.row = pos < 13 ? 0 : 1;
    this.col = pos % 13;
    this.isAvailable = true;
    style(this.el, {
      position: "absolute",
      "background-color": COLOR_BUTTON,
      "background-image": `url('${PATH_LETTERS + ch}.svg')`,
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "100% 100%",
      border: "outset",
    });
    this.el.addEventListener("mouseenter", () => {
      if (!this.isPressed) {
        style(this.el, {
          "background-color": COLOR_MOUSEOVER,
        });
      }
    });
    this.el.addEventListener("mouseleave", () => {
      if (!this.isPressed) {
        style(this.el, {
          "background-color": COLOR_BUTTON,
        });
      }
    });
    this.el.addEventListener("mousedown", () => {
      if (this.isPressed) {
        this.isPressed = false;
        style(this.el, {
          border: "outset",
          "background-color": COLOR_MOUSEOVER,
        });
      } else {
        this.isAvailable = false;
        style(this.el, {
          display: "none",
        });
        // this.isPressed = true;
        // style(this.el, {
        //   border: "inset",
        //   "background-color": COLOR_PRESSED,
        // });
        window.dispatchEvent(
          new CustomEvent("cipherLetterSelected", { detail: this })
        );
      }
    });
  }
  setAvailable() {
    this.isAvailable = true;
    style(this.el, {
      display: "inline-block",
    });
  }
  // setUnavailable() {
  //   this.isAvailable = false;
  //   style(this.el, {
  //     display: "none",
  //   });
  // }
  resize(pxSize, pxLeftOffset, pxInnerOffset, pxTopOffset) {
    // console.log(`      letter ${this.ch} resize()`);
    let left = pxLeftOffset + (pxSize + pxInnerOffset) * this.col;
    let top = pxTopOffset + (pxSize + pxInnerOffset) * this.row;
    style(this.el, {
      left: `${left}px`,
      top: `${top}px`,
      width: `${pxSize}px`,
      height: `${pxSize}px`,
    });
  }
}

export { SelectorLetter };
