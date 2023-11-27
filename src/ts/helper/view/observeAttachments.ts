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

  // Values
  const ghost = model.state.ghostInstances[instance.name];

  // Loop
  fileInputs.forEach(input => {
    // Elements
    const label = document.querySelector(`[for="${input.id}"]`) as HTMLElement;

    // Values
    const originalText = label?.innerHTML;

    // Null guard
    if (!utils.isElement(label)) return;

    // + Event listeners +

    // File drop
    if (instance.config.modes.fileDrop) {
      // Add sf-drag-over
      label.addEventListener('dragover', function (event) {
        event.preventDefault();
        dragOver('add');
      });

      label.addEventListener('dragleave', function (event) {
        event.preventDefault();
        dragOver();
      });

      label.addEventListener('drop', function (event) {
        // Prevent
        event.preventDefault();
        dragOver();

        // Handle
        handleFiles(event.dataTransfer?.files);
      });

      // Click
      label.addEventListener('click', _ => {
        handleFiles(null);
      });
    }

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
    const allowLabelSwap = instance.config.modes.fileLabelSwap;
    function handleFiles(files: FileList | undefined | null) {
      // Define
      function falsy(isVadilityError = false) {
        // Handle class swap
        uploaded('remove');

        // Label text
        if (allowLabelSwap) label.innerHTML = originalText;
        label.removeAttribute(`${config.PRODUCT_NAME_SHORT}-file-name`);

        // Report vadility
        if (isVadilityError) instance.reportValidity(label);

        // Remove file
        delete ghost.files[key];

        // Fire event
        utils.dispatchEvent(instance.name, 'detached', false, { key: key });
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
        const val = parseFloat(utils.getAttribute(string, input, label) || '');

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
      const prefix = utils.getAttribute('swap-prefix', input, label) || '';
      const suffix = utils.getAttribute('swap-suffix', input, label) || '';
      const fileName = prefix + name + suffix;

      // Swap
      if (allowLabelSwap) label.innerHTML = fileName;
      label.setAttribute(`${config.PRODUCT_NAME_SHORT}-file-name`, fileName);
      uploaded('add');

      // Add files
      ghost.files[key] = !isMultiple
        ? allowedFiles[0]
        : (model.createReadMostlyProxy(allowedFiles) as File[]);

      // Fire event
      utils.dispatchEvent(instance.name, 'attached', false, { key: key });
    }
  });
}
