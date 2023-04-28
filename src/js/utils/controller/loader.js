// + Imports +
import {
  TYPEOF_GSAP_DEPENDENCY,
  TYPEOF_GSAP_SCROLL_TO_DEPENDENCY,
  TYPEOF_HAMMER_JS_DEPENDENCY,
  TYPEOF_XANO_SDK_DEPENDENCY,
} from '../../config';

// + Load helper +

// Allows for loading other scripts
jQuery.loadScript = function (url, callback) {
  jQuery.ajax({
    url: url,
    dataType: 'script',
    success: callback,
    async: true,
  });
};

// + Exports +

// Loader
export default function (handler) {
  'undefined' == TYPEOF_GSAP_DEPENDENCY
    ? $.loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
        function () {
          load2ndScript();
        }
      )
    : load2ndScript();

  function load2ndScript() {
    'undefined' == TYPEOF_GSAP_SCROLL_TO_DEPENDENCY
      ? $.loadScript(
          'https://cdn.jsdelivr.net/gh/BarthMedia/js@main/ScrollToPlugin.min.js',
          function () {
            load3rdScript();
          }
        )
      : load3rdScript();
  }

  function load3rdScript() {
    'undefined' == TYPEOF_HAMMER_JS_DEPENDENCY
      ? $.loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js',
          function () {
            load4thScript();
          }
        )
      : load4thScript();
  }

  function load4thScript() {
    'undefined' == TYPEOF_XANO_SDK_DEPENDENCY
      ? $.loadScript(
          'https://cdn.jsdelivr.net/npm/@xano/js-sdk@latest/dist/xano.min.js',
          function () {
            handler();
          }
        )
      : handler();
  }
}
