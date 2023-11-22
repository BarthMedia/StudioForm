// Imports
import * as utils from './utils';
import * as config from '../../config';
import * as model from '../../model';

// Export
export default function init(instance: StudioFormInstance) {
  // Slides loop
  instance.logic.forEach(slide => {
    // 1 or more buttons case
    if (slide.buttons)
      slide.buttons.forEach(button =>
        button.element.addEventListener('click', () => {
          instance.next({ button: button });
        })
      );
  });

  // Next buttons
  instance.elements.nexts.forEach(button =>
    button.addEventListener('click', () => {
      instance.next();
    })
  );

  // * Prev buttons *
  instance.elements.prevs.forEach(button => {
    // Style init
    utils.addSfHide(button);

    // SDK
    button.addEventListener('click', () => {
      instance.prev();
    });
  });

  // Hover / set active form
  instance.elements.wrapper.addEventListener('mouseover', () => {
    // Overwrite
    model.state.activeKeyBoardInstance = instance.name;
  });

  // Init on sdk 0
  if (model.state.api.keys[0] === instance.name)
    model.state.activeKeyBoardInstance = instance.name;

  // * Keyboard *
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    // Elements
    const target =
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
        ? event.target
        : null;

    // Guard 1 - Is active instance
    if (model.state.activeKeyBoardInstance !== instance.name) return;

    // Values
    const currentSlide =
      instance.logic[instance.record[instance.record.length - 1]];

    // Guard 2 - Mode, step, textarea & custom input allowance
    if (
      !instance.config.modes.keyboardEvents ||
      target instanceof HTMLTextAreaElement ||
      utils.getAttribute('keyboard-events', target, currentSlide.element)
    )
      return;

    // Standard webflow input types
    const inputTypes = ['text', 'email', 'password', 'tel', 'number'];

    // Switch
    if (event.key === 'Backspace') {
      // Guard
      if (inputTypes.includes(target?.type || '')) return;

      // Trigger
      onBackspace();
    } else if (event.key === 'Enter') {
      // Guard

      // Trigger
      onEnter();
    } else if (event.key === 'ArrowLeft') {
      // Guard

      // Trigger
      onArrowLeft();
    } else if (event.key === 'ArrowRight') {
      // Guard
      if (inputTypes.includes(target?.type || '')) return;

      // Trigger
      onArrowRight();
    }
  });

  // Function to be called when Escape key is pressed
  function onBackspace() {
    // Add your custom logic here
    instance.prev();
    instance.suggest.clear();
  }

  // Function to be called when Enter key is pressed
  function onEnter() {
    // Add your custom logic here
    instance.next();
    instance.suggest.clear();
  }

  // Function to be called when Left Arrow key is pressed
  function onArrowLeft() {
    // Add your custom logic here
    instance.suggest.next();
  }

  // Function to be called when Right Arrow key is pressed
  function onArrowRight() {
    // Add your custom logic here
    instance.suggest.prev();
  }
}

// Notes

// console.log(
//   'reduce number of events, to sf-animate, sf-submit, sf-fetch ... sf-on-fetch .. sf-after-fetch -- okay. Still better like this!'
// );
// console.log('requires new mask - no-bubbling - event structure!');
// console.log('also sf-on-error, sf-after-error');
// console.log('sf-resolve-true', 'sf-resolve-false event', 'sf-promise event!');
// // Achieve correct values
// radioCheckboxValueCorrector(instance);
// // Allow for native chechbox groups
// groupCheckox(instance);
// // Achieve useful file upload behaviour
// fileUploadLabelChanger(instance);
// // Add events infrastrucutre
// const eventFunctionArrays = instance.view.eventsFunctionArrays;
// helper.addEventsInfrastrucutre(instance, 'Next');
// helper.addEventsInfrastrucutre(instance, 'Prev');
// helper.addEventsInfrastrucutre(instance, 'Submit');
// // Define sdk
// instance.sdk.next = (options: Options = {}) => {
//   helper.triggerAllFunctions(eventFunctionArrays.onNext);
//   const res = next(instance.sdk.i, options);
//   return res;
// };
// instance.sdk.prev = (options: Options = {}) => {
//   helper.triggerAllFunctions(eventFunctionArrays.onPrev);
//   const res = prev(instance.sdk.i, options);
//   return res;
// };
// instance.sdk.submit = async (options: Options = {}) => {
//   helper.triggerAllFunctions(eventFunctionArrays.onSubmit);
//   const res = await submit(instance.sdk.i, options);
//   return res;
// };
