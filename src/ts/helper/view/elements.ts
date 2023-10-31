// Imports
import * as helper from '../helper';
import * as config from '../../config';

// Export
const errPath = (s: any) =>
  `${helper.errorName(s)} -> elements.ts -> default: `;
export default function (
  modes: { [name: string]: boolean },
  instanceName: string,
  wrapper: HTMLElement,
  mask: HTMLElement
) {
  // Define
  const querySelectorAll = (...args: string[]) => {
    return document.querySelectorAll(
      helper.createSelector(instanceName, ...args)
    ) as NodeListOf<HTMLElement>;
  };

  // Dividers
  const dividers = querySelectorAll('divider');
  dividers.forEach(divider => divider.remove());

  // Remove conditionally invisible slides
  if (modes.removeConditionallyInvisibeSlides) {
    mask.childNodes.forEach(slide => {
      if (slide?.['classList']?.contains('w-condition-invisible'))
        slide.remove();
    });
  }

  // Generate nexts
  const nexts: HTMLElement[] = [];
  querySelectorAll('next').forEach(el => {
    if (el.closest('form') !== mask) nexts.push(el);
  });

  // Create
  const obj = {
    // Standard
    wrapper: wrapper,
    mask: mask,
    slides: mask.childNodes as NodeListOf<HTMLElement>,
    successMsg: wrapper.querySelector('.w-form-done') as HTMLElement | null,
    errorMsg: wrapper.querySelector('.w-form-fail') as HTMLElement | null,

    // Progress
    progressBars: querySelectorAll('progress-bar'),
    currentSlides: querySelectorAll('current-slide'),
    minMaxSlides: querySelectorAll('min-max-slides'),
    minSlides: querySelectorAll('min-slides'),
    maxSlides: querySelectorAll('max-slides'),
    // Fetch response
    res: querySelectorAll('res'),

    // External buttons
    prevs: querySelectorAll('prev'),
    nexts: nexts,
  };

  // Return
  return obj;
}
