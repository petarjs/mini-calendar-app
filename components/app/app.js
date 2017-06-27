(function () {
  'use strict';

  /** @type {Object} Main app object */
  window.App = {
    start: start
  };

  /**
   * Starts the app
   * @param  {string|DOMElement}  mainElement Element in which to start the app
   * @param  {Object}             component   Main app component
   * @return {void}
   */
  function start(mainElement, component) {
    var that = this;

    if(!mainElement) {
      throw Error('Must provide mainElement');
    }

    if(!component) {
      throw Error('Must provide component');
    }

    this.$el = $(mainElement);
    render(this.$el, component.render());

    component.onChange(function() {
      render(that.$el, component.render());
    });
  }

  /**
   * Set the App's html
   * @param  {jQuery Object} $el
   * @param  {String} html 
   * @return {undefined}
   */
  function render($el, html) {
    $el.html(html);
  }

})(); 