function style(el, styles) {
  for (let style in styles) {
    el.style[style] = styles[style];
  }
}

export { style };
