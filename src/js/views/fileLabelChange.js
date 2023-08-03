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
        $parent = $input.parent().parent(), // ZHAW Adjustment
        $label = $parent.find('label'),
        $fakeLabel = $parent.find('[studio-form="File Upload Fake Label"]'),
        $emptyIcon = $parent.find('[studio-form="Upload Icon Empty"]'),
        $processingIcon = $parent.find(
          '[studio-form="Upload Icon Processing"]'
        ),
        $successIcon = $parent.find('[studio-form="Upload Icon Succesful"]');

      // Guard
      if ($label.length === 0) return true;

      // Values
      const labelText = $label.text();

      // Event listener
      $input.on('change', function () {
        // Values
        const arr = $input.val().split('\\');
        let name = arr[arr.length - 1];
        let isEmpty = name === '' ? true : false;

        // Icon changes
        $emptyIcon.add($successIcon).hide();
        $processingIcon.show();

        setTimeout(() => {
          $processingIcon.hide();
          isEmpty ? $emptyIcon.show() : $successIcon.show();
        }, 650);

        // Text changes
        name = name !== '' ? name : labelText;

        // ZHAW long text adjustment
        if (!isEmpty & (name.length >= 42)) {
          // Values
          const firstN = name.slice(0, 17);
          const lastN = name.slice(-20);

          // Update
          name = firstN + ' ... ' + lastN;
        }

        $label.text(name);
        $fakeLabel.text(name);
      });
    });
  }
}

// + Exports +
export default new FileLabelView();
