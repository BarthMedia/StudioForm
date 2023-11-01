// Imports
import * as helper from '../helper';
import * as config from '../../config';
import next from './next';
import prev from './prev';
import submit from './submit';
import suggestButton from './suggestButton';
import radioCheckboxValueCorrector from './radioCheckboxValueCorrector';
import fileUploadLabelChanger from './fileUploadLabelChanger';
import groupCheckox from './groupCheckox';

// Declare
declare global {
  interface Options {
    doNotCheckSlideRequirements?: boolean;
    btn?: any;
    currentSlideId?: number;
    nextSlideId?: number;
    isSubmit?: boolean;
    scrollToTarget?: boolean;
    target?: HTMLElement | string;
    offset?: HTMLElement | string | number;
    attributeReferenceElement?: HTMLElement;
    doNotWaitForAnimations?: boolean;
    forceDone?: boolean;
    doNotAnimate?: boolean;
    callback?: (success: boolean) => void;
  }
}

// Export
export default function init(state: any) {
  console.log(
    'reduce number of events, to sf-animate, sf-submit, sf-fetch ... sf-on-fetch .. sf-after-fetch -- okay. Still better like this!'
  );
  console.log('requires new mask - no-bubbling - event structure!');
  console.log('also sf-on-error, sf-after-error');
  console.log('sf-resolve-true', 'sf-resolve-false event', 'sf-promise event!');

  // Achieve correct values
  radioCheckboxValueCorrector(state);

  // Allow for native chechbox groups
  groupCheckox(state);

  // Achieve useful file upload behaviour
  fileUploadLabelChanger(state);

  // Add events infrastrucutre
  const eventFunctionArrays = state.view.eventsFunctionArrays;
  helper.addEventsInfrastrucutre(state, 'Next');
  helper.addEventsInfrastrucutre(state, 'Prev');
  helper.addEventsInfrastrucutre(state, 'Submit');

  // Define sdk
  state.sdk.next = (options: Options = {}) => {
    helper.triggerAllFunctions(eventFunctionArrays.onNext);
    const res = next(state.sdk.i, options);
    return res;
  };
  state.sdk.prev = (options: Options = {}) => {
    helper.triggerAllFunctions(eventFunctionArrays.onPrev);
    const res = prev(state.sdk.i, options);
    return res;
  };
  state.sdk.submit = async (options: Options = {}) => {
    helper.triggerAllFunctions(eventFunctionArrays.onSubmit);
    const res = await submit(state.sdk.i, options);
    return res;
  };

  // Initialize suggest button
  suggestButton(state);

  // Slides loop
  state.sdk.slideLogic.forEach((slide: any) => {
    // 1 or more btns case
    if (slide.btns)
      slide.btns.forEach((btn: any) =>
        btn.el.addEventListener('click', () => {
          state.sdk.next({ btn: btn });
        })
      );
  });

  // Next buttons
  state.elements.nextBtns.forEach((btn: HTMLElement) =>
    btn.addEventListener('click', () => {
      state.sdk.next();
    })
  );

  // * Prev buttons *
  state.elements.prevBtns.forEach((btn: HTMLElement) => {
    // Style init
    helper.addSfHide(btn);

    // SDK
    btn.addEventListener('click', () => {
      state.sdk.prev();
    });
  });

  // Hover / set active form
  const activeAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}-active`;
  state.elements.wrapper.addEventListener('mouseover', () => {
    // Select all elements with data-active attribute
    const activeElements = document.querySelectorAll(`[${activeAttr}]`);

    // Remove the ${config.CUSTOM_ATTRIBUTE_PREFIX}-active attribute from all of them
    activeElements.forEach(element => {
      element.removeAttribute(activeAttr);
    });

    // Add to wrapper
    state.elements.wrapper.setAttribute(activeAttr, '');
  });

  // Init on sdk 0
  if (state.sdk.i === 0) state.elements.wrapper.setAttribute(activeAttr, '');

  // * Keyboard *
  const keAttr = `${config.CUSTOM_ATTRIBUTE_PREFIX}keyboard-events`;
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    // Elements
    const target =
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
        ? event.target
        : null;

    // Guard 1 - Is active instance
    if (!state.elements.wrapper.hasAttribute(activeAttr)) return;

    // Values
    const currentSlide =
      state.sdk.slideLogic[
        state.sdk.slideRecord[state.sdk.slideRecord.length - 1]
      ];

    // Guard 2 - Mode, step, textarea & custom input allowance
    if (
      !state.modes.keyboardEvents ||
      currentSlide.el.getAttribute(keAttr) === 'false' ||
      target?.getAttribute(keAttr) === 'false' ||
      target instanceof HTMLTextAreaElement
    )
      return;

    // Standard webflow input types
    const inputTypes = ['text', 'email', 'password', 'tel', 'number'];

    // Switch
    if (event.key === 'Backspace') {
      // Guard
      if (inputTypes.includes(target?.type || '')) return;

      // Trigger
      onBackspace(currentSlide.i);
    } else if (event.key === 'Enter') {
      // Guard

      // Trigger
      onEnter(currentSlide.i);
    } else if (event.key === 'ArrowLeft') {
      // Guard

      // Trigger
      onArrowLeft(currentSlide.i);
    } else if (event.key === 'ArrowRight') {
      // Guard
      if (inputTypes.includes(target?.type || '')) return;

      // Trigger
      onArrowRight(currentSlide.i);
    }
  });

  // Function to be called when Escape key is pressed
  function onBackspace(slideId: number) {
    // Add your custom logic here
    state.sdk.prev();
    state.sdk.clearAllSuggestedButton(slideId);
  }

  // Function to be called when Enter key is pressed
  function onEnter(slideId: number) {
    // Add your custom logic here
    state.sdk.next();
    state.sdk.clearAllSuggestedButton(slideId);
  }

  // Function to be called when Left Arrow key is pressed
  function onArrowLeft(slideId: number) {
    // Add your custom logic here
    state.sdk.suggestNext(slideId);
  }

  // Function to be called when Right Arrow key is pressed
  function onArrowRight(slideId: number) {
    // Add your custom logic here
    state.sdk.suggestPrev(slideId);
  }
}
