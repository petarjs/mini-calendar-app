(function () {
  'use strict';

  window.mixins = window.mixins || {};
  
  window.mixins.Renderable = {
    render: render
  };

  /**
   * Render the component
   * @return {String} Component's html
   */
  function render() {
    return this.template({ vm: this.vm });
  }
})();