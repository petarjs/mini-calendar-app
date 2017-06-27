(function () {
  'use strict';

  var DEFAULTS = {
    events: [],
    hoursCount: 12
  };

  /** imports */
  var Renderable = window.mixins.Renderable;
  var Changeable = window.mixins.Changeable;
  var Precompileable = window.mixins.Precompileable;
  var DateHelpers = window.services.DateHelpers;
  var EventLayout = window.services.EventLayout;
  var Event = window.Event;

  _.extend(EventList.prototype, Renderable, Changeable, Precompileable);
  window.EventList = EventList;

  /**
   * Event List component
   * @param {object} opts.events      List of events to display
   * @param {object} opts.hoursCount  How many hours in the day are we displaying
   */
  function EventList(opts) {
    this.vm = _.merge({}, DEFAULTS, opts);

    this.$eventList = $('<div>').addClass('event-list');
    this.vm.hours = _.times(this.vm.hoursCount);
    this.setEvents(this.vm.events);

    this.precompileTemplate('#event-list-template');
  }

  /**
   * Sets Event List's events and re-renders the component
   * @param {Array} events
   */
  EventList.prototype.setEvents = function(events) {
    var that = this;

    var formattedEvents = EventLayout.formatEvents(events);
    this.vm.events = _.map(formattedEvents, Event.create);
    _.each(this.vm.events, function(event) {
      event.onChange(that.changed.bind(that));
    });

    this.changed();
  }

})();