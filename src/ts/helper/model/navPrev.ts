// Imports
import * as utils from './utils';
import * as viewUtils from '../view/utils';
import * as controllerUtils from '../controller/utils';
import * as model from '../../model';
import * as config from '../../config';

// Navigation
import navTo from './navTo';

// Error
const errPath = (i: StudioFormInstance) =>
  `${controllerUtils.errorName(i)} prev.ts:`;

// Export
export default async function (
  instance: StudioFormInstance,
  options: SFONav,
  internal = false
) {
  // Guard - Nav
  if (!utils.navGuard(instance, errPath, options)) return false;

  // Values
  const prevId = utils.currentSlideId(instance, 2) as number | undefined;

  // Guard
  if (prevId === undefined) {
    // Programmatically
    const msg = `${errPath(instance)} Can't navigate backwards any further!`;
    controllerUtils.warn(msg);
    return false;
  }

  // Navigate
  return await navTo(instance, prevId, options, internal);
}
