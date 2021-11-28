import { SelectorLetter } from "/view/menu-top/selector/selector-letter.js";
import { style } from "/view/utilities.js";

const INNER_OFFSET = 8; // px
const LEFT_OFFSET = 2; // px
const TOP_OFFSET = 1; // px

const el = document.createElement("div");
const selectorLetters = [];

let pxCurrentLetterSize = 0;
let currentPos = 0;

init();
makeLetters();

function activate(ch) {
  let pos = ch.charCodeAt(0) - "a".charCodeAt(0);
  currentPos = pos - 6;
  if (currentPos < 0) {
    currentPos = 0;
  } else if (currentPos > 17) {
    currentPos = 17;
  }
  style(el, {
    display: "inline-block",
    left: `${currentPos * (pxCurrentLetterSize + INNER_OFFSET)}px`,
    width: `${13 * (pxCurrentLetterSize + INNER_OFFSET) + LEFT_OFFSET}px`,
    height: `${2 * (pxCurrentLetterSize + INNER_OFFSET) + TOP_OFFSET}px`,
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
    left: "50px",
    top: "50px",
    width: "400px",
    height: "300px",
    display: "none",
    border: "outset",
    "z-index": 50,
  });
}

function makeLetters() {
  for (let i = 0; i < 26; ++i) {
    const selectorLetter = new SelectorLetter(
      String.fromCharCode("a".charCodeAt(0) + i)
    );
    selectorLetters.push(selectorLetter);
    el.appendChild(selectorLetter.el);
  }
}

function resize(pxSizeLetter, pxTop) {
  pxCurrentLetterSize = pxSizeLetter;
  for (let selectorLetter of selectorLetters) {
    selectorLetter.resize(pxSizeLetter, LEFT_OFFSET, INNER_OFFSET, TOP_OFFSET);
  }
  let bcr = selectorLetters[25].el.getBoundingClientRect();
  style(el, {
    top: `${pxTop}px`,
    left: `${currentPos * (pxCurrentLetterSize + INNER_OFFSET)}px`,
    width: `${13 * (pxCurrentLetterSize + INNER_OFFSET) + LEFT_OFFSET}px`,
    height: `${2 * (pxCurrentLetterSize + INNER_OFFSET) + TOP_OFFSET}px`,
  });
}

export { activate, deactivate, el, resize, selectorLetters };
