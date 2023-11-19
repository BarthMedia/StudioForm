// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as config from '../../config';
import * as model from '../../model';

// Error path
const errPath = (n: string) =>
  `${controllerUtils.errorName(n)} animatePromiseResolve.ts:`;

// Export active / inactive
export default async function (instance: StudioFormInstance, internal = false) {
  // Guard
  if (instance.isAwaiting)
    throw new Error(
      `${errPath(instance.name)} There is already an active promise!`
    );

  // Values
  const awaitAttr = 'await';
  const ghost = model.state.ghostInstances[instance.name];
  const slide = instance.logic[instance.record[instance.record.length - 1]];
  function getElements() {
    // Values
    const internal = utils.createSelector(null, awaitAttr);
    const external = [
      `[${config.PRODUCT_NAME_SHORT}-${instance.name}="${awaitAttr}"]`,
      `[${config.PRODUCT_NAME_LONG}-${instance.name}="${awaitAttr}"]`,
    ];
    const elements: HTMLElement[] = [];

    // Select
    slide.element
      .querySelectorAll(internal)
      .forEach(el => elements.push(el as HTMLElement));
    document
      .querySelectorAll(external.join(','))
      .forEach(el => elements.push(el as HTMLElement));

    // Return
    return elements;
  }

  // Overwrite
  ghost.root.isAwaiting = true;

  console.log('elements', getElements());

  // Dispatch event
  utils.dispatchEvent(
    instance.name,
    'promise' + (internal ? '' : '-api'),
    true,
    {
      slide: slide,
    }
  );

  // Style children with class

  // Event listener
  instance.elements.mask.addEventListener('resolve', e => resolve(e), {
    once: true,
  });

  // Define function
  function resolve(e: Event) {
    // Do other stuff first
    console.log('I resolve stuff!', e);

    // Overwrite
    ghost.root.isAwaiting = false;

    // Return
    promisedResolve(e['detail']?.success);
  }

  // Promise
  let promisedResolve: (value: boolean) => void = () => {};
  async function asyncFunction(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      promisedResolve = resolve;
    });
  }

  console.log(
    'The submit / fetch call, shall actually run via this new promise / resolve architecture!'
  );

  console.log(
    'Standard promise only on submit, standard promise on move next, extra even promise on move back!'
  );

  // Values

  console.log(
    "Make sure event's listen on once",
    'they remove then self from the deliotion register when executed',
    'or get overwritten',
    'make sure to be awesome!'
  );

  // Apply styles
  console.log('apply styles to slide', 'unless event is .defaultPrevented');

  console.log(
    'Have a one time event listener',
    'All events have to be able to be properly garbage collected?',
    "Maybe sort's itself",
    'But probably garbage collection is very important'
  );

  // Notes

  console.log(
    "Make sure, the native event get's fired on the correct .to() operation",
    "make sure, that event next, prev, submit, to and their api version's have the apropriate defaultPrevented functionality!"
  );

  console.log(
    'buil this out next. Ecellent promise resolve',
    'based on currently active slide',
    'ghost instance pending state'
  );

  //
  console.log(
    'I have to built',
    "I'm the super cool promise resolve feature!",
    'When i am called, all the elements of the current slide:',
    'receive the sf-promise class.',
    'and no navigation action can be performed',
    "until the JS user set's resolve = true or false!",
    "resolve get's removed as soon as it is set, awesome proxy trigger",
    "resolve basically never get's to be really set!",
    'resolve only allows boolean!'
  );

  // ---

  // Usage
  return await asyncFunction();
}
