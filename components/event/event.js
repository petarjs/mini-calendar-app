(function () {
  'use strict';

  var DEFAULTS = {
    start: null,
    end: null,
    title: null,
    location: null
  };

  /** imports */
  var Renderable = window.mixins.Renderable;
  var Changeable = window.mixins.Changeable;
  var Precompileable = window.mixins.Precompileable;

  _.extend(Event.prototype, Renderable, Changeable, Precompileable);
  window.Event = Event;

  /**
   * Event component
   * @param {Object} opts
   */
  function Event(opts) {
    if(!opts.start || !opts.end) {
      throw Error('Event Component - Missing start or end time');
    }

    this.vm = _.merge({}, DEFAULTS, opts);

    this.precompileTemplate('#event-template');
  }

  /**
   * Creates an instance of the component
   * @param  {Object} opts
   * @return {Object}
   */
  Event.create = function (opts) {
    return new Event(opts);
  };

})();