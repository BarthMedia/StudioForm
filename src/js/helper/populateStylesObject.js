// + Imports +
import * as config from '../config.js';
import { getJsonAttrVals } from '../helper.js';

// + Exports +

// - - Populate styles object - -
export default function ($element) {
  // Initial varaible
  const styles = {
    animationMsTime: parseFloat(
      $element.attr(config.ANIMATION_MS_TIME_ATTRIBUTE) ||
        config.ANIMATION_MS_TIME_DEFAULT
    ),
    equalHeightTransitionSpeedMultiplier: parseFloat(
      $element.attr(
        config.EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_ATTRIBUTE
      ) || config.EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_DEFAULT
    ),
    cssShow: getJsonAttrVals(
      $element,
      config.CSS_SHOW_ATTRIBUTE,
      config.CSS_SHOW_DEFAULT
    ),
    cssHide: getJsonAttrVals(
      $element,
      config.CSS_HIDE_ATTRIBUTE,
      config.CSS_HIDE_DEFAULT
    ),
    cssActive: getJsonAttrVals(
      $element,
      config.CSS_ACTIVE_ATTRIBUTE,
      config.CSS_ACTIVE_DEFAULT
    ),
    cssInactive: getJsonAttrVals(
      $element,
      config.CSS_INACTIVE_ATTRIBUTE,
      config.CSS_INACTIVE_DEFAULT
    ),
    cssBackForthActive: getJsonAttrVals(
      $element,
      config.CSS_BACK_FORTH_ACTIVE_ATTRIBUTE,
      config.CSS_BACK_FORTH_ACTIVE_DEFAULT
    ),
    cssBackForthInactive: getJsonAttrVals(
      $element,
      config.CSS_BACK_FORTH_INACTIVE_ATTRIBUTE,
      config.CSS_BACK_FORTH_INACTIVE_DEFAULT
    ),
    errorColor:
      $element.attr(config.ERROR_COLOR_ATTRIBUTE) || config.ERROR_COLOR_DEFAULT,
    slideDirection:
      $element.attr(config.SLIDE_DIRECTION_ATTRIBUTE) ||
      config.SLIDE_DIRECTION_DEFAULT,
    customNextSlideIn: getJsonAttrVals(
      $element,
      config.CUSTOM_NEXT_SLIDE_IN_ATTRIBUTE,
      config.CUSTOM_NEXT_SLIDE_IN_DEFAULT
    ),
    customNextSlideOut: getJsonAttrVals(
      $element,
      config.CUSTOM_NEXT_SLIDE_OUT_ATTRIBUTE,
      config.CUSTOM_NEXT_SLIDE_OUT_DEFAULT
    ),
    customPrevSlideIn: getJsonAttrVals(
      $element,
      config.CUSTOM_PREV_SLIDE_IN_ATTRIBUTE,
      config.CUSTOM_PREV_SLIDE_IN_DEFAULT
    ),
    customPrevSlideOut: getJsonAttrVals(
      $element,
      config.CUSTOM_PREV_SLIDE_OUT_ATTRIBUTE,
      config.CUSTOM_PREV_SLIDE_OUT_DEFAULT
    ),
    customXMultiplier: parseFloat(
      $element.attr(config.CUSTOM_X_MULTIPLIER_ATTRIBUTE) ||
        config.CUSTOM_X_MULTIPLIER_DEFAULT
    ),
    customYMultiplier: parseFloat(
      $element.attr(config.CUSTOM_Y_MULTIPLIER_ATTRIBUTE) ||
        config.CUSTOM_Y_MULTIPLIER_DEFAULT
    ),
    autoResizeTimeMultiplier1: parseFloat(
      $element.attr(config.AUTO_RESIZE_TIME_MULTIPLIER_1_ATTRIBUTE) ||
        config.AUTO_RESIZE_TIME_MULTIPLIER_1_DEFAULT
    ),
    autoResizeTimeMultiplier2: parseFloat(
      $element.attr(config.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE) ||
        config.AUTO_RESIZE_TIME_MULTIPLIER_2_DEFAULT
    ),
    autoResizeSuccessTimeMultiplier1: parseFloat(
      $element.attr(config.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_ATTRIBUTE) ||
        config.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_DEFAULT
    ),
    autoResizeSuccessTimeMultiplier2: parseFloat(
      $element.attr(config.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE) ||
        config.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_DEFAULT
    ),
    maxSwipeScreenSize: parseInt(
      $element.attr(config.MAX_SWIPE_SCREEN_SIZE_ATTRIBUTE) ||
        config.MAX_SWIPE_SCREEN_SIZE_DEFAULT
    ),
    minSwipeScreenSize: parseInt(
      $element.attr(config.MIN_SWIPE_SCREEN_SIZE_ATTRIBUTE) ||
        config.MIN_SWIPE_SCREEN_SIZE_DEFAULT
    ),
    leftRightKeyEventInfinityAllowed:
      $element.attr(config.LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_ATTRIBUTE) ||
      config.LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_DEFAULT,
    redirectMsTime: parseFloat(
      $element.attr(config.REDIRECT_MS_TIME_ATTRIBUTE) ||
        config.REDIRECT_MS_TIME_DEFAULT
    ),
  };

  // Iterate over created object
  const cssShow = styles['cssShow'],
    cssHide = styles['cssHide'],
    cssBackForthActive = styles['cssBackForthActive'],
    cssBackForthInactive = styles['cssBackForthInactive'],
    cssActive = styles['cssActive'],
    cssInactive = styles['cssInactive'],
    customNextSlideIn = styles['customNextSlideIn'],
    customNextSlideOut = styles['customNextSlideOut'],
    customPrevSlideIn = styles['customPrevSlideIn'],
    customPrevSlideOut = styles['customPrevSlideOut'];

  // Format time ms time
  styles['animationSTime'] = styles['animationMsTime'] / 1000;

  // Set duration if not declared
  if (cssShow['duration'] == undefined) {
    cssShow['duration'] = styles['animationSTime'];
  }
  if (cssHide['duration'] == undefined) {
    cssHide['duration'] = styles['animationSTime'];
  }
  if (cssBackForthActive['duration'] == undefined) {
    cssBackForthActive['duration'] = styles['animationSTime'];
  }
  if (cssBackForthInactive['duration'] == undefined) {
    cssBackForthInactive['duration'] = styles['animationSTime'];
  }
  if (cssActive['duration'] == undefined) {
    cssActive['duration'] = styles['animationSTime'];
  }
  if (cssInactive['duration'] == undefined) {
    cssInactive['duration'] = styles['animationSTime'];
  }
  if (customNextSlideIn['duration'] == undefined) {
    customNextSlideIn['duration'] = styles['animationSTime'];
  }
  if (customNextSlideOut['duration'] == undefined) {
    customNextSlideOut['duration'] = styles['animationSTime'];
  }
  if (customPrevSlideIn['duration'] == undefined) {
    customPrevSlideIn['duration'] = styles['animationSTime'];
  }
  if (customPrevSlideOut['duration'] == undefined) {
    customPrevSlideOut['duration'] = styles['animationSTime'];
  }

  // Define submission time
  styles['submitMsTime1'] =
    parseFloat($element.attr(config.SUBMIT_MS_TIME_1_ATTRIBUTE)) ||
    styles['animationMsTime'];
  styles['submitMsTime2'] =
    parseFloat($element.attr(config.SUBMIT_MS_TIME_2_ATTRIBUTE)) ||
    styles['animationMsTime'];

  // Define submit animation type
  styles['submitHide'] = getJsonAttrVals(
    $element,
    config.SUBMIT_HIDE_ATTRIBUTE,
    cssHide
  );
  styles['submitShow'] = getJsonAttrVals(
    $element,
    config.SUBMIT_SHOW_ATTRIBUTE,
    {
      ...cssShow,
      duration: styles['animationSTime'] * 1.5,
    }
  );

  if (styles['submitHide']['duration'] == undefined) {
    styles['submitHide']['duration'] = styles['submitMsTime1'] / 1000;
  }
  if (styles['submitShow']['duration'] == undefined) {
    styles['submitShow']['duration'] = styles['submitMsTime2'] / 1000;
  }

  // Set css inactive
  styles['setCssInactive'] = getJsonAttrVals(
    $element,
    config.SET_CSS_INACTIVE_ATTRIBUTE,
    cssInactive
  );
  delete styles['setCssInactive'].duration;

  // Select / Deselect
  styles['cssSelect'] = getJsonAttrVals(
    $element,
    config.CSS_SELECT_ATTRIBUTE,
    cssActive
  );
  styles['cssDeselect'] = getJsonAttrVals(
    $element,
    config.CSS_DESELECT_ATTRIBUTE,
    cssInactive
  );

  // Error status CSS cssErrorStatusResolved
  styles['cssErrorStatus'] = getJsonAttrVals(
    $element,
    config.CSS_ERROR_STATUS_ATTRIBUTE,
    { duration: styles['animationSTime'] }
  );
  styles['cssErrorStatusResolved'] = getJsonAttrVals(
    $element,
    config.CSS_ERROR_STATUS_RESOLVED_ATTRIBUTE,
    { duration: styles['animationSTime'] }
  );

  if (styles['cssErrorStatus']['borderColor'] == undefined) {
    styles['cssErrorStatus']['borderColor'] = styles['errorColor'];
  }
  if (styles['cssErrorStatusResolved']['borderColor'] == undefined) {
    styles['cssErrorStatusResolved']['borderColor'] = '';
  }

  // Progress bar
  styles['progressBarAnimationSTime'] =
    parseFloat(
      $element.attr(config.PROGRESS_BAR_ANIMATION_MS_TIME_ATTRIBUTE) ||
        styles['animationMsTime']
    ) / 1000;
  styles['progressBarAxis'] =
    $element.attr(config.PROGRESS_BAR_AXIS_ATTRIBUTE) ||
    config.PROGRESS_BAR_AXIS_DEFAULT;

  // Anchor functionality
  styles['anchorAnimationSTime'] =
    parseFloat(
      $element.attr(config.ANCHOR_ANIMATION_MS_TIME_ATTRIBUTE) ||
        styles['animationMsTime']
    ) / 1000;

  // Return
  return styles;
}
