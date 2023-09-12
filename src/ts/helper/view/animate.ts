// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (index: number, options: Options) {
  // Values
  const state = model.state[index];
  const cId = options.currentSlideId;
  const nId = options.nextSlideId;
  const isSubmit = options.isSubmit;

  // Guard 0 - Do not animate mode
  if (options.doNotAnimate) return;

  // Guard 1
  if (typeof cId !== 'number')
    throw new Error(
      `StudioForm[${state.sdk.i}] -> animate.ts -> default: options.currentSlideId is not a number!`
    );

  // Guard 2
  if (typeof nId !== 'number' && isSubmit !== true)
    throw new Error(
      `StudioForm[${state.sdk.i}] -> animate.ts -> default: options.nextSlideId or options.isSubmit are not defined!`
    );

  // Guard 3
  if (cId === nId) {
    console.warn(
      `StudioForm[${state.sdk.i}] -> animate.ts -> default: options.currentSlideId (${cId}) and options.nextSlideId (${nId}) are equal!`
    );
    return;
  }

  // * Define *

  // Elements
  const currentSlide =
    isSubmit !== true ? state.sdk.slideLogic[cId] : { el: state.elements.mask };
  const nextSlide =
    isSubmit !== true
      ? state.sdk.slideLogic[nId!]
      : { el: state.elements.successMsg };
  const form: HTMLElement =
    isSubmit !== true ? state.elements.mask : state.elements.wrapper;
  const overflowElement: HTMLElement =
    form.closest('[studio-form="overflow-wrapper"]') ||
    form.closest('section') ||
    state.elements.wrapper;

  // * Width & height *

  // Current
  const currentWidth = currentSlide.el.offsetWidth;
  const currentHeight = currentSlide.el.offsetHeight;

  // Next
  isSubmit === true
    ? (nextSlide.el.style.display = 'block')
    : (nextSlide.el.style.display = '');
  const nextWidth = nextSlide.el.offsetWidth;
  const nextHeight = nextSlide.el.offsetHeight;
  nextSlide.el.style.display = 'none';

  // * Values *

  // Is equalDimensions
  const equalDimensions =
    currentWidth === nextWidth && currentHeight === nextHeight;
  let equalDimensionsMulitplier = parseFloat(
    currentSlide.el.getAttribute('data-slide-equal-dimensions-multiplier') ||
      state.elements.wrapper.getAttribute(
        'data-slide-equal-dimensions-multiplier'
      ) ||
      config.DEFAULT_SLIDE_EQUAL_DIMENSIONS_MULTIPLIER.toString()
  );
  equalDimensionsMulitplier = isNaN(equalDimensionsMulitplier)
    ? 0
    : equalDimensionsMulitplier;

  // Reverse
  const isReverse = isSubmit !== true ? cId > nId! : false;

  // Opacity
  let opacityCurrent = parseFloat(
    currentSlide.el.getAttribute('data-slide-opacity') ||
      state.elements.wrapper.getAttribute('data-slide-opacity') ||
      config.DEFAULT_SLIDE_OPACITY.toString()
  );
  opacityCurrent = isNaN(opacityCurrent) ? 0 : opacityCurrent;
  let opacityNext = parseFloat(
    nextSlide.el.getAttribute('data-slide-opacity') ||
      state.elements.wrapper.getAttribute('data-slide-opacity') ||
      config.DEFAULT_SLIDE_OPACITY.toString()
  );
  opacityNext = isNaN(opacityNext) ? 0 : opacityNext;

  // Z-index
  let zIndex = parseFloat(
    nextSlide.el.getAttribute('data-slide-z-index') ||
      state.elements.wrapper.getAttribute('data-slide-z-index')
  );
  zIndex = isNaN(zIndex) ? 1 : zIndex;

  // Current
  let moveCurrentMultiplier = parseFloat(
    currentSlide.el.getAttribute('data-slide-move-current') ||
      state.elements.wrapper.getAttribute('data-slide-move-current') ||
      config.DEFAULT_SLIDE_MOVE_CURRENT.toString()
  );
  moveCurrentMultiplier = isNaN(moveCurrentMultiplier)
    ? 1
    : moveCurrentMultiplier;
  let timeCurrent = parseFloat(
    currentSlide.el.getAttribute('data-slide-time-sec-current') ||
      state.elements.wrapper.getAttribute('data-slide-time-sec-current') ||
      config.DEFAULT_SLIDE_TIME_CURRENT.toString()
  );
  timeCurrent = isNaN(timeCurrent) ? 1 : timeCurrent;

  // Next
  let moveNextMultiplier = parseFloat(
    currentSlide.el.getAttribute('data-slide-move-next') ||
      state.elements.wrapper.getAttribute('data-slide-move-next') ||
      config.DEFAULT_SLIDE_MOVE_NEXT.toString()
  );
  moveNextMultiplier = isNaN(moveNextMultiplier) ? 1 : moveNextMultiplier;
  let timeNext = parseFloat(
    currentSlide.el.getAttribute('data-slide-time-sec-next') ||
      state.elements.wrapper.getAttribute('data-slide-time-sec-next') ||
      config.DEFAULT_SLIDE_TIME_NEXT.toString()
  );
  timeNext = isNaN(timeNext) ? 1 : timeNext;

  // Direction math
  let direction: number = parseFloat(
    currentSlide.el.getAttribute('data-slide-direction') ||
      state.elements.wrapper.getAttribute('data-slide-direction')
  );
  direction = isNaN(direction) ? config.DEFAULT_SLIDE_DIRECTION : direction;
  direction =
    Math.min(Math.max(direction, 0), 359.9999) - (isReverse ? -180 : 0);
  const angle = ((direction - 90) * Math.PI) / 180;

  // Calculate x & y
  const xCurrent = currentWidth * moveCurrentMultiplier * Math.cos(angle) * -1;
  const yCurrent = currentHeight * moveCurrentMultiplier * Math.sin(angle) * -1;
  const xNext = nextWidth * moveNextMultiplier * Math.cos(angle);
  const yNext = nextHeight * moveNextMultiplier * Math.sin(angle);

  // * Update animationData sdk *
  state.sdk.animationData = {
    ...state.sdk.animationData,
    currentElement: currentSlide.el,
    nextElement: nextSlide.el,
    parentElement: form,
    overflowElement: overflowElement,
    direction: direction,
    angle: angle,
    opacityNext: opacityNext,
    opacityCurrent: opacityCurrent,
    zIndex: zIndex,
    xCurrent: xCurrent,
    yCurrent: yCurrent,
    currentWidth: currentWidth,
    currentHeight: currentHeight,
    moveCurrentMultiplier: moveCurrentMultiplier,
    timeCurrent: timeCurrent,
    xNext: xNext,
    yNext: yNext,
    nextWidth: nextWidth,
    nextHeight: nextHeight,
    moveNextMultiplier: moveNextMultiplier,
    timeNext: timeCurrent,
    equalDimensions: equalDimensions,
    equalDimensionsMulitplier: equalDimensionsMulitplier,
    timeBoth:
      timeCurrent * (equalDimensions ? equalDimensionsMulitplier : 1) +
      timeNext,
  };

  // * Main animation *

  // Values
  const tl = gsap.timeline();
  const gsapObj = state.view.gsapTimeline;

  // Clear existing timeline
  if (gsapObj.isRunning) {
    gsapObj.tl.progress(1);
    gsapObj.tl.clear();
  }

  // Values
  gsapObj.tl = tl;
  gsapObj.isRunning = true;

  // * Initial set *

  // Overflow
  tl.set(overflowElement, {
    overflow: 'hidden',
  });

  // Form
  tl.set(form, {
    width: currentWidth,
    height: currentHeight,
    position: 'relative',
  });

  // Current
  tl.set(currentSlide.el, {
    x: 0,
    y: 0,
    opacity: 1,
    display: '',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  });

  // Next
  tl.set(nextSlide.el, {
    x: xNext,
    y: yNext,
    opacity: opacityNext,
    zIndex: zIndex,
    display: isSubmit !== true ? '' : 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  });

  // * Timeline animation *

  // Current
  tl.to(currentSlide.el, {
    duration: timeCurrent,
    x: xCurrent,
    y: yCurrent,
    opacity: opacityCurrent,
  });

  // Form - height / width adjustment
  tl.to(
    form,
    {
      duration: timeCurrent,
      width: Math.max(currentWidth, nextWidth),
      height: Math.max(currentHeight, nextHeight),
    },
    `<`
  );

  // Next
  tl.to(
    nextSlide.el,
    {
      duration: timeNext,
      x: 0,
      y: 0,
      opacity: 1,
    },
    `<+=${
      equalDimensions ? timeCurrent * equalDimensionsMulitplier : timeCurrent
    }`
  );

  // Form - height / width adjustment
  tl.to(
    form,
    {
      duration: timeNext,
      width: nextWidth,
      height: nextHeight,
    },
    `<`
  );

  // * Reset styles *

  // Current
  tl.set(currentSlide.el, {
    x: '',
    y: '',
    opacity: '',
    display: 'none',
    position: '',
    left: '',
    top: '',
    right: '',
    bottom: '',
  });

  // Next
  tl.set(nextSlide.el, {
    x: '',
    y: '',
    opacity: '',
    zIndex: '',
    position: '',
    left: '',
    top: '',
    right: '',
    bottom: '',
  });

  // Form
  tl.set(form, {
    width: '',
    height: '',
    position: '',
  });

  // Remove all styling
  // [currentSlide.el, nextSlide.el, form].forEach((el: HTMLElement) => {
  //   el.style.removeProperty('translate');
  //   el.style.removeProperty('rotate');
  //   el.style.removeProperty('scale');
  //   el.style.removeProperty('transfrom');
  // });

  // Overflow
  tl.set(overflowElement, {
    overflow: '',
  });

  // Animation done call
  tl.call(() => {
    gsapObj.isRunning = undefined;
  });

  // * Other animations *

  // Call progress animation
  state.view.progress(options);

  // * Call anchor animation *
  state.sdk.scrollTo({ ...options, attributeReferenceElement: nextSlide.el });

  // Trigger the after trigger
  helper.triggerAllFunctions(state.view.eventsFunctionArrays.afterAnimate);
}
