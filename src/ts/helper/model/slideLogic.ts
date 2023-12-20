// Imports
import * as utils from './utils';
import * as controllerUtils from '../controller/utils';
import * as viewUtils from '../view/utils';
import * as attributeUtils from '../view/utilsAttributes';
import * as model from '../../model';

// Logic related
import slideType from './slideType';
import slideButtons from './slideButtons';
import swapSubmitButtons from '../view/swapSubmitButtons';
import * as config from '../../config';

// Error
const errPath = (n: string) => `${controllerUtils.errorName(n)} slideLogic.ts:`;

// Export
export default function (
  instanceName: string,
  modes: SFModesConfig,
  elements: StudioFormElements
) {
  // Values
  const slideLogic: StudioFormSlideLogic[] = [];

  // Overwrite with proxies
  const createReadMostlyProxy = model.createReadMostlyProxy;

  // Init loop
  for (let i = 0, n = elements.slides.length; i < n; i++) {
    // Elements
    const slide = elements.slides[i];

    // Guard
    if (!viewUtils.isElement(slide))
      throw new Error(
        `${errPath(instanceName)} Slide[${i}] is not a valid HTML element!`
      );

    // Swap submit buttons
    swapSubmitButtons(slide, modes);

    // * Define *
    const type = slideType(slide);
    const buttons = createReadMostlyProxy(
      slideButtons(type, slide, i, instanceName, elements.mask, n)
    ) as StudioFormButtonLogic[];
    const obj: StudioFormSlideLogic = {
      // Base
      get name() {
        return attributeUtils.getAttribute('name', slide);
      },
      index: i,
      element: slide,
      type: type,

      // Logic
      buttons: buttons.length ? buttons : false,

      get next() {
        return utils.returnLogicTo(instanceName, i, slide, n);
      },
    };

    // Push
    slideLogic.push(createReadMostlyProxy(obj) as StudioFormSlideLogic);
  }

  // Add to state
  return slideLogic;
}
