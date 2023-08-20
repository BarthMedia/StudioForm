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
  state.elements.progress.bars.forEach((el: HTMLElement) => {
    // Values
    const direction = el.getAttribute('data-axis') || 'x';
    const isX = direction.indexOf('x') > -1;
    const isY = direction.indexOf('y') > -1;

    // GSAP
    gsap.to(el, {
      duration: aData.timeBoth,
      width: isX ? pData.longest.percentage + '%' : '',
      height: isY ? pData.longest.percentage + '%' : '',
    });
  });

  // Log
  console.log('Hello ', pData);
}
