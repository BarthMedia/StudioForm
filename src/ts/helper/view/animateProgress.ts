// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
const errPath = (n: string) =>
  `${controllerUtils.errorName(n)} animateProgress.ts:`;
export default function (instance: StudioFormInstance) {
  // Values
  const elements = instance.elements;

  // Guard
  if (
    elements.progressBars.length < 1 &&
    elements.currentSlides.length < 1 &&
    elements.minMaxSlides.length < 1 &&
    elements.minSlides.length < 1 &&
    elements.maxSlides.length < 1 &&
    !instance.config.modes.calculateProgress
  )
    return;

  // Calculate progress
  const pData = instance.data.progress;
  const aData = instance.config.animations;

  // Guard
  if (typeof pData !== 'object')
    throw new Error(`${errPath(state)}pathProgressData is not an object!`);

  // Animate progress bars
  let bars: any[] = [];
  [
    state.elements.progress.bars,
    document.querySelectorAll(
      `[${config.PRODUCT_NAME}-${state.sdk.i}="progress-bar"`
    ),
  ].forEach((list: any[]) =>
    list.forEach((item: HTMLElement) => bars.push(item))
  );
  bars.forEach((el: HTMLElement) => {
    // Values
    const tl = gsap.timeline();
    const gsapObj = state.view.gsapProgressBarTimeline;

    // Clear existing timeline
    if (gsapObj.isRunning) {
      gsapObj.tl.clear();
    }

    // Values
    gsapObj.tl = tl;
    gsapObj.isRunning = true;

    // Values
    const direction =
      el.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}axis`) || 'x';
    const isX = direction.indexOf('x') > -1;
    const isY = direction.indexOf('y') > -1;

    // GSAP
    const val = {
      duration: aData.timeBoth,
      width: isX
        ? (state.sdk.isSubmitted === true ? 100 : pData.longest.percentage) +
          '%'
        : '',
      height: isY
        ? (state.sdk.isSubmitted === true ? 100 : pData.longest.percentage) +
          '%'
        : '',
    };
    tl.to(el, val);
    tl.call(() => {
      gsapObj.isRunning = undefined;
    });
  });

  // * Display slides info *

  // Current
  state.elements.progress.currentSlides.forEach((el: HTMLElement) => {
    // Alter
    el.innerHTML = pData.longest.walked;
  });

  // Min
  state.elements.progress.minSlides.forEach((el: HTMLElement) => {
    // Alter
    el.innerHTML = pData.shortest.path;
  });

  // Max
  state.elements.progress.maxSlides.forEach((el: HTMLElement) => {
    // Alter
    el.innerHTML = pData.longest.path;
  });

  // Min max
  state.elements.progress.minMaxSlides.forEach((el: HTMLElement) => {
    // Value
    const str: string =
      pData.longest.path > pData.shortest.path
        ? pData.shortest.path + ' - ' + pData.longest.path
        : pData.longest.path;

    // Alter
    el.innerHTML = str;
  });
}
