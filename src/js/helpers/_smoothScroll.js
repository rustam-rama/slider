export function smoothScroll(node, topOrLeft, horizontal, instant) {
  return node.scrollTo({
    [horizontal ? 'left' : 'top']: topOrLeft,
    behavior: instant ? 'instant' : 'smooth',
  });
}
