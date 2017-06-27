(function () {
  'use strict';
  
  window.services = window.services || {};

  window.services.DateHelpers = {
    getHoursBetween: getHoursBetween,
    startOfHour: startOfHour
  };

  /**
   * Returns the number of hours between two Moments
   * @param  {Moment} fromHour
   * @param  {Moment} toHour
   * @return {Number}
   */
  function getHoursBetween(fromHour, toHour) {
    return Math.abs(fromHour.hours() - toHour.hours());
  }

  /**
   * Returns Moment that start on a specific hour
   * @param  {Number} hour
   * @return {Moment}
   */
  function startOfHour(hour) {
    return moment().hour(hour).startOf('hour');
  }
})(); 