import { style } from "/view/utilities.js";

const COLOR_BUTTON = "white";
const COLOR_MOUSEOVER = "cornflowerblue";
const COLOR_PRESSED = "rgb(200,50,50)";
const COLOR_SELECTED = "azure";
const PATH_LETTERS = "view/menu-top/images/plain-letters/";

class PlainLetter {
  constructor(ch) {
    this.el = document.createElement("div");
    this.ch = ch.toLowerCase();
    this.pos = ch.charCodeAt(0) - "a".charCodeAt(0);
    this.isPressed = false;
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
        window.dispatchEvent(
          new CustomEvent("plainLetterDeselected", { detail: this })
        );
      } else {
        this.isPressed = true;
        style(this.el, {
          border: "inset",
          "background-color": COLOR_PRESSED,
        });
        window.dispatchEvent(
          new CustomEvent("plainLetterSelected", { detail: this })
        );
      }
    });
  }
  finishSelection() {
    style(this.el, {
      "background-color": COLOR_SELECTED,
    });
  }
  resize(pxSize, pxLeftOffset, pxInnerOffset, pxTopOffset) {
    let left = pxLeftOffset + (pxSize + pxInnerOffset) * this.pos;
    style(this.el, {
      left: `${left}px`,
      top: `${pxTopOffset}px`,
      width: `${pxSize}px`,
      height: `${pxSize}px`,
    });
  }
  deselect() {
    style(this.el, {
      "background-color": COLOR_BUTTON,
      border: "outset",
    });
    this.isPressed = false;
  }
}

export { PlainLetter };
