// Imports
import * as helper from '../helper';
import next from './next';
import prev from './prev';
import submit from './submit';
import suggestButton from './suggestButton';

// Declare
declare global {
  interface Options {
    doNotCheckSlideRequirements?: boolean;
    btn?: any;
    currentSlideId?: number;
    nextSlideId?: number;
    isSubmit?: boolean;
    scrollToActive?: boolean;
    element?: HTMLElement | string;
    offset?: HTMLElement | string;
    attributeReferenceElement?: HTMLElement;
    doNotWaitForAnimations?: boolean;
  }
}

// Export
export default function init(state: any) {
  // Add events infrastrucutre
  const eventFunctionArrays = state.view.eventsFunctionArrays;
  helper.addEventsInfrastrucutre(state, 'Next');
  helper.addEventsInfrastrucutre(state, 'Prev');
  helper.addEventsInfrastrucutre(state, 'Submit');

  // Define sdk
  state.sdk.next = (options: Options = {}) => {
    helper.triggerAllFunctions(eventFunctionArrays.onNext);
    const res = next(state.sdk.i, options);
    helper.triggerAllFunctions(eventFunctionArrays.afterNext);
    return res;
  };
  state.sdk.prev = (options: Options = {}) => {
    helper.triggerAllFunctions(eventFunctionArrays.onPrev);
    const res = prev(state.sdk.i, options);
    helper.triggerAllFunctions(eventFunctionArrays.afterPrev);
    return res;
  };
  state.sdk.submit = async (options: Options = {}) => {
    helper.triggerAllFunctions(eventFunctionArrays.onSubmit);
    const res = await submit(state.sdk.i, options);
    helper.triggerAllFunctions(eventFunctionArrays.afterSubmit);
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
    btn.classList.add('sf-hide');

    // SDK
    btn.addEventListener('click', () => {
      state.sdk.prev();
    });
  });
}
