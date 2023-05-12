// + Imports +
import * as config from '../../config.js';

// + Exports +
export default function (stateData) {
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

  // Loop
  richtexts.forEach(function (richtext) {
    const images = richtext.querySelectorAll('img');
    images.forEach(function (image) {
      image.setAttribute('loading', 'eager');
    });
  });

  // Done
}
// Auto eager load rich text images
