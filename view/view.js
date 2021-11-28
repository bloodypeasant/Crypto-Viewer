import * as menuTop from "/view/menu-top/menu-top.js";
import * as panelLeft from "/view/panel-left/panel-left.js";
import * as panelRight from "/view/panel-right/panel-right.js";
import * as panelTop from "/view/panel-top/panel-top.js";
import { style } from "/view/utilities.js";

const COLOR_BG = "rgb(200, 200, 200)";

const el = document.createElement("div");
let moves = [];
let plainLetterSelected = undefined;

init();

function init() {
  setupListeners();
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
  let pxWidth = window.innerWidth;
  let pxHeight = window.innerHeight;
  menuTop.resize(pxWidth);
  panelTop.resize(menuTop.el.getBoundingClientRect().bottom, pxHeight);
  panelLeft.resize(panelTop.el.getBoundingClientRect().bottom, pxHeight);
  panelRight.resize(panelTop.el.getBoundingClientRect().bottom, pxHeight);
}

function setupListeners() {
  window.addEventListener("cipherLetterSelected", (e) => {
    if (plainLetterSelected) {
      plainLetterSelected.finishSelection();
      let cipherLetter =
        menuTop.letters.cipherLetters[plainLetterSelected.pos];
      cipherLetter.setLetter(e.detail.ch);
      moves.push({
        cipherLetter: cipherLetter,
        plainLetter: plainLetterSelected,
        selectorLetter: e.detail,
      });
      plainLetterSelected = undefined;
    }
    menuTop.selector.deactivate();
  });
  
  window.addEventListener("plainLetterSelected", (e) => {
    if (plainLetterSelected) {
      if (e.detail === plainLetterSelected) {
        menuTop.selector.deactivate();
        plainLetterSelected = undefined;
      } else {
        menuTop.selector.activate(e.detail.ch);
        plainLetterSelected.deselect();
        plainLetterSelected = e.detail;
      }
    } else {
      plainLetterSelected = e.detail;
      menuTop.selector.activate(e.detail.ch);
    }
  });
  
  window.addEventListener("plainLetterDeselected", (e) => {
    plainLetterSelected = undefined;
    menuTop.selector.deactivate();
  });
  
  window.addEventListener("miscPressed", (e) => {
    menuTop.misc.activate();
  });
  
  window.addEventListener("miscUnpressed", (e) => {
    menuTop.misc.deactivate();
  });
  
  window.addEventListener("undo", (e) => {
    if (!moves.length) {
      return;
    }
    let move = moves.pop();
    move.cipherLetter.setUnknown();
    move.selectorLetter.setAvailable();
    move.plainLetter.deselect();
  });
}

export { menuTop, panelLeft, panelRight, panelTop };
