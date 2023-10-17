// Imports
import * as helper from '../helper';
import * as model from '../../model';
import slideType from './slideType';
import slideButtons from './slideButtons';
import swapSubmitButtons from '../view/swapSubmitButtons';
import * as config from '../../config';

// Export
const errPath = (s: any) => `${helper.errorName(s)}slideLogic.ts -> default`;
export default function (stateId: number) {
  // Values
  const state = model.state[stateId];
  const slideLogic: any[] = [];

  // Init loop
  for (let i = 0, n = state.elements.slides.length; i < n; i++) {
    // Elements
    const slide: HTMLElement = state.elements.slides[i];

    // * Define *
    const obj: any = {};

    // Index
    obj.i = i;

    // Element
    obj.el = slide;

    // Swap submit buttons
    swapSubmitButtons(slide, state);

    // Generate slide type
    obj.type = slideType(slide, state);

    // Generate slide buttons
    obj.btns = slideButtons(obj.type, slide, state);

    // Conditional next
    obj.conditionalNext =
      (slide.getAttribute(
        `${config.CUSTOM_ATTRIBUTE_PREFIX}conditional-next`
      ) || 'false') === 'true';

    // Conditional next
    obj.conditional =
      slide.getAttribute(`${config.CUSTOM_ATTRIBUTE_PREFIX}conditional`) || '';

    // Push
    slideLogic.push(obj);
  }

  // * slide logic loop *
  slideLogic.forEach((slide: any) => {
    // No btns case
    if (slide.btns.length < 1) {
      // Set btns to false
      slide.btns = false;

      // Calculate slide.next
      let next: false | number = false;

      // Else return the next step that is unconditional & not conditional next
      next = (() => {
        for (let i = 0, n = slideLogic.length; i < n; i++) {
          const _tmpSlide = slideLogic[i];
          if (
            _tmpSlide.i > slide.i &&
            _tmpSlide.conditional === '' &&
            _tmpSlide.conditionalNext === false
          ) {
            return _tmpSlide.i;
          }
        }
      })();

      // If conditional next is set, return next step index
      if (slide.i < slideLogic.length - 1)
        if (slideLogic[slide.i + 1]?.conditionalNext === true) {
          // Set button goal
          next = slide.i + 1;
        }

      // Is last step logic
      if (slide.i >= slideLogic.length - 1) {
        next = false;
      }

      // Add new property to slide
      slide.next = next;

      // Skip code below
      return;
    }

    // Find next slide
    slide.btns.every((btn: any) => {
      // Set last step attribute - guard
      if (btn.next === false) return true;

      // Set general attrbiute
      btn.el.setAttribute(config.PRODUCT_NAME, 'next');

      // Is last step guard logic
      if (slide.i >= slideLogic.length - 1) {
        btn.next = false;
        btn.el.setAttribute(config.PRODUCT_NAME, 'submit');
        return true;
      }

      // If a conditional is set, set the the button next step id to it
      if (btn.conditional !== '') {
        // Values
        let tmpSlide: any | undefined;

        // Search loop
        slideLogic.every((_tmpSlide: any) => {
          // Logic
          if (btn.conditional === _tmpSlide.conditional) {
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
          if (index <= slide.i) btn.conditionalPrev = true;

          // Set
          btn.next = index;
        } else {
          console.warn(
            `${errPath(
              state
            )}-> slideLogic.forEach() callback -> slide.btns.every() callback: The partner slide for btns[${
              btn.i
            }].conditional === '${btn.conditional}' (in state.elements.slides[${
              slide.i
            }]) has not been found.`
          );
          btn.el.setAttribute(config.PRODUCT_NAME, 'submit');
          btn.next = false;
        }

        // Skip code below
        return true;
      }

      // If conditional next is set, return next step index
      if (slideLogic[slide.i + 1]?.conditionalNext === true) {
        // Set button goal
        btn.next = slide.i + 1;

        // Skip code below
        return true;
      }

      // Else return the next step that is unconditional & not conditional next
      btn.next = (() => {
        for (let i = 0, n = slideLogic.length; i < n; i++) {
          const _tmpSlide = slideLogic[i];
          if (
            _tmpSlide.i > slide.i &&
            _tmpSlide.conditional === '' &&
            _tmpSlide.conditionalNext === false
          ) {
            return _tmpSlide.i;
          }
        }
      })();

      // Default
      return true;
    });
  });

  // Add to state
  state.sdk.slideLogic = slideLogic;
}
