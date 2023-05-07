// + Imports +
import * as config from '../config.js';

// + Classes +

// - Anchor funcitonality -
class FileLabelView {
  init(stateData) {
    // Guard
    if (
      stateData.elements.$formBlock.attr(
        config.AUTO_CHANGE_FILE_LABEL_ATTRIBUTE
      ) === 'false'
    )
      return;

    // Elements
    const $form = stateData.elements.$form,
      $fileInputs = $form.find('input[type="file"]');

    // Loop
    $fileInputs.each(function () {
      // Elements
      const $input = $(this),
        $parent = $input.parent(),
        $label = $parent.find('label');

      // Guard
      if ($label.length === 0) return true;

      // Values
      const labelText = $label.text();

      // Event listener
      $input.on('change', function () {
        // Values
        const arr = $input.val().split('\\');
        let name = arr[arr.length - 1];

        name = name !== '' ? name : labelText;

        $label.text(name);
      });
    });
  }
}

// + Exports +
export default new FileLabelView();
