// Imports
import * as utils from './utils';
import * as attributeUtils from './utilsAttributes';
import * as eventListenerUtils from './utilsEvents';
import * as modelUtils from '../model/utils';
import * as config from '../../config';
import * as model from '../../model';

// Navigation
import navNext from '../model/navNext';
import navPrev from '../model/navPrev';
import navTo from '../model/navTo';

// Export
export default function init(instance: StudioFormInstance) {
  // Values
  const submitString = 'submit';

  // Slides loop
  instance.logic.forEach(slide => {
    // 1 or more buttons case
    if (slide.buttons)
      slide.buttons.forEach(button => {
        // Attributes
        utils.setAccessibility(
          button.element,
          typeof button.next === 'number' ? button.next : submitString,
          null,
          instance
        );

        // Event listener
        eventListenerUtils.addEventListener(
          instance,
          button.element,
          'click',
          e => {
            if (e?.target?.['querySelector']('input')) return;
            navNext(instance, { button: button }, true);
          }
        );
      });
  });

  // * Next buttons *
  instance.elements.nexts.forEach(button => {
    // Attributes
    utils.setAccessibility(button, 'next slide', null);

    // Event listener
    eventListenerUtils.addEventListener(instance, button, 'click', () => {
      navNext(instance, {}, true);
    });
  });

  // * Prev buttons *
  instance.elements.prevs.forEach(button => {
    // Style init
    utils.addSfHide(button);

    // Attributes
    utils.setAccessibility(button, 'previous slide', null);

    // SDK
    eventListenerUtils.addEventListener(instance, button, 'click', () => {
      navPrev(instance, {}, true);
    });
  });

  // * Keyboard events *

  // Hover / set active form
  eventListenerUtils.addEventListener(
    instance,
    instance.elements.wrapper,
    'mouseover',
    () => {
      // Overwrite
      model.state.activeKeyBoardInstance = instance.name;
    }
  );

  // Init on sdk 0
  if (model.state.api.keys[0] === instance.name)
    model.state.activeKeyBoardInstance = instance.name;

  // * Keyboard *
  eventListenerUtils.addEventListener(
    instance,
    document,
    'keydown',
    (event: unknown) => {
      // Guard 0
      if (!(event instanceof KeyboardEvent)) return;

      // Elements
      const target =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
          ? event.target
          : null;

      // Guard 1 - Is active instance
      if (model.state.activeKeyBoardInstance !== instance.name) return;

      // Guard 2 - Mode, step, textarea & custom input allowance
      if (
        !instance.config.modes.keyboardEvents ||
        target instanceof HTMLTextAreaElement
      )
        return;

      // Guard 3 - Instance is submitted
      if (instance.isDone) return;

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
    }
  );

  // Function to be called when Escape key is pressed
  function onBackspace() {
    // Add your custom logic here
    navPrev(instance, {}, true);
    instance.focus.clear();
  }

  // Function to be called when Enter key is pressed
  async function onEnter() {
    // Add your custom logic here
    const res = await navNext(instance, {}, true);
    if (res === true) instance.focus.clear();
  }

  // Function to be called when Left Arrow key is pressed
  function onArrowLeft() {
    // Add your custom logic here
    instance.focus.prev();
  }

  // Function to be called when Right Arrow key is pressed
  function onArrowRight() {
    // Add your custom logic here
    instance.focus.next();
  }
}
