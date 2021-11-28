import { style } from "/view/utilities.js";

const COLOR_BUTTON = "rgb(100, 100, 100)";
const COLOR_MOUSEOVER = "cornflowerblue";
const COLOR_PRESSED = "rgb(200,50,50)";

class ControlUndo {
  constructor(imgFile, pos, numControls) {
    this.el = document.createElement("div");
    this.pos = pos;
    this.numControls = numControls;
    style(this.el, {
      position: "absolute",
      "background-color": COLOR_BUTTON,
      "background-image": `url('view/menu-top/controls/images/${imgFile}')`,
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": "100% 100%",
      border: "outset",
    });
    this.el.addEventListener("mouseenter", () => {
      style(this.el, {
        "background-color": COLOR_MOUSEOVER,
      });
    });
    this.el.addEventListener("mouseleave", () => {
      style(this.el, {
        "background-color": COLOR_BUTTON,
        border: "outset",
      });
    });
    this.el.addEventListener("mousedown", () => {
      style(this.el, {
        border: "inset",
        "background-color": COLOR_PRESSED,
      });
      window.dispatchEvent(new CustomEvent("undo", { detail: this }));
    });
    this.el.addEventListener("mouseup", () => {
      style(this.el, {
        border: "outset",
        "background-color": COLOR_MOUSEOVER,
      });
    });
  }
  resize(stSize, pxRightOffset, pxInnerOffset, pxTopOffset) {
    let right = pxRightOffset + (parseInt(stSize) + pxInnerOffset) * this.pos;
    style(this.el, {
      top: `${pxTopOffset}px`,
      right: `${right}px`,
      width: stSize,
      height: stSize,
    });
  }
}

export { ControlUndo };
