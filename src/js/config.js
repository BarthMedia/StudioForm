// + Global strings +

// Functional defaults
export const ESC_EVENT_DEFAULT = 'escape, esc, arrowup, up';
export const ENTER_EVENT_DEFAULT = 'enter, arrowdown, down';
export const LEFT_EVENT_DEFAULT = 'arrowleft, left';
export const RIGHT_EVENT_DEFAULT = 'arrowright, right';
export const LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_DEFAULT = 'true';
export const AUTO_DETECT_NEXT_STEP_DEFAULT = 'true';

// Style defaults
export const CSS_SHOW_DEFAULT = { opacity: 1, display: 'flex' };
export const CSS_HIDE_DEFAULT = { opacity: 0, display: 'none' };
export const CSS_ACTIVE_DEFAULT = { opacity: 1, duration: 0.1 };
export const CSS_INACTIVE_DEFAULT = { opacity: 0.5, duration: 0.1 };
export const CSS_BACK_FORTH_ACTIVE_DEFAULT = { opacity: 1 };
export const CSS_BACK_FORTH_INACTIVE_DEFAULT = { opacity: 0.5 };
export const ANIMATION_MS_TIME_DEFAULT = 500;
export const EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_DEFAULT = 0.25;
export const ERROR_COLOR_DEFAULT = 'red';
export const SLIDE_DIRECTION_DEFAULT = 'to left';
export const CUSTOM_NEXT_SLIDE_IN_DEFAULT = { ...CSS_SHOW_DEFAULT };
export const CUSTOM_NEXT_SLIDE_OUT_DEFAULT = { ...CSS_HIDE_DEFAULT };
export const CUSTOM_PREV_SLIDE_IN_DEFAULT = { ...CSS_SHOW_DEFAULT };
export const CUSTOM_PREV_SLIDE_OUT_DEFAULT = { ...CSS_HIDE_DEFAULT };
export const CUSTOM_X_MULTIPLIER_DEFAULT = 0;
export const CUSTOM_Y_MULTIPLIER_DEFAULT = 0;
export const AUTO_RESIZE_TIME_MULTIPLIER_1_DEFAULT = 1;
export const AUTO_RESIZE_TIME_MULTIPLIER_2_DEFAULT = 0.5;
export const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_DEFAULT = 1;
export const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_DEFAULT = 0.85;
export const MAX_SWIPE_SCREEN_SIZE_DEFAULT = 767;
export const MIN_SWIPE_SCREEN_SIZE_DEFAULT = 0;
export const REDIRECT_MS_TIME_DEFAULT = 1;
export const PROGRESS_BAR_AXIS_DEFAULT = 'x';
export const ANCHOR_MIN_SCREEN_SIZE_DEFAULT = 0;
export const ANCHOR_MAX_SCREEN_SIZE_DEFAULT = 767;

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
  'bmg-data-gsap-scroll-already-installed'
);
export const TYPEOF_HAMMER_JS_DEPENDENCY = typeof Hammer;

// Custom selectors
export const FORM_BLOCK_SELECTOR = '[bmg-form = "Form Block"]';
export const FORM_SELECTOR = '[bmg-form = "Form"]';
export const STEP_SELECTOR = '[bmg-form = "Form Step"]';
export const DIVIDER_SELCTOR = '[bmg-form = "Visual Divider"]';
export const SUBMIT_BUTTON_SELECTOR = '[bmg-form = "Submit Button"]';
export const CONTINUE_BUTTON_SELECTOR = '[bmg-form = "Continue Button"]';
export const BACKWARDS_BUTTON_SELECTOR = '[bmg-form = "Backwards Button"]';
export const NOT_A_BUTTON_SELECTOR = '[bmg-form = "Not a Button"]';
export const QUIZ_RESULT_SELECTOR = '[bmg-form = "Quiz Result"]';
export const PROGRESS_BAR_SELECTOR = '[bmg-form = "Progress Bar"]';
export const ANCHOR_ELEMENT_SELECTOR = '[bmg-form = "Anchor Element"]';

// Webflow classes
export const RADIO_SELECTOR = '.w-radio';
export const CHECKBOX_SELECTOR = '.w-checkbox';
export const W_BUTTON_SELECTOR = '.w-button';
export const SUCCESS_SELECTOR = '.w-form-done';
export const CONDITION_INVISIBLE_SELECTOR = '.w-condition-invisible';

// Functional attributes
export const FORM_BLOCK_INDEX_ATTRIBUTE = 'bmg-data-form-block-index';
export const STEP_INDEX_ATTRIBUTE = 'bmg-data-step-index';
export const STEP_TYPE_ATTRIBUTE = 'bmg-data-step-type';
export const STEP_REQUIRED_ATTRIBUTE = 'bmg-data-required';
export const STEP_CUSTOM_REQUIREMENTS_PASSED_ATTRIBUTE =
  'bmg-data-custom-requirements-passed';
export const RELATIVE_LAST_STEP_ATTRIBUTE = 'bmg-data-relative-last-step';
export const CONDITIONAL_ATTRIBUTE = 'bmg-data-conditional';
export const CONDITIONAL_NEXT_ATTRIBUTE = 'bmg-data-conditional-next';
export const NOT_AUTO_CONTINUE_ATTRIBUTE = 'bmg-data-not-auto-continue';
export const MARK_CLICK_ELEMENT_ATTRIBUTE = 'bmg-data-click-element';
export const ELEMENT_GOT_CHECKED_ATTRIBUTE = 'bmg-data-element-checked';
export const CLICK_ELEMENT_ID_ATTRIBUTE = 'bmg-data-click-element-id';
export const REMOVE_OTHER_STEPS_ATTRIBUTE = 'bmg-data-remove-other-steps';
export const AUTO_FOCUS_ATTRIBUTE = 'bmg-data-autofocus';
export const KEYBOARD_EVENTS_ON_STEP_ATTRIBUTE = 'bmg-data-keyboard-events';
export const ESC_EVENT_ATTRIBUTE = 'bmg-data-esc-event';
export const ENTER_EVENT_ATTRIBUTE = 'bmg-data-enter-event';
export const LEFT_EVENT_ATTRIBUTE = 'bmg-data-left-event';
export const LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_ATTRIBUTE =
  'bmg-data-left-key-event-infintiy-allowed';
export const RIGHT_EVENT_ATTRIBUTE = 'bmg-data-right-event';
export const DEV_MODE_ATTRIBUTE = 'bmg-data-dev-mode';
export const SWIPE_ALLOWED_ATTRIBUTE = 'bmg-data-swipe-allowed';
export const QUIZ_PATH_ATTRIBUTE = 'bmg-data-quiz-path';
export const REDIRECT_URL_ATTRIBUTE = 'bmg-data-redirect-url';
export const AUTO_DELETE_CONDITIONALLY_INVISIBLE_ITEMS_ATTRIBUTE =
  'bmg-data-auto-delete-conditionally-invisible-elements';
export const AUTO_DETECT_NEXT_STEP_ATTRIBUTE = 'bmg-data-auto-detect-next-step';

// Style attributes
export const CSS_SHOW_ATTRIBUTE = 'bmg-data-css-show';
export const CSS_HIDE_ATTRIBUTE = 'bmg-data-css-hide';
export const CSS_ACTIVE_ATTRIBUTE = 'bmg-data-css-active';
export const CSS_INACTIVE_ATTRIBUTE = 'bmg-data-css-inactive';
export const CSS_BACK_FORTH_ACTIVE_ATTRIBUTE = 'bmg-data-back-forth-css-active';
export const CSS_BACK_FORTH_INACTIVE_ATTRIBUTE =
  'bmg-data-back-forth-css-inactive';
export const SET_CSS_INACTIVE_ATTRIBUTE = 'bmg-data-set-css-inactive';
export const CSS_SELECT_ATTRIBUTE = 'bmg-data-css-select';
export const CSS_DESELECT_ATTRIBUTE = 'bmg-data-css-deselect';
export const ANIMATION_MS_TIME_ATTRIBUTE = 'bmg-data-animation-ms-time';
export const EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_ATTRIBUTE =
  'bmg-data-equal-height-transition-speed-multiplier';
export const ERROR_COLOR_ATTRIBUTE = 'bmg-data-error-color';
export const CSS_ERROR_STATUS_ATTRIBUTE = 'bmg-data-css-error-status';
export const CSS_ERROR_STATUS_RESOLVED_ATTRIBUTE =
  'bmg-data-css-error-status-resolved';
export const SLIDE_DIRECTION_ATTRIBUTE = 'bmg-data-slide-direction';
export const CUSTOM_NEXT_SLIDE_IN_ATTRIBUTE = 'bmg-data-custom-next-slide-in';
export const CUSTOM_NEXT_SLIDE_OUT_ATTRIBUTE = 'bmg-data-custom-next-slide-out';
export const CUSTOM_PREV_SLIDE_IN_ATTRIBUTE = 'bmg-data-custom-prev-slide-in';
export const CUSTOM_PREV_SLIDE_OUT_ATTRIBUTE = 'bmg-data-custom-prev-slide-out';
export const CUSTOM_X_MULTIPLIER_ATTRIBUTE =
  'bmg-data-custom-x-percentage-multiplier';
export const CUSTOM_Y_MULTIPLIER_ATTRIBUTE =
  'bmg-data-custom-y-percentage-multiplier';
export const AUTO_RESIZE_TIME_MULTIPLIER_1_ATTRIBUTE =
  'bmg-data-auto-resize-time-multiplier-1';
export const AUTO_RESIZE_TIME_MULTIPLIER_2_ATTRIBUTE =
  'bmg-data-auto-resize-time-multiplier-2';
export const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_ATTRIBUTE =
  'bmg-data-success-auto-resize-time-multiplier-1';
export const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE =
  'bmg-data-success-auto-resize-time-multiplier-2';
export const MAX_SWIPE_SCREEN_SIZE_ATTRIBUTE = 'bmg-data-max-swipe-screen-size';
export const MIN_SWIPE_SCREEN_SIZE_ATTRIBUTE = 'bmg-data-min-swipe-screen-size';
export const SWIPE_TYPE_ANIMATION_ATTRIBUTE = 'bmg-data-swipe-type-animation';
export const SUBMIT_MS_TIME_1_ATTRIBUTE = 'bmg-data-submit-ms-time-1';
export const SUBMIT_MS_TIME_2_ATTRIBUTE = 'bmg-data-submit-ms-time-2';
export const SUBMIT_SHOW_ATTRIBUTE = 'bmg-data-submit-show';
export const SUBMIT_HIDE_ATTRIBUTE = 'bmg-data-submit-hide';
export const REDIRECT_MS_TIME_ATTRIBUTE = 'bmg-data-redirect-ms-time';
export const PROGRESS_BAR_ANIMATION_MS_TIME_ATTRIBUTE =
  'bmg-data-progress-bar-ms-time';
export const PROGRESS_BAR_AXIS_ATTRIBUTE = 'bmg-data-progress-bar-axis';
export const ANCHOR_MIN_SCREEN_SIZE_ATTRIBUTE =
  'bmg-data-anchor-min-screen-size';
export const ANCHOR_MAX_SCREEN_SIZE_ATTRIBUTE =
  'bmg-data-anchor-max-screen-size';
export const ANCHOR_ANIMATION_MS_TIME_ATTRIBUTE =
  'bmg-data-anchor-animation-ms-time';
export const ANCHOR_Y_OFF_SETSELECTOR_ATTRIBUTE =
  'bmg-data-anchor-y-offset-selector';
export const ANCHOR_RELATED_ELEMENT_TO_SCROLL_SELECTOR_ATTRIBUTE =
  'bmg-data-anchor-related-element-to-scroll-selector';
