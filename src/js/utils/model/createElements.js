// + Imports +

// Base

// Custom
import * as config from '../../config.js';
import autoDeleteConditionallyInvisibleElements from './autoDeleteConditionallyInvisibleElements.js';
import { jQueryToJs, returnChildElements } from '../../helper.js';

// + Exports +
export default function ($this, formBlockIndex) {
  // Auto delete
  autoDeleteConditionallyInvisibleElements($this);

  // Values
  const elements = {};

  // Test if slider mode
  // const isSliderMode = !$this.hasClass(config.W_FORM_BLOCK_CLASS);

  // Elements
  elements.$formBlock = $this;
  elements.$form = returnChildElements(
    elements.$formBlock,
    config.FORM_SELECTOR,
    0
  );
  elements.$steps = returnChildElements(
    elements.$form,
    config.STEP_SELECTOR,
    'false',
    `${config.DIVIDER_SELCTOR}, ${config.QUIZ_RESULT_SELECTOR}`
  );
  elements.$backwardsButtons = elements.$form.find(
    config.BACKWARDS_BUTTON_SELECTOR
  );
  elements.$submitButtons = elements.$form.find(config.SUBMIT_BUTTON_SELECTOR);
  elements.$notForm = elements.$formBlock.children().not(elements.$form);
  elements.$backButton = elements.$notForm.find(
    config.BACKWARDS_BUTTON_SELECTOR
  );
  elements.$nextButton = elements.$notForm.find(
    config.CONTINUE_BUTTON_SELECTOR
  );
  elements.backButtons = jQueryToJs(
    elements.$backButton,
    '[not-findable = "Back Buttons"]'
  );
  elements.nextButtons = jQueryToJs(
    elements.$nextButton,
    '[not-findable = "Next Buttons"]'
  );
  elements.$progressBar = elements.$formBlock.find(
    config.PROGRESS_BAR_SELECTOR
  );
  elements.progressBars = jQueryToJs(
    elements.$progressBar,
    '[not-findable = "Progress Bars"]'
  );
  elements.$anchor = elements.$formBlock
    .find(config.ANCHOR_ELEMENT_SELECTOR)
    .eq(0);
  // ZHAW
  elements.$currentSlideIndex = elements.$formBlock.find(
    '[studio-form="Current Slide"]'
  );

  // Save form block index in the DOM
  elements.$formBlock.attr(config.FORM_BLOCK_INDEX_ATTRIBUTE, formBlockIndex);

  // Return
  return elements;
}
