export function setAriaPressed(indicators, index) {
  indicators.forEach((indicator, i) => {
    indicator.setAttribute('aria-pressed', !!(i === index));
  });
}
