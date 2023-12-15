// Imports
import * as utils from './utils';
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
        button.element.addEventListener('click', () => {
          navNext(instance, { button: button }, true);
        });
      });
  });

  // * Next buttons *
  instance.elements.nexts.forEach(button => {
    // Attributes
    utils.setAccessibility(button, 'next slide', null);

    // Event listener
    button.addEventListener('click', () => {
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
    button.addEventListener('click', () => {
      navPrev(instance, {}, true);
    });
  });

  // * To buttons *
  instance.elements.tos.forEach(obj => {
    // Loop
    obj.nodeList.forEach(button => {
      // Values
      const slideIdentification = (
        utils.getAttribute(null, button) || ''
      ).slice(3);

      // Attributes
      utils.setAccessibility(
        button,
        slideIdentification === 'done'
          ? submitString
          : 'Show ' +
              (/^\d+$/.test(slideIdentification)
                ? 'slide ' +
                  (parseInt(slideIdentification) + 1) +
                  ' of ' +
                  instance.logic.length
                : slideIdentification),
        null
      );

      // Event
      button.addEventListener('click', () => {
        navTo(instance, slideIdentification, {}, true);
      });
    });
  });

  // * Keyboard events *

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
    console.log(
      'activeKeyBoardInstance is irrelevant, make sure that event parent has identical sf-id!'
    );

    // Elements
    const target =
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
        ? event.target
        : null;

    // Guard 1 - Is active instance
    if (model.state.activeKeyBoardInstance !== instance.name) return;

    // Values
    const currentSlide = instance.logic[modelUtils.currentSlideId(instance)];

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
    navPrev(instance, {}, true);
    console.log(
      'look into why backspace navigation is possible on done?',
      'make sure .to() is not empowered!'
    );
    instance.focus.clear();
  }

  // Function to be called when Enter key is pressed
  function onEnter() {
    // Add your custom logic here
    navNext(instance, {}, true);
    instance.focus.clear();
  }

  // Function to be called when Left Arrow key is pressed
  function onArrowLeft() {
    console.log('You shall now work on shift tab!');

    // Add your custom logic here
    navNext(instance, {}, true);
  }

  // Function to be called when Right Arrow key is pressed
  function onArrowRight() {
    console.log('You shall now work on tab!');

    // Add your custom logic here
    navPrev(instance, {}, true);
  }
}
