// Imports
import * as helper from '../helper';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}animate.ts -> default: `;
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
    throw new Error(`${errPath(state)}options.currentSlideId is not a number!`);

  // Guard 2
  if (typeof nId !== 'number' && isSubmit !== true)
    throw new Error(
      `${errPath(
        state
      )}options.nextSlideId or options.isSubmit are not defined!`
    );

  // Guard 3
  if (cId === nId) {
    console.warn(
      `${errPath(
        state
      )}options.currentSlideId (${cId}) and options.nextSlideId (${nId}) are equal!`
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
    form.closest(
      ['overflow-wrapper', 'overflow', 'overflow-hidden']
        .map(str => `[${config.PRODUCT_NAME}="${str}"]`)
        .join(', ')
    ) ||
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

  // Next or current slide var
  const nextOrCurrentSlide = isSubmit ? nextSlide : currentSlide;

  // Is equalDimensions
  const edmAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-equal-dimensions-multiplier`;
  let equalDimensions =
    currentWidth === nextWidth && currentHeight === nextHeight;
  let equalDimensionsMulitplier = parseFloat(
    nextOrCurrentSlide.el.getAttribute(edmAttr) ||
      state.elements.wrapper.getAttribute(edmAttr) ||
      config.DEFAULT_SLIDE_EQUAL_DIMENSIONS_MULTIPLIER.toString()
  );
  equalDimensionsMulitplier = isNaN(equalDimensionsMulitplier)
    ? 0
    : equalDimensionsMulitplier;

  // Reverse
  const isReverse = isSubmit !== true ? cId > nId! : false;

  // Opacity
  const soAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-opacity`;
  let opacityCurrent = parseFloat(
    nextOrCurrentSlide.el.getAttribute(soAttr) ||
      state.elements.wrapper.getAttribute(soAttr) ||
      config.DEFAULT_SLIDE_OPACITY.toString()
  );
  opacityCurrent = isNaN(opacityCurrent) ? 0 : opacityCurrent;
  let opacityNext = parseFloat(
    nextSlide.el.getAttribute(soAttr) ||
      state.elements.wrapper.getAttribute(soAttr) ||
      config.DEFAULT_SLIDE_OPACITY.toString()
  );
  opacityNext = isNaN(opacityNext) ? 0 : opacityNext;

  // Z-index
  const sziAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-z-index`;
  let zIndex = parseFloat(
    nextSlide.el.getAttribute(sziAttr) ||
      state.elements.wrapper.getAttribute(sziAttr)
  );
  zIndex = isNaN(zIndex) ? 1 : zIndex;

  // Current
  const smcAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-move-current`;
  let moveCurrentMultiplier = parseFloat(
    nextOrCurrentSlide.el.getAttribute(smcAttr) ||
      state.elements.wrapper.getAttribute(smcAttr) ||
      config.DEFAULT_SLIDE_MOVE_CURRENT.toString()
  );
  moveCurrentMultiplier = isNaN(moveCurrentMultiplier)
    ? 1
    : moveCurrentMultiplier;
  const stscAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-time-sec-current`;
  let timeCurrent = parseFloat(
    nextOrCurrentSlide.el.getAttribute(stscAttr) ||
      state.elements.wrapper.getAttribute(stscAttr) ||
      config.DEFAULT_SLIDE_TIME_CURRENT.toString()
  );
  timeCurrent = isNaN(timeCurrent) ? 1 : timeCurrent;

  // Next
  const smnAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-move-next`;
  let moveNextMultiplier = parseFloat(
    nextOrCurrentSlide.el.getAttribute(smnAttr) ||
      state.elements.wrapper.getAttribute(smnAttr) ||
      config.DEFAULT_SLIDE_MOVE_NEXT.toString()
  );
  moveNextMultiplier = isNaN(moveNextMultiplier) ? 1 : moveNextMultiplier;
  const stcnAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-time-sec-next`;
  let timeNext = parseFloat(
    nextOrCurrentSlide.el.getAttribute(stcnAttr) ||
      state.elements.wrapper.getAttribute(stcnAttr) ||
      config.DEFAULT_SLIDE_TIME_NEXT.toString()
  );
  timeNext = isNaN(timeNext) ? 1 : timeNext;

  // Direction math
  const sdAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}slide-direction`;
  let direction: any =
    nextOrCurrentSlide.el.getAttribute(sdAttr) ||
    state.elements.wrapper.getAttribute(sdAttr);
  const fadeOnly = direction === 'off' ? 0 : 1;

  direction = parseFloat(direction);
  direction = isNaN(direction) ? config.DEFAULT_SLIDE_DIRECTION : direction;
  direction =
    Math.min(Math.max(direction, 0), 359.9999) - (isReverse ? -180 : 0);
  const angle = ((direction - 90) * Math.PI) / 180;

  // Calculate x & y
  const xCurrent =
    currentWidth * moveCurrentMultiplier * Math.cos(angle) * -1 * fadeOnly;
  const yCurrent =
    currentHeight * moveCurrentMultiplier * Math.sin(angle) * -1 * fadeOnly;
  const xNext = nextWidth * moveNextMultiplier * Math.cos(angle) * fadeOnly;
  const yNext = nextHeight * moveNextMultiplier * Math.sin(angle) * fadeOnly;

  // Fade only logic
  if (!fadeOnly) equalDimensions = false;

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

  // * Test if current slide top is visible
  const currentSlideTopVisible = helper.isElementTopVisible(
    currentSlide.el,
    state,
    { ...options, attributeReferenceElement: currentSlide.el }
  );

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

  console.log('Respect sf-name?');

  console.log(
    'Figure out what needs to be done, accessibility wise on transition!',
    'Also dispatchEvent wise!'
  );

  // * Other animations *

  console.log('Allow to customize easing!!!!!');

  // Call progress animation
  state.view.progress(options);

  // * Call anchor animation *
  if (!state.modes.scrollIfTopNotVisible || !currentSlideTopVisible)
    setTimeout(
      () => {
        state.sdk.scrollTo({
          ...options,
          attributeReferenceElement: nextSlide.el,
        });
      },
      currentHeight < nextHeight
        ? timeCurrent * 1000 + 1
        : state.sdk.animationData.timeBoth * 1000 + 1
    );

  console.log('NEW SCROLL TO TOP MODE; RESPECT IT!!!!!!!!!!!!!');

  // Add / remove sf-active
  state.removeSfActive(cId);
  state.addSfActive(nId);

  // Trigger the after trigger
  helper.triggerAllFunctions(state.view.eventsFunctionArrays.afterAnimate);
}
