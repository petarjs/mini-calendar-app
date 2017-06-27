(function () {
  'use strict';

  window.mixins = window.mixins || {};
  
  window.mixins.Changeable = {
    onChange: onChange,
    changed: changed
  };

  function onChange(callback) {
    this.onChangeCallback = callback;
  }

  function changed() {
    this.onChangeCallback && this.onChangeCallback();
  }
})(); 