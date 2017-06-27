(function () {
  'use strict';

  var DEFAULTS = {}

  /** imports */
  var Renderable = window.mixins.Renderable;
  var Changeable = window.mixins.Changeable;
  var Precompileable = window.mixins.Precompileable;
  var EventList = window.EventList;
  var Timeline = window.Timeline;

  _.extend(Calendar.prototype, Renderable, Changeable, Precompileable);
  window.Calendar = Calendar;

  /**
   * Calendar component
   * @param {Array} opts.events Array of events to render
   */
  function Calendar(opts) {
    this.vm = _.merge({}, DEFAULTS, opts);

    this.vm.timeline   = new Timeline(_.pick(opts, ['startTime', 'endTime']));
    this.vm.eventList  = new EventList({
      events: opts.events,
      hoursCount: this.vm.timeline.getHoursCount()
    });

    this.vm.timeline.onChange(this.changed.bind(this));
    this.vm.eventList.onChange(this.changed.bind(this));

    this.precompileTemplate('#calendar-template');
  }

  /**
   * Sets Calendar's events and re-renders the component
   * @param {Array} events
   */
  Calendar.prototype.setEvents = function(events) {
    this.vm.eventList.setEvents(events);
  }

})(); 