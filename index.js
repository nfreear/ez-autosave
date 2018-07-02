/*!
  Ez-autosave | © 2018 Nick Freear | License: MIT.
*/

(function (W, path, storage, $) {
  'use strict';

  var defaults = {
    selector: '.autosave[ id ]',
    interval: 2000,
    debug: false
  };

  var options = JSON.parse($('script[ data-ez-autosave ]').attr('data-ez-autosave') || '{}');

  var CFG = $.extend(defaults, options);
  var log = CFG.debug ? console.warn : function () {};

  log('autosave, CFG:', CFG, $.fn.jquery);

  var $fields = $(CFG.selector);

  log('autosave, fields:', $fields);

  setDate();
  restore();
  start();

  function setDate () {
    var hash = W.btoa(path).substr(0, 10);

    storage.setItem(CFG.selector + ':' + path + '#' + hash + '-date', new Date());
  }

  function restore () {
    $fields.each(function (idx, el) {
      var value = storage.getItem(key(el));
      if (value) {
        $(el).val(value);

        log('autosave, restore', key(el), value);
      }
    });
  }

  var timer;

  function start () {
    timer = W.setInterval(function () {
      $fields.each(function (idx, el) {
        if ($(el).val()) {
          storage.setItem(key(el), $(el).val());

          log('autosave, save', $(el));
        }
      });

      log('autosave, ping');
    }, CFG.interval);

    log('autosave, start');
  }

  function key (elem) {
    return CFG.selector + ':' + path + '#' + $(elem)[ 0 ].id;
  }
})(window, window.location.pathname, window.localStorage, window.jQuery);
