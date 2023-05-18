// + Imports +
import {
  TYPEOF_GSAP_DEPENDENCY,
  TYPEOF_GSAP_FLIP_DEPENDENCY,
  TYPEOF_GSAP_SCROLL_TO_DEPENDENCY,
  TYPEOF_HAMMER_JS_DEPENDENCY,
  // TYPEOF_XANO_SDK_DEPENDENCY,
} from '../../config';
import { scriptLoader } from '../../helper'; // + Load helper +

// + Exports +

// Loader
export default function (handler) {
  'undefined' == TYPEOF_GSAP_DEPENDENCY
    ? scriptLoader(
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
        load2ndScript
      )
    : load2ndScript();

  function load2ndScript() {
    'undefined' == TYPEOF_GSAP_SCROLL_TO_DEPENDENCY
      ? scriptLoader(
          'https://cdn.jsdelivr.net/gh/BarthMedia/js@main/ScrollToPlugin.min.js',
          load3rdScript
        )
      : load3rdScript();
  }

  function load3rdScript() {
    'undefined' == TYPEOF_GSAP_FLIP_DEPENDENCY
      ? scriptLoader(
          'https://cdn.jsdelivr.net/gh/BarthMedia/js@main/Flip.min.js',
          register
        )
      : load4thScript();
  }

  function register() {
    // - Register -
    gsap.registerPlugin(Flip);

    // Fire callback
    load4thScript();
  }

  function load4thScript() {
    'undefined' == TYPEOF_HAMMER_JS_DEPENDENCY
      ? scriptLoader(
          'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js',
          handler
        )
      : handler();
  }
}
