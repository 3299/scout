import { TeamData } from '/shared/collections.js';

Template.numberForm.events({
  'submit #numberForm': function(event) {
    event.preventDefault();

    var team = event.target[0].value;

    Router.go('/team/' + team);
  }
});

Template.teamForm.events({
  'click .ability-Button': function(event) {
    $(event.target).toggleClass('active');
    $('#' + event.target.getAttribute('data-show') + '-details').toggle();
  },

  'click .button-group input[type=button]': function(event) {
    $(event.target).toggleClass('active');
  },

  'submit #teamForm': function(event) {
    event.preventDefault();

    var newData = {};

    // Auto
    if ($('.button[data-show=auto]').hasClass('active')) {
      newData.auto = {};

      //Gears
      var buttons = $('#gear-Auto .active');
      newData.auto['gear'] = buttonsToArray(buttons);

      //Balls
      var buttons = $('#balls-Auto .active');
      newData.auto['balls'] = buttonsToArray(buttons);

      //Repeatability
      var buttons = $('#repeat-Auto .active');
      newData.auto['repeat'] = buttonsToArray(buttons);
    }

    // Climbing
    if ($('.button[data-show=climb]').hasClass('active')) {
      newData.climb = {};

      // Repeatability
      var buttons = $('#repeat-Climb .active');
      newData.climb['repeat'] = buttonsToArray(buttons);

      // Time
      var buttons = $('#time-Climb .active');
      newData.climb['time'] = buttonsToArray(buttons);
    }

    // Gears
    if ($('.button[data-show=gears]').hasClass('active')) {
      newData.gears = {};

      // Mechanism
      var buttons = $('#mechanism-Gears .active');
      newData.gears['mechanism'] = buttonsToArray(buttons);

      // Cycle time
      var buttons = $('#cycleTime-Gears .active');
      newData.gears['cycleTime'] = buttonsToArray(buttons);
    }

    // Balls
    if ($('.button[data-show=balls]').hasClass('active')) {
      newData.balls = {};

      // Goal
      var buttons = $('#goal-Balls .active');
      newData.balls['goal'] = buttonsToArray(buttons);

      // Accuracy
      var buttons = $('#accuracy-Balls .active');
      newData.balls['accuracy'] = buttonsToArray(buttons);

      // Speed
      var buttons = $('#speed-Balls .active');
      newData.balls['speed'] = buttonsToArray(buttons);
    }

    // Notes
    newData['notes'] = $('#notes').val();

    // Date
    newData['createdAt'] = new Date();

    // Team #
    newData['team'] = Number(Router.current().params.team);

    // Add data
    let existing = TeamData.findOne({team: newData['team']});

    if (existing != undefined) { // if document already exists
      // update it
      TeamData.update({_id: existing._id}, newData);
      return;
    }
    // else
    TeamData.insert(newData);
  }
});

Template.data.events({
  'click #data th': function(event) {
    var sortElement = $(event.target);
    Session.set('sort', sortElement.attr('data-sort'));

    // reverse sort direction when clicked second time
    if (Session.get('sortDirection') == undefined) {
      Session.set('sortDirection', 1);
    }
    Session.set('sortDirection', Session.get('sortDirection') * -1);
  },

  'click #data .delete-button': function(event) {
    TeamData.remove({_id: this._id});
  },

  'click .button-sort': function(event) {
    $('.data-container').toggle();
    $('.sort-container').toggle();
  },

  'click button[data-show]': function(event) {
    let prop = $(event.target).attr('data-show');

    if (Session.get(prop) == true) {
      Session.set(prop, false)
    }
    else {
      Session.set(prop, true)
    }
  }
});

Template.nav.events({
  'click .nav-button': function(event) {
    var href = event.target.getAttribute('data-link');
    if (href == '/') {
      Session.set('getNumber', true);
      Session.set('editId', undefined);
    }
    Router.go(href);
  }
});

function buttonsToArray(buttons) {
  var arr = [];
  for (let i = 0; i < buttons.length; ++i) {
    let currentValue = $(buttons[i]).attr('data-value');

    if (isNaN(Number(currentValue))) {
      arr.push(currentValue);
    }
    else {
      arr.push(Number(currentValue));
    }
  }

  return arr;
}
