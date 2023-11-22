// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (instance: StudioFormInstance) {
  // Values
  const elements = instance.elements;
  const ghost = model.state.ghostInstances[instance.name];

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

  // Animate progress bars
  elements.progressBars.forEach(el => {
    // Values
    const tl = gsap.timeline();
    const gsapTl = ghost.gsapTl;

    // Clear existing timeline
    if (gsapTl.progress?.isRunning) {
      gsapTl.progress.tl.clear();
    }

    // Values
    gsapTl.progress = tl;
    gsapTl.progress.isRunning = true;

    // Values
    const direction = utils.getAttribute('axis', el) || aData.progressBarAxis;
    const isX = direction.indexOf('x') > -1;
    const isY = direction.indexOf('y') > -1;

    // GSAP
    const val = {
      duration: aData.currentTime + aData.nextTime,
      ease: aData.ease,
      width: isX ? (instance.isDone ? 100 : pData.slow.percentage) + '%' : '',
      height: isY ? (instance.isDone ? 100 : pData.slow.percentage) + '%' : '',
    };
    tl.to(el, val);
    tl.call(() => {
      if (gsapTl.progress) gsapTl.progress.isRunning = undefined;
    });
  });

  // * Display slides info *

  // Current
  elements.currentSlides.forEach((el: HTMLElement) => {
    // Alter
    el.innerHTML = pData.traversed + '';
  });

  // Min
  elements.minSlides.forEach((el: HTMLElement) => {
    // Alter
    el.innerHTML = pData.fast.path + '';
  });

  // Max
  elements.maxSlides.forEach((el: HTMLElement) => {
    // Alter
    el.innerHTML = pData.slow.path + '';
  });

  // Min max
  elements.minMaxSlides.forEach((el: HTMLElement) => {
    // Value
    const str: string =
      pData.slow.path > pData.fast.path
        ? pData.fast.path + ' - ' + pData.slow.path
        : pData.slow.path + '';

    // Alter
    el.innerHTML = str;
  });
}
