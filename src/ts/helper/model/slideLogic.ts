// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as model from '../../model';
import slideType from './slideType';
import slideButtons from './slideButtons';
import swapSubmitButtons from '../view/swapSubmitButtons';
import * as config from '../../config';

// Error
const errPath = (n: string) => `${controllerUtils.errorName(n)} slideLogic.ts:`;

// Export
export default function (
  name: string,
  modes: SFModesConfig,
  elements: StudioFormElements
) {
  // Values
  const slideLogic: StudioFormSlideLogic[] = [];

  // Init loop
  for (let i = 0, n = elements.slides.length; i < n; i++) {
    // Elements
    const slide = elements.slides[i];

    // Guard
    if (!viewUtils.isElement(slide))
      throw new Error(
        `${errPath(name)} Slide[${i}] is not a valid HTML element!`
      );

    // Swap submit buttons
    swapSubmitButtons(slide, modes);

    // * Define *
    const type = slideType(slide);
    const obj: StudioFormSlideLogic = {
      // Base
      get name() {
        return viewUtils.getAttribute('name', slide);
      },
      index: i,
      element: slide,
      type: type,

      // Logic
      buttons: slideButtons(type, slide),
      conditional: viewUtils.getAttribute('conditional', slide) || '',
      conditionalNext:
        (viewUtils.getAttribute('conditional-next', slide) || 'false') ===
        'true',
    };

    // Push
    slideLogic.push(obj);
  }

  // * slide logic loop *
  slideLogic.forEach(slide => {
    // No btns case
    if (slide.buttons && slide.buttons.length < 1) {
      // Set btns to false
      slide.buttons = false;

      // Calculate slide.next
      let next: false | number = false;

      // Else return the next step that is unconditional & not conditional next
      for (let i = 0, n = slideLogic.length; i < n; i++) {
        // Value
        const _tmpSlide = slideLogic[i];

        // Logic
        if (
          _tmpSlide.index > slide.index &&
          _tmpSlide.conditional === '' &&
          _tmpSlide.conditionalNext === false
        ) {
          next = _tmpSlide.index;
          break;
        }
      }

      // If conditional next is set, return next step index
      if (slide.index < slideLogic.length - 1)
        if (slideLogic[slide.index + 1]?.conditionalNext === true) {
          // Set button goal
          next = slide.index + 1;
        }

      // Is last step logic
      if (slide.index >= slideLogic.length - 1) {
        next = false;
      }

      // Add new property to slide
      slide.next = next;

      // Skip code below
      return;
    }

    // Find next slide
    if (slide.buttons)
      slide.buttons.every(button => {
        // Set last step attribute - guard
        if (button.next === false) return true;

        // Set general attrbiute
        button.element.setAttribute(config.PRODUCT_NAME_SHORT, 'next');

        // Is last step guard logic
        if (slide.index >= slideLogic.length - 1) {
          button.next = false;
          button.element.setAttribute(config.PRODUCT_NAME_SHORT, 'submit');
          return true;
        }

        // If a conditional is set, set the the button next step id to it
        if (button.conditional !== '') {
          // Values
          let tmpSlide: any | undefined;

          // Search loop
          slideLogic.every((_tmpSlide: any) => {
            // Logic
            if (button.conditional === _tmpSlide.conditional) {
              tmpSlide = _tmpSlide;
              return false;
            }

            // Default
            return true;
          });

          // If found
          if (tmpSlide) {
            // * Conditional case *

            // Values
            let index = tmpSlide.i;

            // Guard for eventual jump back case
            if (index <= slide.index) button.conditionalPrev = true;

            // Set
            button.next = index;
          } else {
            controllerUtils.warn(
              `${errPath(
                name
              )} -> slideLogic.forEach() callback -> slide.btns.every() callback: The partner slide for btns[${
                button.index
              }].conditional === '${
                button.conditional
              }' (in state.elements.slides[${slide.index}]) has not been found.`
            );
            button.element.setAttribute(config.PRODUCT_NAME_SHORT, 'submit');
            button.next = false;
          }

          // Skip code below
          return true;
        }

        // If conditional next is set, return next step index
        if (slideLogic[slide.index + 1]?.conditionalNext === true) {
          // Set button goal
          button.next = slide.index + 1;

          // Skip code below
          return true;
        }

        // Else return the next step that is unconditional & not conditional next
        for (let i = 0, n = slideLogic.length; i < n; i++) {
          const _tmpSlide = slideLogic[i];
          if (
            _tmpSlide.index > slide.index &&
            _tmpSlide.conditional === '' &&
            _tmpSlide.conditionalNext === false
          ) {
            button.next = _tmpSlide.index;
            break;
          }
        }

        // Default
        return true;
      });
  });

  // Overwrite with proxies
  const createReadMostlyProxy = model.createReadMostlyProxy;
  slideLogic.forEach((slideObj, index) => {
    // Buttons loop
    if (slideObj.buttons) {
      slideObj.buttons.forEach((buttonObj, index) => {
        // Overwrite
        slideObj.buttons[index] = createReadMostlyProxy(buttonObj);
      });

      // Turn into proxy array
      slideObj.buttons = createReadMostlyProxy(slideObj.buttons) as
        | StudioFormButtonLogic[];
    }

    // Slide obj overwriting
    slideLogic[index] = createReadMostlyProxy(slideObj) as StudioFormSlideLogic;
  });

  // Add to state
  return slideLogic;
}
