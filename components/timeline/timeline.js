(function () {
  'use strict';

  /** imports */
  var Renderable = window.mixins.Renderable;
  var Changeable = window.mixins.Changeable;
  var Precompileable = window.mixins.Precompileable;
  var DateHelpers = window.services.DateHelpers;

  var DEFAULTS = {
    startTime: DateHelpers.startOfHour(9),
    endTime: DateHelpers.startOfHour(21),
    interval: 30
  };

  _.extend(Timeline.prototype, Renderable, Changeable, Precompileable);
  window.Timeline = Timeline;

  /**
   * Timeline component
   * @param {Moment} opts.startTime  Start time
   * @param {Moment} opts.endTime    End time
   * @param {Moment} opts.interval   Interval in minutes
   */
  function Timeline(opts) {
    this.vm = _.merge({}, DEFAULTS, opts);

    this.vm.hoursCount = DateHelpers.getHoursBetween(this.vm.startTime, this.vm.endTime);
    this.vm.ticksCount = Math.floor(this.vm.hoursCount * 60 / this.vm.interval);
    this.vm.ticks = _.times(this.vm.ticksCount);

    if(opts.startTime) {
      this.vm.startTime = DateHelpers.startOfHour(opts.startTime);
    }

    if(opts.endTime) {
      this.vm.endTime = DateHelpers.startOfHour(opts.endTime);
    }

    this.precompileTemplate('#timeline-template');
  }

  Timeline.prototype.getHoursCount = function () {
    return this.vm.hoursCount;
  }
})();