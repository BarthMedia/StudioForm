// Imports
import * as utils from './utils';
import * as modelUtils from '../model/utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// Error
const errPath = (s: StudioFormInstance) =>
  `${controllerUtils.errorName(s)} animateTransition.ts:`;

// Calculate animation data
export const data = function (
  instance: StudioFormInstance,
  cId: number | 'done',
  nId: number | 'done',
  options: SFONav
) {
  // Values
  const aData = modelUtils.returnGhost(instance).animationData;
  const elements = instance.elements;
  const formWrapper = elements.wrapper;
  const formMask = elements.mask;
  const formDone = elements.done;
  const logic = instance.logic;
  const nextIsDone = nId === 'done';
  const currentIsDone = cId === 'done';

  // Elements
  const currentSlide = nextIsDone
    ? formMask
    : currentIsDone
    ? formDone
    : logic[cId].element;
  const nextSlide = currentIsDone
    ? formMask
    : nextIsDone
    ? formDone
    : logic[nId].element;
  const wrapper = [nId, cId].includes('done') ? formWrapper : formMask;
  const overflow = (formWrapper.closest(
    utils.createSelector(null, 'overflow')
  ) ||
    formWrapper.closest('section') ||
    formWrapper) as HTMLElement;

  // Guard
  if (!currentSlide || !nextSlide)
    throw Error(`${errPath(instance)} elements.done is not an element!`);

  // * Width & height *

  // Current
  const currentWidth = currentSlide.offsetWidth;
  const currentHeight = currentSlide.offsetHeight;

  // Next
  nextSlide.style.display = nextIsDone ? 'block' : '';
  const nextWidth = nextSlide.offsetWidth;
  const nextHeight = nextSlide.offsetHeight;
  nextSlide.style.display = nextIsDone ? '' : 'none';

  // * Helper *

  // Next or current slide var
  const currentOrDoneSlide = nextIsDone ? nextSlide : currentSlide;

  // Get attribute
  function getAttribute(str: string, current = true) {
    return utils.getAttribute(
      str,
      current ? currentOrDoneSlide : nextSlide,
      formMask,
      formWrapper
    );
  }

  // Get decimal
  function getDecimal(str: string, _default = 1, current = true) {
    // Values
    const val = parseFloat(getAttribute(str, current) || _default + '');

    // Return
    return isNaN(val) ? _default : val;
  }

  // * Values *

  // Is equalDimensions
  let equalDimensions =
    currentWidth === nextWidth && currentHeight === nextHeight;
  const equalDimensionsMulitplier = getDecimal(
    'equal-dimensions-multiplier',
    config.DEFAULT_SLIDE_EQUAL_DIMENSIONS_MULTIPLIER
  );

  // Reverse
  const isReverse = nextIsDone !== true ? cId > nId! : false;
  const isReverseMultiplier = isReverse ? -1 : 1;

  // Opacity
  const opacityCurrent = getDecimal('opacity', config.DEFAULT_SLIDE_OPACITY);
  const opacityNext = getDecimal(
    'opacity',
    config.DEFAULT_SLIDE_OPACITY,
    false
  );

  // Z-index
  const zIndex = getDecimal('z-index', 1, false);

  // Current
  const currentMoveMultiplier = getDecimal(
    'current-move-multiplier',
    config.DEFAULT_SLIDE_CURRENT_MOVE_MULTIPLIER
  );
  const currentTime = options.skipAnimations
    ? 0
    : getDecimal('current-time', config.DEFAULT_SLIDE_CURRENT_TIME);

  // Next
  const nextMoveMultiplier = getDecimal(
    'next-move-multiplier',
    config.DEFAULT_SLIDE_NEXT_MOVE_MULTIPLIER,
    false
  );
  const nextTime = options.skipAnimations
    ? 0
    : getDecimal('next-time', config.DEFAULT_SLIDE_NEXT_TIME, false);

  // Direction math
  const fadeOnly = getAttribute('direction') === 'off' ? 0 : 1;
  const direction = getDecimal('direction', config.DEFAULT_SLIDE_DIRECTION);
  const angle = ((direction - 90) * Math.PI) / 180;

  // Calculate x & y
  const xCurrent =
    currentWidth *
    currentMoveMultiplier *
    Math.cos(angle) *
    -1 *
    fadeOnly *
    isReverseMultiplier;
  const yCurrent =
    currentHeight *
    currentMoveMultiplier *
    Math.sin(angle) *
    -1 *
    fadeOnly *
    isReverseMultiplier;
  const xNext =
    nextWidth *
    nextMoveMultiplier *
    Math.cos(angle) *
    fadeOnly *
    isReverseMultiplier;
  const yNext =
    nextHeight *
    nextMoveMultiplier *
    Math.sin(angle) *
    fadeOnly *
    isReverseMultiplier;

  // Fade only logic
  if (!fadeOnly) equalDimensions = false;

  // * Update animationData sdk *
  Object.assign(aData, {
    // Legacy
    currentElement: currentSlide,
    nextElement: nextSlide,
    parentElement: wrapper,
    overflowElement: overflow,
    direction: fadeOnly ? direction : 'off',
    angle: angle,
    opacityNext: opacityNext,
    opacityCurrent: opacityCurrent,
    zIndex: zIndex,
    xCurrent: xCurrent,
    yCurrent: yCurrent,
    currentWidth: currentWidth,
    currentHeight: currentHeight,
    currentMoveMultiplier: currentMoveMultiplier,
    currentTime: currentTime,
    xNext: xNext,
    yNext: yNext,
    nextWidth: nextWidth,
    nextHeight: nextHeight,
    nextMoveMultiplier: nextMoveMultiplier,
    nextTime: currentTime,
    equalDimensions: equalDimensions,
    equalDimensionsMulitplier: equalDimensionsMulitplier,
    timeBoth:
      currentTime * (equalDimensions ? equalDimensionsMulitplier : 1) +
      nextTime,

    // New
    currentDisplayStart: currentIsDone ? 'block' : '',
    currentDisplayEnd: currentIsDone ? '' : 'none',
    nextDisplayStart: nextIsDone ? 'block' : '',
  });
};

// Export
export const animate = function (instance: StudioFormInstance) {
  // Values
  const ghost = modelUtils.returnGhost(instance);
  const aData = instance.data.animation;

  // Elements
  const currentSlide = aData.currentElement;
  const nextSlide = aData.nextElement;
  const wrapper = aData.parentElement;
  const overflow = aData.overflowElement;

  // * Main animation *

  // Values
  const tl = gsap.timeline();
  const gsapObj = ghost.gsapTl;

  // Clear existing timeline
  if (ghost.root.isTransitioning) {
    gsapObj.transition?.progress(1);
    gsapObj.transition?.clear();
  }

  // Values
  gsapObj.transition = tl;
  ghost.root.isTransitioning = true;

  // * Initial set *

  // Overflow
  tl.set(overflow, {
    overflow: 'hidden',
  });

  // Form
  tl.set(wrapper, {
    width: aData.currentWidth,
    height: aData.currentHeight,
    position: 'relative',
  });

  // Current
  tl.set(currentSlide, {
    x: 0,
    y: 0,
    opacity: 1,
    display: aData.currentDisplayStart,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  });

  // Next
  tl.set(nextSlide, {
    x: aData.xNext,
    y: aData.yNext,
    opacity: aData.opacityNext,
    zIndex: aData.zIndex,
    display: aData.nextDisplayStart,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  });

  // * Timeline animation *

  // Current
  tl.to(currentSlide, {
    duration: aData.currentTime,
    x: aData.xCurrent,
    y: aData.yCurrent,
    opacity: aData.opacityCurrent,
  });

  // Form - height / width adjustment
  tl.to(
    wrapper,
    {
      duration: aData.currentTime,
      width: Math.max(aData.currentWidth, aData.nextWidth),
      height: Math.max(aData.currentHeight, aData.nextHeight),
    },
    `<`
  );

  // Next
  tl.to(
    nextSlide,
    {
      duration: aData.nextTime,
      x: 0,
      y: 0,
      opacity: 1,
    },
    `<+=${
      aData.equalDimensions
        ? aData.currentTime * aData.equalDimensionsMulitplier
        : aData.currentTime
    }`
  );

  // Form - height / width adjustment
  tl.to(
    wrapper,
    {
      duration: aData.nextTime,
      width: aData.nextWidth,
      height: aData.nextHeight,
    },
    `<`
  );

  // * Reset styles *

  // Current
  tl.set(currentSlide, {
    x: '',
    y: '',
    opacity: '',
    display: aData.currentDisplayEnd,
    position: '',
    left: '',
    top: '',
    right: '',
    bottom: '',
  });

  // Next
  tl.set(nextSlide, {
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
  tl.set(wrapper, {
    width: '',
    height: '',
    position: '',
  });

  // Overflow
  tl.set(overflow, {
    overflow: '',
  });

  // Animation done call
  tl.call(() => {
    ghost.root.isTransitioning = true;
  });
};
