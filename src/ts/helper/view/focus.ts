// Imports
import * as utils from './utils';
import * as modelUtils from '../model/utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// + utils +

// Global ghostFocus
let focusGhost: SFGhostFocus;

// Event listener

// Add one-time event listener for blur event
function addOneTimeClickListener(btn: HTMLElement) {
  // Event listener
  document.body.addEventListener(
    'click',
    function () {
      // Call addFocus with add=false
      if (focusGhost.button == btn) {
        delete focusGhost.button;
        addFocus(btn, false);
      }
    },
    { once: true }
  );
}

// Add / remove class
function addFocus(btn: HTMLElement, add = true) {
  // On add focus
  if (add) {
    // Open allowance
    focusGhost.doubleClick = true;

    // Click
    btn.click();

    // Close allowace
    setTimeout(() => {
      delete focusGhost.doubleClick;

      // Tagname logic
      const focusableBtn: HTMLElement | null = ['INPUT', 'A'].includes(
        btn.tagName
      )
        ? btn
        : btn.querySelector('input, a');

      // Focus
      focusableBtn?.focus();

      // Add focus loss listener
      addOneTimeClickListener(btn);
    }, 1);
  }

  // Toggle
  utils.classListToggle({
    element: btn,
    class: 'focus',
    mode: add ? 'add' : 'remove',
    closest: {
      cascader: true,
    },
  });
}

// + Functions +

// Clear
export function clear(instance: StudioFormInstance) {
  main(instance, 'clear');
}

// Next
export function next(instance: StudioFormInstance, triggerType?: 'enter') {
  main(instance, 'next', triggerType);
}

// Prev
export function prev(instance: StudioFormInstance) {
  main(instance, 'prev');
}

// Main
function main(
  instance: StudioFormInstance,
  mode: 'clear' | 'next' | 'prev',
  triggerType?: 'enter'
) {
  // Values
  const ghost = model.state.ghostInstances[instance.name].focus;
  const slide = instance.logic[modelUtils.currentSlideId(instance)];
  const buttons = slide.buttons;

  focusGhost = ghost;

  // Clear
  if (mode == 'clear') {
    // Animate
    if (ghost.button) addFocus(ghost.button, false);
    delete ghost.button;

    // Guard
    return;
  }

  // Guard
  if (!buttons || buttons.length < 2) return;

  // No previously focused button case
  if (!ghost.button) {
    // Logic
    const radio: HTMLElement | null | undefined =
      slide.type == 'radio'
        ? slide.element
            .querySelector('input[type="radio"]:checked')
            ?.closest('label')
        : null;

    // Radio & enter edgecase
    if (radio && triggerType == 'enter') {
      radio.click();
      return;
    }

    const btn = radio || buttons[0].element;
    addFocus(btn);
    ghost.button = btn;

    // Skip code below
    return;
  }

  // Find next button in line to focus
  let currentButtonIndex = 0;
  buttons.every((btn, index) => {
    // Logic
    if (ghost.button == btn.element) currentButtonIndex = index;

    // Default
    return true;
  });

  // Add / subtract value
  let nextButtonIndex = currentButtonIndex + (mode == 'next' ? 1 : -1);
  if (nextButtonIndex < 0) nextButtonIndex = buttons.length - 1;
  if (nextButtonIndex >= buttons.length) nextButtonIndex = 0;

  // Find next button
  const currentButton = buttons[currentButtonIndex].element;
  const nextButton = buttons[nextButtonIndex].element;

  // Add / remove focus
  ghost.button = nextButton;
  addFocus(currentButton, false);
  addFocus(nextButton);
}
