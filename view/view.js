import * as menuTop from "/view/menu-top/menu-top.js";
import * as panelLeft from "/view/panel-left/panel-left.js";
import * as panelRight from "/view/panel-right/panel-right.js";
import * as panelTop from "/view/panel-top/panel-top.js";
import { style } from "/view/utilities.js";

const COLOR_BG = "rgb(200, 200, 200)";

const el = document.createElement("div");

init();

function init() {
  style(document.getElementsByTagName("html")[0], {
    width: "100%",
    height: "100%",
  });
  style(document.body, {
    width: "100%",
    height: "100%",
    margin: 0,
    overflow: "hidden",
  });
  style(el, {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    "background-color": COLOR_BG,
  });
  el.appendChild(menuTop.el);
  el.appendChild(panelTop.el);
  el.appendChild(panelLeft.el);
  el.appendChild(panelRight.el);
  document.body.appendChild(el);
  window.onresize = resize;
  resize();
}

function resize() {
  console.log("view.resize()");
  let pxWidth = window.innerWidth;
  let pxHeight = window.innerHeight;
  menuTop.resize(pxWidth);
  panelTop.resize(menuTop.el.getBoundingClientRect().bottom, pxHeight);
  panelLeft.resize(panelTop.el.getBoundingClientRect().bottom, pxHeight);
  panelRight.resize(panelTop.el.getBoundingClientRect().bottom, pxHeight);
}

export { menuTop, panelLeft, panelRight, panelTop };
