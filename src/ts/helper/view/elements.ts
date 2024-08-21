// Imports
import * as utils from './utils';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function (
  modes: SFModesConfig,
  instanceName: string,
  wrapper: HTMLElement,
  mask: HTMLElement
) {
  // Define
  const querySelectorAll = (...args: string[]) => {
    return document.querySelectorAll(
      utils.createSelector(instanceName, ...args)
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
  const obj: StudioFormElements = {
    // Standard
    wrapper: wrapper,
    mask: mask,
    get slides() {
      return mask.querySelectorAll(':scope > *') as NodeListOf<HTMLElement>;
    },
    done: wrapper.querySelector('.w-form-done') as HTMLElement | null,
    fail: wrapper.querySelector('.w-form-fail') as HTMLElement | null,

    // Fetch response
    get errors() {
      return querySelectorAll('error');
    },

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

    // External buttons
    get prevs() {
      return querySelectorAll('prev');
    },
    get nexts() {
      // Generate nexts
      const nexts: HTMLElement[] = [];
      querySelectorAll('next').forEach(el => {
        if (
          (el.closest(`[${config.PRODUCT_NAME_SHORT}-id]>form`) ||
            el.closest(`[${config.PRODUCT_NAME_SHORT}-id]>*`)) !== mask
        )
          nexts.push(el);
      });
      return nexts;
    },
  };

  // Return
  return obj;
}
