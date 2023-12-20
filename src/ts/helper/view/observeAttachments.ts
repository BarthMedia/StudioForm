// Imports
import * as utils from './utils';
import * as attributeUtils from './utilsAttributes';
import * as modelUtils from '../model/utils';
import * as model from '../../model';
import * as config from '../../config';

// Export
export default function (
  instance: StudioFormInstance,
  fileInputs: HTMLInputElement[]
) {
  // Guard
  if (!fileInputs.length) return;

  // Values
  const ghost = modelUtils.returnGhost(instance);
  const modes = instance.config.modes;

  // Loop
  fileInputs.forEach(input => {
    // Elements
    const label = document.querySelector(`[for="${input.id}"]`) as HTMLElement;

    // Values
    const originalText = label?.innerHTML;

    // Null guard
    if (!utils.isElement(label)) return;

    // + Event listeners +

    // File drop events
    ['dragover', 'dragleave', 'drop'].forEach((str, index) => {
      // Listen
      label.addEventListener(str, function (event) {
        // Guard
        if (!modes.fileDrop) return;

        // Functionality
        event.preventDefault();

        // Switch
        switch (index) {
          case 0: {
            dragOver('add');
            break;
          }
          case 1: {
            dragOver();
            break;
          }
          case 2: {
            dragOver();
            handleFiles((event as DragEvent).dataTransfer?.files);
            break;
          }
        }
      });
    });

    // Click
    label.addEventListener('click', _ => {
      // Guard
      if (!modes.fileDrop) return;

      // Functionality
      handleFiles(null);
    });

    // Input change event listener
    input.addEventListener('change', _ => {
      handleFiles(input.files);
    });

    // + Define +

    // Add drag over
    function dragOver(mode = 'remove') {
      toggle(mode, 'drag-over');
    }

    // Add uploaded
    function uploaded(mode: string) {
      toggle(mode, 'attached');
    }

    // Toggle
    function toggle(mode: string, _class: string) {
      const sfuOptions = {
        class: _class,
        mode: mode,
      };
      utils.classListToggle({
        ...sfuOptions,
        element: label,
      });
    }

    // Handle files!
    const attachedAttr = `${config.PRODUCT_NAME_SHORT}-attached`;
    function handleFiles(files: FileList | undefined | null) {
      // Define
      function falsy(isVadilityError = false) {
        // Handle class swap
        uploaded('remove');

        // Label text
        if (modes.fileLabelSwap) label.innerHTML = originalText;

        // Report vadility
        if (isVadilityError) instance.reportValidity(label);

        // Remove file
        delete ghost.files[key];
        input.removeAttribute(attachedAttr);

        // Fire event
        utils.dispatchEvent(instance, 'detached', true, false, { key: key });
      }

      // Values
      const acceptedTypes =
        (input.accept || '') === ''
          ? undefined
          : input.accept.split(',').map(str => str.trim());
      const isMultiple = input.multiple;
      const key = utils.getInputKey(input);

      // Guard
      if (!files) {
        // Falsy
        falsy();

        // Skip code below
        return;
      }

      // Functions
      function getAttribute(string: string) {
        // Values
        const val = parseFloat(
          attributeUtils.getAttribute(string, input, label) || ''
        );

        // Return
        return isNaN(val) ? null : val;
      }

      // Special attributes
      const minFiles = getAttribute('min-files');
      const maxFiles = getAttribute('max-files');
      const minSize = getAttribute('min-size');
      const maxSize = getAttribute('max-size');

      // Loop & variables
      let allowedFiles: File[] = [];
      for (let i = 0, n = files.length; i < n; i++) {
        // Values
        const file = files[i];

        // Guard
        if (!isMultiple && i) break;

        // Only push if accepted
        if (!acceptedTypes || acceptedTypes.includes(file.type)) {
          // Min & max size
          if (minSize !== null && file.size < minSize) continue;
          if (maxSize !== null && file.size > maxSize) continue;

          // Success
          allowedFiles.push(file);
        }
      }

      // Test file numbers
      if (minFiles !== null && allowedFiles.length >= minFiles)
        allowedFiles = [];
      if (maxFiles !== null && allowedFiles.length <= maxFiles)
        allowedFiles = [];

      // Guard
      if (!allowedFiles.length) {
        // Falsy
        falsy(true);

        // Skip code below
        return;
      }

      // Values
      const name = allowedFiles.map(file => file.name).join(', ');
      const prefix =
        attributeUtils.getAttribute('swap-prefix', input, label) || '';
      const suffix =
        attributeUtils.getAttribute('swap-suffix', input, label) || '';
      const fileName = prefix + name + suffix;

      // Swap
      if (modes.fileLabelSwap) label.innerHTML = fileName;
      uploaded('add');

      // Add files
      ghost.files[key] = !isMultiple
        ? allowedFiles[0]
        : (model.createReadMostlyProxy(allowedFiles) as File[]);
      input.setAttribute(attachedAttr, 'true');

      // Fire event
      utils.dispatchEvent(instance, 'attached', true, false, { key: key });
    }
  });
}
