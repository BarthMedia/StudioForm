// + Imports +
import * as config from '../../config.js';

// + Helpers +
function addImagePromise(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(true);
    img.onerror = reject;
    img.src = src;
  });
}

// + Exports +
export default function (stateData, callback) {
  // Add to userConfig later !
  const isEagerLoadMode =
    (stateData.elements.$formBlock.attr(
      config.AUTO_EAGER_LOAD_RICH_TEXT_IMAGES_ATTRIBUTE
    ) || config.AUTO_EAGER_LOAD_RICH_TEXT_IMAGES_DEFAULT) === 'true'
      ? true
      : false;

  // Guard
  if (!isEagerLoadMode) return;

  // Elements
  const richtexts = stateData.elements.$form[0].querySelectorAll(
    config.W_RICH_TEXT_SELECTOR
  );

  // Values
  const l1 = richtexts.length - 1;

  // Loop
  richtexts.forEach((richtext, i1) => {
    // Elements
    const images = richtext.querySelectorAll('img');

    // Values
    const l2 = images.length - 1;

    // Loop
    images.forEach((image, i2) => {
      // DOM manipulation
      image.setAttribute('loading', 'eager');

      // Logic for last image
      if (i1 >= l1 && i2 >= l2) {
        // Perform async call back
        addImagePromise(image.getAttribute('src')).then(res => {
          // Guard
          if (res !== true) return;

          // Callback
          callback(stateData);
        });
      }
    });
  });

  // Done
}
// Auto eager load rich text images
