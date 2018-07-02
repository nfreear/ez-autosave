
(function (W, $, prefix) {
  $('*').each(function (idx, el) {
    $(this).attr({ id: prefix + idx });
  });
})(window, window.jQuery, 'uniq_id_');
