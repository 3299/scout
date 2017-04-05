import { TeamData } from '/shared/collections.js';

/*-- Setup whiteboard on Canvas --*/
Template.whiteboard.onRendered(function() {
  $('#whiteboard').sketch({'defaultSize': 2});
});

/*-- When resuming/editing team data --*/
Template.teamForm.onRendered(function() {
  var team = Number(Router.current().params.team);

  if (!team) {
    Router.go('/');
  }

  // Template may render before server can be queried for document
  Tracker.autorun(function() {
    var thisData = TeamData.find({'team': team});

    if (thisData.count() == 0) {
      return;
    }

    thisData = thisData.fetch()[0];

    // Auto
    if (thisData.auto) {
      $('.button[data-show=auto]').click();

      activateButtons('-Auto input[type=button]', thisData.auto);
    }

    // Climb
    if (thisData.climb) {
      $('.button[data-show=climb]').click();

      activateButtons('-Climb input[type=button]', thisData.climb);
    }

    // Gears
    if (thisData.gears) {
      $('.button[data-show=gears]').click();

      activateButtons('-Gears input[type=button]', thisData.gears);
    }

    // Balls
    if (thisData.balls) {
      $('.button[data-show=balls]').click();

      activateButtons('-Balls input[type=button]', thisData.balls);
    }

    // Notes
    if (thisData.notes) {
      $('#notes').val(thisData.notes);
    }
  });
});

Template.data.onRendered(function() {
  $('#data').stacktable();
});

function activateButtons(selector, data) {
  for (prop in data) {
    var currentButtonGroup = $('#' + prop + selector);

    currentButtonGroup.each(function(element) {
      let currentValue = $(this).attr('data-value');

      // Convert string to number if it's not a word
      if (!isNaN(Number(currentValue))) {
        currentValue = Number(currentValue);
      }
      if (data[prop].indexOf(currentValue) != -1) {
        $(this).addClass('active');
      }
    });
  }
}
