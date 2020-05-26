export function cloning(parent, indicator = false) {
  const firstClone = parent.children[0].cloneNode(true);
  const lastClone = parent.children[parent.children.length - 1].cloneNode(true);

  if (indicator) {
    firstClone.style.display = 'none';
    lastClone.style.display = 'none';
  } else {
    firstClone.querySelector('img').src = parent.children[parent.children.length - 1].querySelector('img').src
    lastClone.querySelector('img').src = parent.children[0].querySelector('img').src
  }

  parent.prepend(firstClone);
  parent.append(lastClone);
}
