import { style } from "/view/utilities.js";

const COLOR_BUTTON = "rgb(100, 100, 100)";
const COLOR_MOUSEOVER = "cornflowerblue";
const COLOR_PRESSED = "rgb(200,50,50)";

class ControlMisc {
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
          new CustomEvent("miscUnpressed", { detail: this })
        );
      } else {
        this.isPressed = true;
        style(this.el, {
          border: "inset",
          "background-color": COLOR_PRESSED,
        });
        window.dispatchEvent(
          new CustomEvent("miscPressed", { detail: this })
        );
      }
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

export { ControlMisc };
