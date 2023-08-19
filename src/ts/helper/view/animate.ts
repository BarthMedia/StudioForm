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
  const currentSlide = state.sdk.slideLogic[cId];
  const nextSlide =
    isSubmit !== true
      ? state.sdk.slideLogic[nId!]
      : { el: state.elements.successMsg };

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
    nextSlide.el.getAttribute('data-slide-equal-dimensions-multiplier') ||
      state.elements.wrapper.getAttribute(
        'data-slide-equal-dimensions-multiplier'
      ) ||
      config.DEFAULT_SLIDE_OPACITY.toString()
  );
  equalDimensionsMulitplier = isNaN(equalDimensionsMulitplier)
    ? 0
    : equalDimensionsMulitplier;

  // Reverse
  const isReverse = isSubmit !== true ? cId > nId! : false;

  // Opacity
  let opacity = parseFloat(
    nextSlide.el.getAttribute('data-slide-opacity') ||
      state.elements.wrapper.getAttribute('data-slide-opacity') ||
      config.DEFAULT_SLIDE_OPACITY.toString()
  );
  opacity = isNaN(opacity) ? 0 : opacity;

  // Z-index
  let zIndex = parseFloat(
    nextSlide.el.getAttribute('data-slide-z-index') ||
      state.elements.wrapper.getAttribute('data-slide-z-index')
  );
  zIndex = isNaN(zIndex) ? 1 : zIndex;

  // Current
  let moveCurrentMultiplier = parseFloat(
    nextSlide.el.getAttribute('data-slide-move-current') ||
      state.elements.wrapper.getAttribute('data-slide-move-current') ||
      config.DEFAULT_SLIDE_MOVE_CURRENT.toString()
  );
  moveCurrentMultiplier = isNaN(moveCurrentMultiplier)
    ? 1
    : moveCurrentMultiplier;
  let timeCurrent = parseFloat(
    nextSlide.el.getAttribute('data-slide-time-sec-current') ||
      state.elements.wrapper.getAttribute('data-slide-time-sec-current') ||
      config.DEFAULT_SLIDE_TIME_CURRENT.toString()
  );
  timeCurrent = isNaN(timeCurrent) ? 1 : timeCurrent;

  // Next
  let moveNextMultiplier = parseFloat(
    nextSlide.el.getAttribute('data-slide-move-next') ||
      state.elements.wrapper.getAttribute('data-slide-move-next') ||
      config.DEFAULT_SLIDE_MOVE_NEXT.toString()
  );
  moveNextMultiplier = isNaN(moveNextMultiplier) ? 1 : moveNextMultiplier;
  let timeNext = parseFloat(
    nextSlide.el.getAttribute('data-slide-time-sec-next') ||
      state.elements.wrapper.getAttribute('data-slide-time-sec-next') ||
      config.DEFAULT_SLIDE_TIME_NEXT.toString()
  );
  timeNext = isNaN(timeNext) ? 1 : timeNext;

  // Direction math
  let direction: number = parseFloat(
    nextSlide.el.getAttribute('data-slide-direction') ||
      state.elements.wrapper.getAttribute('data-slide-direction')
  );
  direction = isNaN(direction) ? config.DEFAULT_SLIDE_DIRECTION : direction;
  direction = Math.min(Math.max(direction, 0), 359.9999);
  const angle = ((direction - 90) / 180) * Math.PI * (isReverse ? -1 : 1);

  // Calculate x & y
  const xCurrent = currentWidth * moveCurrentMultiplier * Math.cos(angle) * -1;
  const yCurrent = currentHeight * moveCurrentMultiplier * Math.sin(angle) * -1;
  const xNext = nextWidth * moveNextMultiplier * Math.cos(angle);
  const yNext = nextHeight * moveNextMultiplier * Math.sin(angle);

  // * Update animationData sdk *
  state.sdk.animationData = {
    ...state.sdk.animationData,
    direction: direction,
    angle: angle,
    opacity: opacity,
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
  };

  //

  //

  //

  // Log
  console.log('Make short term z-index attributable');
  console.log(
    'The next slide always shall have higher z-index, then the current -- will be removed at end'
  );

  //
  console.log(
    'On is submit! Display the element as block -- else remove display value'
  );
  console.log(
    'Only do the hiding once the complete animation is done -- also reset x and y'
  );

  console.log(direction);
  // Fire animateProgress.ts
  console.log('Fire progress animation');
}
