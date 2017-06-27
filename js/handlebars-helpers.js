Handlebars.registerHelper('renderComponent', function(component) {
  return new Handlebars.SafeString(component.render());
});

Handlebars.registerHelper('timelineHour', function(index, ctx) {
  var hour = ctx.data.root.vm.startTime.hours() + Math.floor(index / 2);
  return new Handlebars.SafeString(moment().hours(hour).format('h [<small>]A[</small>]'));
});

Handlebars.registerHelper('timelineHourMinute', function(index, ctx) {
  var hour = ctx.data.root.vm.startTime.hours() + Math.floor((index - 1) / 2);
  return moment().hours(hour).minutes(ctx.data.root.vm.interval).format('h:m')
});

Handlebars.registerHelper('ifEven', function(conditional, options) {
  if((conditional % 2) == 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('getEventStyle', function(event, ctx) {
  var style = {
    transform: 'translateY(' + event.start + 'px) translateX(' + event.index * event.eventWidth + 'px)',
    height: (event.end - event.start) + 'px',
    width: event.eventWidth + 'px',
  };

  return _.map(style, function(value, rule) {
    return rule + ':' + value;
  }).join(';');
});
