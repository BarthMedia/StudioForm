// Imports
import * as utils from './utils';
import * as config from '../../config';

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

  console.log('Find sf-anchor elements!');
  console.log("Change sf-response field into sf='error'");

  // Create
  const obj: StudioFormElements = {
    // Standard
    wrapper: wrapper,
    mask: mask,
    get slides() {
      return mask.childNodes as NodeListOf<HTMLElement>;
    },
    done: wrapper.querySelector('.w-form-done') as HTMLElement | null,
    fail: wrapper.querySelector('.w-form-fail') as HTMLElement | null,

    // Fetch response
    get failMessages() {
      return querySelectorAll('fail', 'fail-message', 'fail-response');
    },

    // Anchor
    get anchor() {
      // Values
      let element: HTMLElement | null = null;
      const elements = querySelectorAll('anchor');

      // Loop
      for (let i = 0, n = elements.length; i < n; i++) {
        if (utils.isElement(elements[i]) && elements[i].offsetParent !== null) {
          element = elements[i];
          break;
        }
      }

      // Return
      return element;
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
          (el.closest(`[${config.PRODUCT_NAME_SHORT}-name]>form`) ||
            el.closest(`[${config.PRODUCT_NAME_SHORT}-name]>*`)) !== mask
        )
          nexts.push(el);
      });
      return nexts;
    },

    // To's
    get tos() {
      // Generate to's
      const lists: NodeListOf<HTMLElement>[] = [];
      for (let i = 0, n = obj.slides.length; i < n; i++) {
        lists.push(querySelectorAll(`to-${i}`));
      }
      return lists;
    },
  };

  // Return
  return obj;
}
