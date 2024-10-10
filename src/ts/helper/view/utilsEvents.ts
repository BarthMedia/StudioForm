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

// Dispatch events
export function dispatchEvent(
  instanceName: string | StudioFormInstance,
  eventName: string,
  internal = false,
  cancelable = false,
  detail?: unknown
) {
  // Values
  const instanceNameNew =
    typeof instanceName === 'string' ? instanceName : instanceName.name;
  const instance = model.state.instances[instanceNameNew];

  // Values
  const mask = instance.elements.mask;
  const payload: { [name: string]: any } =
    detail && typeof detail === 'object' ? detail : {};
  payload.instance = instance;
  if (typeof payload.next == 'number')
    payload.nextName = instance.logic[payload.next].name;
  if (typeof payload.current == 'number')
    payload.currentName = instance.logic[payload.current].name;
  const globalConfig = model.state.api['config'];

  // Event
  const event = new CustomEvent(
    globalConfig.eventPrefix +
      eventName +
      (internal ? '' : globalConfig.externalEventSuffix),
    {
      bubbles: globalConfig.eventBubbles,
      cancelable: cancelable,
      detail: payload,
    }
  );

  // Dispatch
  mask.dispatchEvent(event);

  // Return
  return event;
}
