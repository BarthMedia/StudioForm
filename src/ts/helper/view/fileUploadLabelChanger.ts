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
    }

    // Click
    label.addEventListener('click', _ => {
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
      toggle(mode, 'uploaded');
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
      function falsy() {
        // Handle class swap
        uploaded('remove');

        // Label text
        if (allowLabelSwap) label.innerHTML = originalText;

        // Remove file
        delete ghost.files[key];
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

      // Loop & variables
      const allowedFiles: File[] = [];
      for (let i = 0, n = files.length; i < n; i++) {
        // Values
        const file = files[i];

        // Guard
        if (!isMultiple && i) break;

        // Only push if accepted
        if (!acceptedTypes || acceptedTypes.includes(file.type))
          allowedFiles.push(file);
      }

      // Guard
      if (!allowedFiles.length) {
        // Falsy
        falsy();

        // Skip code below
        return;
      }

      // Values
      const name = allowedFiles.map(file => file.name).join(', ');
      const prefix = utils.getAttribute('swap-prefix', label, input) || '';
      const suffix = utils.getAttribute('swap-suffix', label, input) || '';

      // Swap
      if (allowLabelSwap) label.innerHTML = prefix + name + suffix;
      uploaded('add');

      // Add files
      ghost.files[key] = !isMultiple
        ? allowedFiles[0]
        : (model.createReadMostlyProxy(allowedFiles) as File[]);
    }
  });
}
