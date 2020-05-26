import { debounce, smoothScroll, setAriaPressed, cloning } from './helpers';
import { indicatorButtonsClass, scrollerClass, arrowsClass, indicatorClass } from './_constants';

function Carousel() {
  this.indicator = null;
  this.scroller = null;
  this.indicatorButtons = null;
  this.arrows = null;
  this.scrollLeft = null;
  this.current = 1;

  this.indicator = document.querySelector(indicatorClass);
  this.scroller = document.querySelector(scrollerClass);
}

export default Carousel;

Carousel.prototype.init = function () {
  cloning(this.indicator, true);
  cloning(this.scroller);

  this.indicatorButtons = this.indicator.querySelectorAll(indicatorButtonsClass);
  this.arrows = document.querySelectorAll(arrowsClass);

  this.scrollLeft = Math.floor(
    this.scroller.scrollWidth * (this.current / this.indicatorButtons.length)
  );
  smoothScroll(this.scroller, this.scrollLeft, true, true);

  this.handleIndicatorClick();
  this.handleArrowClick();
};

Carousel.prototype.updateNode = function (index, delay, instant) {
  setAriaPressed(this.indicatorButtons, index);

  setTimeout(() => {
    this.scrollLeft = Math.floor(this.scroller.scrollWidth * (index / this.indicatorButtons.length));
    smoothScroll(this.scroller, this.scrollLeft, true, instant);
  }, delay)

};

Carousel.prototype.handleIndicatorClick = function () {
  this.indicatorButtons.forEach((indicator, idx) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.updateNode(idx, 0);
    });
  });
};

Carousel.prototype.handleArrowClick = function () {
  this.arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.indicatorButtons.forEach((indicator, idx) => {
        this.updateCurrent(indicator, e.target.name, idx)
      });

      this.updateNode(this.current, 0)

      if (this.indicatorButtons.length - 1 === this.current) {
        this.updateNode(1, 550, true)
      }

      if (this.current === 0) {
        this.updateNode(this.indicatorButtons.length - 2, 550, true)
      }
    });
  });
};

Carousel.prototype.updateCurrent = function (indicator, name, idx) {
  if (indicator.ariaPressed === 'true') this.current = name === 'right' ? idx + 1 : idx - 1;
};
