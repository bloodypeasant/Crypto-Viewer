import * as cipherLabel from "/view/menu-top/letters/cipher-label.js";
import { CipherLetter } from "/view/menu-top/letters/cipher-letter.js";
import * as plainLabel from "/view/menu-top/letters/plain-label.js";
import { PlainLetter } from "/view/menu-top/letters/plain-letter.js";
import { style } from "/view/utilities.js";

const INNER_OFFSET = 8; // px
const LEFT_OFFSET = 2; // px
const MAX_SIZE = 36; // px
const TOP_OFFSET = 1; // px

const cipherLetters = [];
const plainLetters = [];
const el = document.createElement("div");

init();
makeLetters();

function init() {
  style(el, {
    position: "absolute",
    left: 0,
    top: 0,
  });
}

function makeLetters() {
  for (let i = 0; i < 26; ++i) {
    const cipherLetter = new CipherLetter(
      String.fromCharCode("a".charCodeAt(0) + i)
    );
    const plainLetter = new PlainLetter(
      String.fromCharCode("a".charCodeAt(0) + i)
    );
    cipherLetters.push(cipherLetter);
    plainLetters.push(plainLetter);
    el.appendChild(plainLetter.el);
    el.appendChild(plainLabel.el);
    el.appendChild(cipherLetter.el);
    el.appendChild(cipherLabel.el);
  }
}

function resize(pxWidth) {
  console.log("    letters.resize()");
  let pxSizeLetter = Math.min(
    Math.floor((pxWidth - LEFT_OFFSET) / 27 - INNER_OFFSET),
    MAX_SIZE
  );
  for (let plainLetter of plainLetters) {
    plainLetter.resize(pxSizeLetter, LEFT_OFFSET, INNER_OFFSET, TOP_OFFSET);
  }
  plainLabel.resize(pxSizeLetter, LEFT_OFFSET, INNER_OFFSET, TOP_OFFSET);
  let pxBottomPlain = plainLetters[0].el.getBoundingClientRect().bottom;
  for (let cipherLetter of cipherLetters) {
    cipherLetter.resize(pxSizeLetter, LEFT_OFFSET, INNER_OFFSET, pxBottomPlain);
  }
  cipherLabel.resize(pxSizeLetter, LEFT_OFFSET, INNER_OFFSET, pxBottomPlain);
  style(el, {
    width: `${pxWidth}px`,
    height: `${cipherLetters[0].el.getBoundingClientRect().bottom}px`,
  });
}

export { cipherLetters, plainLetters, el, resize };
