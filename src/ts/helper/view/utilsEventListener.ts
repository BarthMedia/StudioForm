// + Imports +

// Custom
import * as config from '../../config';
import * as model from '../../model';
import * as modelUtils from '../model/utils';

// + Exports +

// Get smw attribute
export function addEventListener(
  instance: StudioFormInstance,
  element: HTMLElement | Document | (Window & typeof globalThis),
  eventName: string,
  callback: (event?: Event) => void
) {
  // Values
  const ghost = modelUtils.returnGhost(instance);

  // Listener
  element.addEventListener(eventName, callback);

  // Push events
  ghost.events.push([element, eventName, callback]);
}
