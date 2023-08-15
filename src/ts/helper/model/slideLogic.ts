// Imports
import * as helper from '../helper';
import * as model from '../../model';
import slideType from './slideType';
import slideButtons from './slideButtons';
import swapSubmitButtons from '../view/swapSubmitButtons';

// Export
export default function (index: number) {
  // Values
  const state = model.state[index];
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
      (slide.getAttribute('data-conditional-next') || 'false') === 'true';

    // Conditional next
    obj.conditional = slide.getAttribute('data-conditional') || '';

    // Push
    slideLogic.push(obj);
  }

  // * slide logic loop *
  slideLogic.forEach((slide: any) => {
    // No btns case
    if (slide.btns.length < 1) {
      console.log('Programm no buttons logic case');
    }

    // Find next slide
    slide.btns.every((btn: any) => {
      // Set last step attribute - guard
      if (btn.next === false) return true;

      // Is last step guard logic
      if (slide.i >= slideLogic.length - 1) {
        btn.next = false;
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

          // Set
          btn.next = index;
        } else {
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
        for (step of stepsObject) {
          if (
            step.index > stepIndex &&
            step.conditional === undefined &&
            step.conditionalNext === undefined
          ) {
            return step.index;
          }
        }
      })();

      // Default
      return true;
    });
  });

  // Add to state
  state.model.slideLogic = slideLogic;

  // Log
  slideLogic.forEach(slide => {
    // Log
    console.log(slide.i);

    // Loop
    slide.btns.forEach(btn => console.log(btn));

    // Log
    console.log('---');
  });

  // Log
  console.log('hello, ', slideLogic);
}
