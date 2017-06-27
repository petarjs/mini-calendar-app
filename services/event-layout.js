(function () {
  'use strict';

  var EVENT_MAX_WIDTH = 600;

  window.services = window.services || {};

  window.services.EventLayout = {
    areOverlapping: areOverlapping,
    getEventWidth: getEventWidth,
    getEventIndex: getEventIndex,
    formatEvents: formatEvents
  };

  /**
   * Find out if two events are overlapping
   * @param  {Object} e1 Event 1
   * @param  {Object} e2 Event 2
   * @return {Boolean}
   */
  function areOverlapping(e1, e2) {
    if(e1 === e2) {
      return false;
    }

    return (startsAfter(e1, e2) && endsBefore(e1, e2)) || (startsAfter(e2, e1) && endsBefore(e2, e1));
  }

  /**
   * Does e2 start after e1?
   * @param  {Object} e1 Event 1
   * @param  {Object} e2 Event 2
   * @return {Boolean}
   */
  function startsAfter(e1, e2) {
    return e1.start <= e2.start;
  }

  /**
   * Does e1 end before e2?
   * @param  {Object} e1 Event 1
   * @param  {Object} e2 Event 2
   * @return {Boolean}
   */
  function endsBefore(e1, e2) {
    return e1.end >= e2.start;
  }

  /**
   * Calculates the width of an event in the calendar.
   * @param  {Object} event
   * @return {Number}
   */
  function getEventWidth(event) {
    var overlappingWith = _.map(event.overlapping, function(overlappingEvent) {
      return overlappingEvent.overlapping.length;
    });

    overlappingWith.push(event.overlapping.length);

    var leastOverlapping = _.min(overlappingWith);

    return EVENT_MAX_WIDTH / (leastOverlapping + 1);
  }

  /**
   * Figures out where should the event be in relation
   * to other events in the calendar.
   * @param  {Object} event
   * @return {Number}
   */
  function getEventIndex(event) {
    var availableIndices = _.times(event.overlapping.length + 1);
    var overlappingIndices = _.map(event.overlapping, function(overlappingEvent) {
      return overlappingEvent.index;
    });

    overlappingIndices = _.filter(overlappingIndices, function(ind) { return !_.isUndefined(ind); });

    if(!overlappingIndices.length) {
      return 0;
    }

    var freeIndices = _.difference(availableIndices, overlappingIndices);

    return _.first(freeIndices);
  }

  /**
   * Applies metadata to events needed to lay them in
   * the calendar and returns them.
   * @param  {Arrat} events
   * @return {Array}
   */
  function formatEvents(events) {
    var formattedEvents = _.clone(events);
    
    _.each(formattedEvents, function(event) {
      event.overlapping = _.filter(events, areOverlapping.bind(null, event));
    });

    _.each(formattedEvents, function(event) {
      event.eventWidth = getEventWidth(event);
      event.index = getEventIndex(event);
    });

    return formattedEvents;
  }
})(); 