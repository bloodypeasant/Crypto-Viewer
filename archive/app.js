import * as view from "/view/view.js";

let moves = [];
let plainLetterSelected = undefined;

window.addEventListener("cipherLetterSelected", (e) => {
  if (plainLetterSelected) {
    plainLetterSelected.finishSelection();
    let cipherLetter =
      view.menuTop.letters.cipherLetters[plainLetterSelected.pos];
    cipherLetter.setLetter(e.detail.ch);
    moves.push({
      cipherLetter: cipherLetter,
      plainLetter: plainLetterSelected,
      selectorLetter: e.detail,
    });
    plainLetterSelected = undefined;
  }
  view.menuTop.selector.deactivate();
});

window.addEventListener("plainLetterSelected", (e) => {
  if (plainLetterSelected) {
    if (e.detail === plainLetterSelected) {
      view.menuTop.selector.deactivate();
      plainLetterSelected = undefined;
    } else {
      view.menuTop.selector.activate(e.detail.ch);
      plainLetterSelected.deselect();
      plainLetterSelected = e.detail;
    }
  } else {
    plainLetterSelected = e.detail;
    view.menuTop.selector.activate(e.detail.ch);
  }
});

window.addEventListener("plainLetterDeselected", (e) => {
  plainLetterSelected = undefined;
  view.menuTop.selector.deactivate();
});

window.addEventListener("miscPressed", (e) => {
  view.menuTop.misc.activate();
});

window.addEventListener("miscUnpressed", (e) => {
  view.menuTop.misc.deactivate();
});

window.addEventListener("undo", (e) => {
  if (!moves.length) {
    return;
  }
  let move = moves.pop();
  move.cipherLetter.setUnknown();
  move.selectorLetter.setAvailable();
  move.plainLetter.deselect();
  //     move.cipher.coEl.style["background-image"] =
  //       'url("./alphabet/unknown.svg")';
  //     move.cipher.el.setAttribute(
  //       "onclick",
  //       "handleCipherClick(this, 'alphabet-plain-" +
  //         move.cipher.letter.toLowerCase() +
  //         "', '" +
  //         move.cipher.letter +
  //         "');"
  //     );
  //     move.plain.el.style.display = "inline-block";
  //     for (let elimination of move.eliminations) {
  //       elimination.el.innerHTML = elimination.originalLetter;
  //       elimination.el.style["background-color"] = "black";
  //       elimination.el.style.color = "white";
  //       cipherLetters.push(elimination);
  //     }
  //     if (selectionStatus.cipher) {
  //       selectionStatus.cipher.el.style.border = "outset";
  //       selectionStatus.cipher.coEl.style["background-color"] = "transparent";
  //       selectionStatus.cipher = undefined;
  //     }
  //     if (selectionStatus.plain) {
  //       selectionStatus.plain.el.style.border = "outset";
  //       selectionStatus.plain = undefined;
  //     }
});

// window.onload = () => {
//   import("./view/view.js").then((module) => {
//   });
// };

// let selectionStatus = {
//   cipher: undefined,
//   plain: undefined,
// };

// let cipherLetters = [];

// window.onload = init;

// function handleCipherClick(el, coEl, letter) {
//   coEl = document.getElementById(coEl);
//   if (selectionStatus.cipher) {
//     selectionStatus.cipher.el.style.border = "outset";
//     selectionStatus.cipher.coEl.style["background-color"] = "transparent";
//     el.style.border = "inset";
//     coEl.style["background-color"] = "pink";
//     selectionStatus.cipher = { el: el, coEl: coEl, letter: letter };
//   } else if (selectionStatus.plain) {
//     coEl.style["background-image"] =
//       'url("./alphabet/plain/' +
//       selectionStatus.plain.letter.toLowerCase() +
//       '.svg")';
//     el.removeAttribute("onclick");
//     selectionStatus.plain.el.style.border = "outset";
//     selectionStatus.plain.el.style.display = "none";
//     let results = [];
//     let eliminations = [];
//     for (let cl of cipherLetters) {
//       if (cl.letter.toLowerCase() === letter.toLowerCase()) {
//         if (cl.letter !== letter.toLowerCase()) {
//           cl.el.innerHTML = selectionStatus.plain.letter;
//         } else {
//           cl.el.innerHTML = selectionStatus.plain.letter.toLowerCase();
//         }
//         cl.el.style["background-color"] = "white";
//         cl.el.style.color = "black";
//         eliminations.push(cl);
//       } else {
//         results.push(cl);
//       }
//     }
//     cipherLetters = results;
//     moves.push({
//       cipher: {
//         letter: letter,
//         el: el,
//         coEl: coEl,
//       },
//       plain: {
//         letter: selectionStatus.plain.letter,
//         el: selectionStatus.plain.el,
//       },
//       eliminations: eliminations,
//     });
//     selectionStatus.cipher = undefined;
//     selectionStatus.plain = undefined;
//   } else {
//     el.style.border = "inset";
//     coEl.style["background-color"] = "pink";
//     selectionStatus.cipher = { el: el, coEl: coEl, letter: letter };
//   }
// }

// function handlePlainClick(el, letter) {
//   if (selectionStatus.plain) {
//     selectionStatus.plain.el.style.border = "outset";
//     el.style.border = "inset";
//     selectionStatus.plain = { el: el, letter: letter };
//   } else if (selectionStatus.cipher) {
//     selectionStatus.cipher.coEl.style["background-image"] =
//       'url("./alphabet/plain/' + letter.toLowerCase() + '.svg")';
//     selectionStatus.cipher.el.removeAttribute("onclick");
//     selectionStatus.cipher.el.style.border = "outset";
//     selectionStatus.cipher.coEl.style["background-color"] = "transparent";
//     el.style.display = "none";
//     let results = [];
//     let eliminations = [];
//     for (let cl of cipherLetters) {
//       if (
//         cl.letter.toLowerCase() === selectionStatus.cipher.letter.toLowerCase()
//       ) {
//         if (cl.letter !== selectionStatus.cipher.letter.toLowerCase()) {
//           cl.el.innerHTML = letter;
//         } else {
//           cl.el.innerHTML = letter.toLowerCase();
//         }
//         cl.el.style["background-color"] = "white";
//         cl.el.style.color = "black";
//         eliminations.push(cl);
//       } else {
//         results.push(cl);
//       }
//     }
//     cipherLetters = results;
//     moves.push({
//       cipher: {
//         letter: selectionStatus.cipher.letter,
//         el: selectionStatus.cipher.el,
//         coEl: selectionStatus.cipher.coEl,
//       },
//       plain: {
//         letter: letter,
//         el: el,
//       },
//       eliminations: eliminations,
//     });
//     selectionStatus.cipher = undefined;
//     selectionStatus.plain = undefined;
//   } else {
//     el.style.border = "inset";
//     selectionStatus.plain = { el: el, letter: letter };
//   }
// }

// function init() {
//   document.getElementById("menu-popup-close").addEventListener("click", () => {
//     document.getElementById("menu-popup").style.display = "none";
//   });
//   document.getElementById("menu-dropdown").addEventListener("click", () => {
//     document.getElementById("menu-popup").style.display = "inline-block";
//   });
//   document.getElementById("menu-undo").addEventListener("click", () => {
//     if (!moves.length) {
//       return;
//     }
//     let move = moves.pop();
//     move.cipher.coEl.style["background-image"] =
//       'url("./alphabet/unknown.svg")';
//     move.cipher.el.setAttribute(
//       "onclick",
//       "handleCipherClick(this, 'alphabet-plain-" +
//         move.cipher.letter.toLowerCase() +
//         "', '" +
//         move.cipher.letter +
//         "');"
//     );
//     move.plain.el.style.display = "inline-block";
//     for (let elimination of move.eliminations) {
//       elimination.el.innerHTML = elimination.originalLetter;
//       elimination.el.style["background-color"] = "black";
//       elimination.el.style.color = "white";
//       cipherLetters.push(elimination);
//     }
//     if (selectionStatus.cipher) {
//       selectionStatus.cipher.el.style.border = "outset";
//       selectionStatus.cipher.coEl.style["background-color"] = "transparent";
//       selectionStatus.cipher = undefined;
//     }
//     if (selectionStatus.plain) {
//       selectionStatus.plain.el.style.border = "outset";
//       selectionStatus.plain = undefined;
//     }
//   });
//   document
//     .getElementById("load-ciphertext-input")
//     .addEventListener("change", (e1) => {
//       document.getElementById("menu-popup").style.display = "none";
//       let reader = new FileReader();
//       reader.readAsText(e1.target.files[0], "UTF-8");
//       reader.onload = (e2) => {
//         let a = "a".charCodeAt(0);
//         let z = "z".charCodeAt(0);
//         let A = "A".charCodeAt(0);
//         let Z = "Z".charCodeAt(0);
//         let textDiv = document.getElementById("text-div");
//         textDiv.innerHTML = "";
//         let text = e2.target.result
//           .replace(/(?:\r\n)/g, "\n")
//           .replace(/(?:\r)/g, "\n")
//           .replace(/ /g, "_");
//         let innerDiv = document.createElement("div");
//         innerDiv.style["border-bottom"] = "double";
//         for (let i = 0; i < text.length; ++i) {
//           let ch = text[i];
//           if (ch === "\n") {
//             textDiv.appendChild(innerDiv);
//             innerDiv = document.createElement("div");
//             innerDiv.style["border-bottom"] = "double";
//           } else {
//             let span = document.createElement("span");
//             let cc = ch.charCodeAt(0);
//             if ((cc >= a && cc <= z) || (cc >= A && cc <= Z)) {
//               span.classList.add("text-character-cipher");
//               cipherLetters.push({ letter: ch, el: span, originalLetter: ch });
//             } else {
//               span.classList.add("text-character-plain");
//             }
//             span.innerHTML = ch;
//             innerDiv.appendChild(span);
//           }
//         }
//         textDiv.appendChild(innerDiv);
//       };
//       reader.onerror = (e2) => {
//         document.getElementById("text-div").innerHTML = "error reading file";
//       };
//     });
//   document
//     .getElementById("load-info-input")
//     .addEventListener("change", (e1) => {
//       document.getElementById("menu-popup").style.display = "none";
//       let reader = new FileReader();
//       reader.readAsText(e1.target.files[0], "UTF-8");
//       reader.onload = (e2) => {
//         let toolsDiv = document.getElementById("tools-div");
//         let text = e2.target.result.replace(/(?:\r\n|\r|\n)/g, "<br>");
//         toolsDiv.innerHTML = text;
//       };
//       reader.onerror = (e2) => {
//         document.getElementById("tools-div").innerHTML = "error reading file";
//       };
//     });
// }
