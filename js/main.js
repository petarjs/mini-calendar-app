var testEvents = [
  { start: 30, end: 150 },
  { start: 540, end: 600 },
  { start: 560, end: 620 },
  { start: 610, end: 670 }
];

var calendar = new Calendar({
  events: testEvents
});

App.start('.app', calendar);

window.layOutDay = function(events) {
  calendar.setEvents(events);
}