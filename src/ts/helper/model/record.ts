// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import navTo from './navTo';
import animateProgress from '../view/animateProgress';
import animateCurrent from '../view/animateCurrent';

// Helper
// const errPath = (n: string) => `${controllerUtils.errorName(n)} record.ts:`;

// Export
export default function (data: ProxyWriteEventData) {
  // Values
  const instance = data.target as StudioFormInstance;
  const value = data.value;
  const maxVal = instance.logic.length - 1;
  const ghost = utils.returnGhost(instance);

  // + Test +

  // Check if value is an array
  if (!Array.isArray(value) || !value.length) return false;

  // Check if value contains only numbers
  if (value.some(v => typeof v !== 'number')) return false;

  // Check if the first value is greater than zero
  if (value[0] < 0) return false;

  // Check if every value is bigger than its previous value and not higher than maxVal
  for (let i = 1; i < value.length; i++)
    if (value[i] <= value[i - 1] || value[i] > maxVal) return false;

  // + Success +
  (async () => {
    // Navigate
    await navTo(
      instance,
      value[value.length - 1],
      { skipRequirements: true },
      false,
      false,
      true
    );

    // Write loop
    ghost.record.length = 0;
    value.forEach(n => ghost.record.push(n));

    // Progress bar
    animateProgress(instance);

    // Combo clases
    animateCurrent(instance, instance.data.animation.currentTime);
  })();

  // Return
  return false;
}
