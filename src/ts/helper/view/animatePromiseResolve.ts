// Imports
import * as utils from './utils';
import * as config from '../../config';

// Export active / inactive
export default async function (instance: StudioFormInstance, internal = false) {
  // Values
  const slide = instance.logic[instance.record[instance.record.length - 1]];

  // Dispatch event
  utils.dispatchEvent(
    instance.name,
    'promise' + (internal ? '' : '-api'),
    true,
    {
      slide: slide,
    }
  );

  // Apply styles
  console.log('apply styles to slide', 'unless event is .defaultPrevented');

  console.log(
    'Have a one time event listener',
    'All events have to be able to be properly garbage collected?',
    "Maybe sort's itself",
    'But probably garbage collection is very important'
  );
}

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
