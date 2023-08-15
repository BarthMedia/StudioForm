// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (slide: HTMLElement, state: any) {
  // Guard
  if (!state.modes.swapSubmitButtons) return;

  // Elements
  const submits = slide.querySelectorAll('input[type="submit"]');

  // Guard
  if (submits.length < 1) return;

  // Loop
  submits.forEach(submit => {
    // Create
    const btn = document.createElement('a');
    btn.setAttribute('class', submit.classList.value);
    btn.setAttribute('data-wait', submit.getAttribute('data-wait') || '');
    btn.setAttribute('studio-form', 'submit');
    btn.innerHTML = submit.getAttribute('value') || '';

    // Swap
    submit.after(btn);
    submit.remove();
  });
}
