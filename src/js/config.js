// + Global strings +

// + + + Functional defaults + + +

// Keyboard features
export const ESC_EVENT_DEFAULT = 'escape, esc, arrowup, up';
export const ENTER_EVENT_DEFAULT = 'enter, arrowdown, down';
export const LEFT_EVENT_DEFAULT = 'arrowleft, left';
export const RIGHT_EVENT_DEFAULT = 'arrowright, right';
export const LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_DEFAULT = 'true';

// Next button(s) & Keyboard
export const AUTO_DETECT_NEXT_STEP_DEFAULT = 'true';

// + + + Style defaults + + +

// CSS
export const CSS_SHOW_DEFAULT = { opacity: 1 /*, display: 'flex'*/ };
export const CSS_HIDE_DEFAULT = { opacity: 0, display: 'none' };
export const CSS_ACTIVE_DEFAULT = {
  // borderColor: '#175ADA',
  // opacity: 1,
  // duration: 0.5,
};
export const CSS_INACTIVE_DEFAULT = {
  // borderColor: '',
  // opacity: 0.35,
  // duration: 0.5,
};
export const CSS_BACK_FORTH_ACTIVE_DEFAULT = { opacity: 1, pointerEvents: '' };
export const CSS_BACK_FORTH_INACTIVE_DEFAULT = {
  opacity: 0,
  pointerEvents: 'none',
};

// General animation time
export const ANIMATION_MS_TIME_DEFAULT = 500;

// Errors
export const ERROR_COLOR_DEFAULT = 'red';

// Sliding
export const SLIDE_DIRECTION_DEFAULT = 'to left';
export const CUSTOM_NEXT_SLIDE_IN_DEFAULT = { ...CSS_SHOW_DEFAULT };
export const CUSTOM_NEXT_SLIDE_OUT_DEFAULT = { ...CSS_HIDE_DEFAULT };
export const CUSTOM_PREV_SLIDE_IN_DEFAULT = { ...CSS_SHOW_DEFAULT };
export const CUSTOM_PREV_SLIDE_OUT_DEFAULT = { ...CSS_HIDE_DEFAULT };

// Multiplieres
export const EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_DEFAULT = 0.25;
export const CUSTOM_X_MULTIPLIER_DEFAULT = 0;
export const CUSTOM_Y_MULTIPLIER_DEFAULT = 0;
export const AUTO_RESIZE_TIME_MULTIPLIER_1_DEFAULT = 1;
export const AUTO_RESIZE_TIME_MULTIPLIER_2_DEFAULT = 0.5;
export const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_DEFAULT = 1;
export const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_DEFAULT = 0.85;

// Swipe gestures
export const MAX_SWIPE_SCREEN_SIZE_DEFAULT = 767;
export const MIN_SWIPE_SCREEN_SIZE_DEFAULT = 0;

// Redirection
export const REDIRECT_MS_TIME_DEFAULT = 1;

// Progress bar
export const PROGRESS_BAR_AXIS_DEFAULT = 'x';

// Anchor
export const ANCHOR_MIN_SCREEN_SIZE_DEFAULT = 0;
export const ANCHOR_MAX_SCREEN_SIZE_DEFAULT = 10000;
export const ERROR_ANCHOR_OFFSET_DEFAULT = 96; // Anchor to error feature not yet developed

// Development mode object
export const DEV_MODE_OBJECT = [
  {
    names: ['false'],
    value: 0,
  },
  {
    names: ['half', '50%'],
    value: 0.5,
  },
  {
    names: ['on', 'true', '100%'],
    value: 1,
  },
  {
    names: ['extreme', '200%'],
    value: 2,
  },
];

// Dependencies - make sure scripts don't load twice
export const TYPEOF_GSAP_DEPENDENCY = typeof gsap;
export const TYPEOF_GSAP_SCROLL_TO_DEPENDENCY = typeof $('body').attr(
  'data-gsap-scroll-already-installed'
);
export const TYPEOF_HAMMER_JS_DEPENDENCY = typeof Hammer;
export const TYPEOF_XANO_SDK_DEPENDENCY = typeof XanoClient;

// Custom selectors
export const FORM_BLOCK_SELECTOR = '[studio-form = "Form Block"]';
export const FORM_SELECTOR = '[studio-form = "Form"]';
export const STEP_SELECTOR = '[studio-form = "Form Step"]';
export const DIVIDER_SELCTOR = '[studio-form = "Visual Divider"]';
export const SUBMIT_BUTTON_SELECTOR = '[studio-form = "Submit Button"]';
export const CONTINUE_BUTTON_SELECTOR = '[studio-form = "Continue Button"]';
export const BACKWARDS_BUTTON_SELECTOR = '[studio-form = "Backwards Button"]';
export const NOT_A_BUTTON_SELECTOR = '[studio-form = "Not a Button"]';
export const QUIZ_RESULT_SELECTOR = '[studio-form = "Quiz Result"]';
export const PROGRESS_BAR_SELECTOR = '[studio-form = "Progress Bar"]';
export const ANCHOR_ELEMENT_SELECTOR = '[studio-form = "Anchor Element"]';

// Webflow classes
export const W_RADIO_SELECTOR = '.w-radio';
export const W_CHECKBOX_SELECTOR = '.w-checkbox';
export const W_BUTTON_SELECTOR = '.w-button';
export const W_SUCCESS_SELECTOR = '.w-form-done';
export const W_CONDITION_INVISIBLE_SELECTOR = '.w-condition-invisible';
export const W_FORM_BLOCK_CLASS = 'w-form';

// + + + Functional attributes + + +

// FinSweet attributes
export const FS_RANGE_SLIDER_ELEMENTS_SELECTOR = '[fs-rangeslider-element]';

// Step attributes
export const STEP_TYPE_ATTRIBUTE = 'data-step-type';
export const STEP_INDEX_ATTRIBUTE = 'data-step-index';
export const STEP_REQUIRED_ATTRIBUTE = 'data-required';
export const STEP_CUSTOM_REQUIREMENTS_PASSED_ATTRIBUTE =
  'data-custom-requirements-passed';
export const LAST_STEP_ATTRIBUTE = 'data-last-step';

// Form block
export const FORM_BLOCK_INDEX_ATTRIBUTE = 'data-form-block-index';

// Conditional
export const CONDITIONAL_ATTRIBUTE = 'data-conditional';
export const CONDITIONAL_NEXT_ATTRIBUTE = 'data-conditional-next';

// Auto continuing
export const NOT_AUTO_CONTINUE_ATTRIBUTE = 'data-not-auto-continue';

// Clicking
export const MARK_CLICK_ELEMENT_ATTRIBUTE = 'data-click-element';
export const ELEMENT_GOT_CHECKED_ATTRIBUTE = 'data-element-checked';
export const CLICK_ELEMENT_ID_ATTRIBUTE = 'data-click-element-id';

// Auto step removal
export const REMOVE_OTHER_STEPS_ATTRIBUTE = 'data-remove-other-steps';

// Keyboard features
export const AUTO_FOCUS_ATTRIBUTE = 'data-autofocus';
export const KEYBOARD_EVENTS_ON_STEP_ATTRIBUTE = 'data-keyboard-events';
export const ESC_EVENT_ATTRIBUTE = 'data-esc-event';
export const ENTER_EVENT_ATTRIBUTE = 'data-enter-event';
export const LEFT_EVENT_ATTRIBUTE = 'data-left-event';
export const LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_ATTRIBUTE =
  'data-left-key-event-infintiy-allowed';
export const RIGHT_EVENT_ATTRIBUTE = 'data-right-event';

// Development mode
export const DEV_MODE_ATTRIBUTE = 'data-dev-mode';

// Swipe gestures
export const SWIPE_ALLOWED_ATTRIBUTE = 'data-swipe-allowed';

// Quiz mode
export const QUIZ_PATH_ATTRIBUTE = 'data-quiz-path';

// Redirect mode
export const REDIRECT_URL_ATTRIBUTE = 'data-redirect-url';

// Autodeletion of conditionally invisible elements
export const AUTO_DELETE_CONDITIONALLY_INVISIBLE_ITEMS_ATTRIBUTE =
  'data-auto-delete-conditionally-invisible-elements';

// Autodetection of next step
export const AUTO_DETECT_NEXT_STEP_ATTRIBUTE = 'data-auto-detect-next-step';

// Xano
export const XANO_MODE_ATTRIBUTE = 'data-xano-mode';

// + + + Style attributes + + +

// CSS
export const CSS_SHOW_ATTRIBUTE = 'data-css-show';
export const CSS_HIDE_ATTRIBUTE = 'data-css-hide';
export const CSS_ACTIVE_ATTRIBUTE = 'data-css-active';
export const CSS_INACTIVE_ATTRIBUTE = 'data-css-inactive';
export const CSS_BACK_FORTH_ACTIVE_ATTRIBUTE = 'data-back-forth-css-active';
export const CSS_BACK_FORTH_INACTIVE_ATTRIBUTE = 'data-back-forth-css-inactive';
export const SET_CSS_INACTIVE_ATTRIBUTE = 'data-set-css-inactive';
export const CSS_SELECT_ATTRIBUTE = 'data-css-select';
export const CSS_DESELECT_ATTRIBUTE = 'data-css-deselect';

// General animation time
export const ANIMATION_MS_TIME_ATTRIBUTE = 'data-animation-ms-time';

// Errors
export const ERROR_COLOR_ATTRIBUTE = 'data-error-color';
export const CSS_ERROR_STATUS_ATTRIBUTE = 'data-css-error-status';
export const CSS_ERROR_STATUS_RESOLVED_ATTRIBUTE =
  'data-css-error-status-resolved';

// Sliding
export const SLIDE_DIRECTION_ATTRIBUTE = 'data-slide-direction';
export const CUSTOM_NEXT_SLIDE_IN_ATTRIBUTE = 'data-custom-next-slide-in';
export const CUSTOM_NEXT_SLIDE_OUT_ATTRIBUTE = 'data-custom-next-slide-out';
export const CUSTOM_PREV_SLIDE_IN_ATTRIBUTE = 'data-custom-prev-slide-in';
export const CUSTOM_PREV_SLIDE_OUT_ATTRIBUTE = 'data-custom-prev-slide-out';

// Transition multiplieres
export const EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_ATTRIBUTE =
  'data-equal-height-transition-speed-multiplier';
export const CUSTOM_X_MULTIPLIER_ATTRIBUTE =
  'data-custom-x-percentage-multiplier';
export const CUSTOM_Y_MULTIPLIER_ATTRIBUTE =
  'data-custom-y-percentage-multiplier';
export const AUTO_RESIZE_TIME_MULTIPLIER_1_ATTRIBUTE =
  'data-auto-resize-time-multiplier-1';
export const AUTO_RESIZE_TIME_MULTIPLIER_2_ATTRIBUTE =
  'data-auto-resize-time-multiplier-2';
export const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_ATTRIBUTE =
  'data-success-auto-resize-time-multiplier-1';
export const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE =
  'data-success-auto-resize-time-multiplier-2';

// Swipe gestures
export const MAX_SWIPE_SCREEN_SIZE_ATTRIBUTE = 'data-max-swipe-screen-size';
export const MIN_SWIPE_SCREEN_SIZE_ATTRIBUTE = 'data-min-swipe-screen-size';
export const SWIPE_TYPE_ANIMATION_ATTRIBUTE = 'data-swipe-type-animation';

// Submission
export const SUBMIT_MS_TIME_1_ATTRIBUTE = 'data-submit-ms-time-1';
export const SUBMIT_MS_TIME_2_ATTRIBUTE = 'data-submit-ms-time-2';
export const SUBMIT_SHOW_ATTRIBUTE = 'data-submit-show';
export const SUBMIT_HIDE_ATTRIBUTE = 'data-submit-hide';
export const REDIRECT_MS_TIME_ATTRIBUTE = 'data-redirect-ms-time';

// Progress bar
export const PROGRESS_BAR_ANIMATION_MS_TIME_ATTRIBUTE =
  'data-progress-bar-ms-time';
export const PROGRESS_BAR_AXIS_ATTRIBUTE = 'data-progress-bar-axis';

// Anchor
export const ANCHOR_MIN_SCREEN_SIZE_ATTRIBUTE = 'data-anchor-min-screen-size';
export const ANCHOR_MAX_SCREEN_SIZE_ATTRIBUTE = 'data-anchor-max-screen-size';
export const ANCHOR_ANIMATION_MS_TIME_ATTRIBUTE =
  'data-anchor-animation-ms-time';
export const ANCHOR_Y_OFFSET_SELECTOR_ATTRIBUTE =
  'data-anchor-y-offset-selector';
export const ANCHOR_RELATED_ELEMENT_TO_SCROLL_SELECTOR_ATTRIBUTE =
  'data-anchor-related-element-to-scroll-selector';
export const ERROR_ANCHOR_OFFSET_ATTRIBUTE = 'data-error-anchor-offset';

// Height calculation
export const STEP_HEIGHT_CALCULATION_METHOD_ATTRIBUTE =
  'data-step-height-calculation-method';
