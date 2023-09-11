// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (stateId: number, options: Options) {
  // Values
  const state = model.state[stateId];

  // Guard
  if (
    state.elements.progress.bars.length < 1 &&
    state.elements.progress.currentSlides.length < 1 &&
    state.elements.progress.minMaxSlides.length < 1 &&
    state.elements.progress.minSlides.length < 1 &&
    state.elements.progress.maxSlides.length < 1 &&
    !state.modes.calculateProgress
  )
    return;

  // Calculate progress
  state.model.generateProgressData();
  const pData = state.sdk.pathProgressData;
  const aData = state.sdk.animationData;

  // Guard
  if (typeof pData !== 'object')
    throw new Error(
      `StudioForm[${state.sdk.i}] -> animateProgress.ts -> default: pathProgressData is not an object!`
    );

  // Animate progress bars
  let bars: any[] = [];
  [
    state.elements.progress.bars,
    document.querySelectorAll(`[studio-form-${state.sdk.i}="progress-bar"`),
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
    const direction = el.getAttribute('data-axis') || 'x';
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
