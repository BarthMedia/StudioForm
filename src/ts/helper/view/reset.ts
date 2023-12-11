// Imports
import * as utils from './utils';
import * as model from '../../model';
import * as config from '../../config';

// Nav
import navTo from '../model/navTo';

// Export
export default async function (
  instance: StudioFormInstance,
  internal = false,
  identifier: null | number | StudioFormSpreadElements,
  options: SFONav | StudioFormSpreadElements = {},
  ...elements: StudioFormSpreadElements
) {
  // Fire event
  const event = utils.dispatchEvent(instance, 'reset', internal, true);

  // Guard
  if (event.defaultPrevented) return true;

  console.log('Build this out!', internal, 'build out: ', elements);

  console.log('this + suggest has to be built!');

  // Elements
  const mask = instance.elements.mask;

  // Logic
  if (mask instanceof HTMLFormElement) mask.reset();
  console.log(
    'Respect elements, as it should allow you to reset individual elements like upload inputs (the rest alreay works!) and checkboxes'
  );
  console.log('reset checkboxes - without click', ' - reset file uploads!');

  console.log('only do full mask reset and ');

  console.log(
    'loop through all inputs',
    'reset checkboxes and radios and remove combo classes',
    'file inputs. remove attributes, name and combo classes, set default text as attribute? sf-default?'
  );

  // Null guard
  if (typeof identifier !== 'number') return true;

  // Await
  const isOptions = typeof options === 'object';
  return await navTo(instance, identifier, isOptions ? options : {}, internal);
}
