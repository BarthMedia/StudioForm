// Imports
import * as utils from './utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (
  instance: StudioFormInstance,
  fileInputs: HTMLInputElement[]
) {
  // Guard
  if (!fileInputs.length) return;

  console.log(
    'CREATE OBSEVER, THAT TESTS FOR NEW HTML ELEMENT CHANGES, AND ADJUSTS THESE 3 HELPER FILES ACCORDINGLY!'
  );

  // Guard
  if (!instance.config.modes.autoSwapFileUploadLabel) return;

  setTimeout(() => {
    console.log(
      'Use custom new elements to build this out for JFP',

      'BUILD OUT NATIVE FILE DRAG SUPPORT',

      "Have some sort of file label text ... ? or like data-wait, maybe sf-uploaded='This hase been uploaded FILE_NAME'",

      fileInputs,

      'Perfect, you got it to reliably work <3',

      instance.name
    );
  }, 5000);

  // Loop
  (
    instance.elements.mask.querySelectorAll(
      'input[type="file"]'
    ) as NodeListOf<HTMLInputElement>
  ).forEach(input => {
    // Elements
    const label = document.querySelector(`[for="${input.id}"]`) as HTMLElement;

    // Null guard
    if (!utils.isElement(label)) return;

    // Guard
    if ((utils.getAttribute('swap-text', label) || 'true') !== 'true') return;

    // Values
    const originalText = label?.innerHTML;
    const allElements = [label, input];
    label.childNodes.forEach(node => allElements.push(node as HTMLElement));

    // Define

    function f(mode: string) {
      const sfuOptions = {
        class: 'uploaded',
        mode: mode,
      };
      utils.classListToggle({
        ...sfuOptions,
        element: label,
        otherEls: [input],
      });
    }

    // Event listener
    input.addEventListener('change', _ => {
      // Values
      const selectedFile = input.files?.[0];
      const prefix = utils.getAttribute('swap-text', label) || '';

      // Logic swap
      if (selectedFile) {
        label.innerHTML = prefix + selectedFile.name;
        f('add');
      } else {
        label.innerHTML = originalText;
        f('remove');
      }
    });
  });
}
