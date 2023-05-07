// + Imports +
import * as config from '../../../config.js';

// + Exports +

// - - Initialize Quizmode - -
export default function (stateData) {
  // Values
  const $formBlock = stateData.elements.$formBlock,
    { styles } = stateData;

  // Local elements
  let success = $formBlock[0].querySelector(config.W_SUCCESS_SELECTOR),
    results = success.querySelectorAll(config.QUIZ_RESULT_SELECTOR);

  // Styles
  let redirectMsTime = styles['redirectMsTime'];

  // Run only if active
  if (results.length > 0) {
    console.log(results);

    // Vars & elements
    let defaultResult = results[0],
      defaultUrl = defaultResult.getAttribute(config.REDIRECT_URL_ATTRIBUTE);

    // Url redirect logic
    if (defaultUrl != undefined) {
      setTimeout(() => {
        // Updated values
        defaultUrl = defaultResult.getAttribute(config.REDIRECT_URL_ATTRIBUTE);

        // Action
        location.assign(defaultUrl);
      }, redirectMsTime);

      return;
    }

    /*
        // Elements & vars
        let $defaultResult = $success.find(`[${ quizPathAttribute } = "default"]`).add( $results ).eq(0),
            defaultUrl = $defaultResult.attr('redirectUrlAttribute')

        console.log($success, $defaultResult, defaultUrl)

        // Url redirect logic
        if ( defaultUrl != undefined )
        {
            setTimeout(() => 
            {
                // Updated values
                defaultUrl = $defaultResult.attr('redirectUrlAttribute')

                // Action
                location.assign(defaultUrl)
            }, redirectMsTime)
            
            return
        } */

    // Local variables
    let hasNested, isUrl, hasUrlTimeElement;

    // $success.find(`[${ quizPathAttribute } = "default"]`)

    // Continues logic. TODO:
    console.log(
      'Todo: Set up quiz mode funcitonality. Url functionality, nested forms, etc.'
    ); // Control quizmode functionality.
  }
}
