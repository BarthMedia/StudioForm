// Imports
import * as helper from '../helper';
import * as config from '../../config';

// Export
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

  // Create
  const obj = {
    // Standard
    wrapper: wrapper,
    mask: mask,
    get slides() {
      return mask.childNodes as NodeListOf<HTMLElement>;
    },
    successMsg: wrapper.querySelector('.w-form-done') as HTMLElement | null,
    errorMsg: wrapper.querySelector('.w-form-fail') as HTMLElement | null,

    // Progress
    get progressBars() {
      return querySelectorAll('progress-bar');
    },
    get currentSlides() {
      return querySelectorAll('current-slide');
    },
    get minMaxSlides() {
      return querySelectorAll('min-max-slides');
    },
    get minSlides() {
      return querySelectorAll('min-slides');
    },
    get maxSlides() {
      return querySelectorAll('max-slides');
    },

    // Fetch response
    get res() {
      return querySelectorAll('res');
    },

    // External buttons
    get prevs() {
      return querySelectorAll('prev');
    },
    get nexts() {
      // Generate nexts
      const nexts: HTMLElement[] = [];
      querySelectorAll('next').forEach(el => {
        if (
          (el.closest(`[${config.PRODUCT_NAME_SHORT}-name]>form`) ||
            el.closest(`[${config.PRODUCT_NAME_SHORT}-name]>*`)) !== mask
        )
          nexts.push(el);
      });
      return nexts;
    },
  };

  // Return
  return obj;
}
