// + Imports +
import {
  AUTO_DELETE_CONDITIONALLY_INVISIBLE_ITEMS_ATTRIBUTE,
  W_CONDITION_INVISIBLE_SELECTOR,
} from '../../config';

// + Exports +

// - - Remove webflow invisible steps / items / elements - -
export default function ($formBlock) {
  if (
    $formBlock.attr(AUTO_DELETE_CONDITIONALLY_INVISIBLE_ITEMS_ATTRIBUTE) !=
    'false'
  )
    $formBlock.find(W_CONDITION_INVISIBLE_SELECTOR).remove();
}
