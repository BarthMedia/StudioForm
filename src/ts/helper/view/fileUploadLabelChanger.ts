// Imports
import * as helper from '../helper';
import * as model from '../../model';

// Export
export default function (state: any) {
  // Guard
  if (!state.modes.autoSwapFileUploadLabelText) return;

  // Loop
  state.elements.mask
    .querySelectorAll('input[type="file"]')
    .forEach((input: HTMLInputElement) => {
      // Elements
      const label = document.querySelector(
        `[for="${input.id}"]`
      ) as HTMLElement | null;

      // Guard
      if (!label) return;

      // Guard
      if ((label.getAttribute('data-swap-text') || 'true') !== 'true') return;

      // Values
      const originalText = label?.innerHTML;
      const allElements = [label, input];
      label.childNodes.forEach(node => allElements.push(node as HTMLElement));

      // Event listener
      input.addEventListener('change', _ => {
        // Values
        const selectedFile = input.files?.[0];
        const prefix = label.getAttribute('data-swap-prefix') || '';

        // Logic swap
        if (selectedFile) {
          label.innerHTML = prefix + selectedFile.name;
          allElements.forEach(el => el?.classList?.add('sf-uploaded'));
        } else {
          label.innerHTML = originalText;
          allElements.forEach(el => el?.classList?.remove('sf-uploaded'));
        }
      });
    });
}