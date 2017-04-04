import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { TeamData } from '../shared/collections.js';

import './main.html';

Session.set('showData', false)
Session.set('getNumber', true);

Template.main.helpers({
  getNumber: function() {
    return Session.get('getNumber');
  }
});

Template.data.helpers({
  rows: function () {
    var sort = {sort: {}};
    sort['sort'][Session.get('sort')] = Session.get('sortDirection');

    return TeamData.find({}, sort);
  }
});

Template.numberForm.events({
  'submit #numberForm': function(event) {
    event.preventDefault();

    var team = event.target[0].value;

    Session.set('team', team);
    Session.set('getNumber', false);
  }
});

Template.teamForm.onRendered(function() {
  var editData = Session.get('editData');

  if (editData.repeat != undefined || editData.time != undefined) {
    $('#climb-Check').attr('checked', true).change();
    if (editData.repeat != undefined) {
      console.log($('#repeat-Climb button[value=' + editData.repeat + ']'));
    }
  }
  if (editData.mechanism != undefined || editData.cycleTime != undefined) {
    $('#gears-Check').attr('checked', true).change();
  }
  if (editData.ballGoal != undefined || editData.accuracy != undefined || editData.speed != undefined) {
    $('#balls-Check').attr('checked', true).change();
  }
});

Template.teamForm.events({
  'change .ability-Check': function(event) {
    if (event.target.checked == true) {
      $('#' + event.target.getAttribute('data-show') + '-details').show();
    }
    else{
      $('#' + event.target.getAttribute('data-show') + '-details').hide();
    }
  },

  'click .button-group input[type=button]': function(event) {
    $(event.target).toggleClass('active');
  },

  'submit #teamForm': function(event) {
    event.preventDefault();

    var newData = {};

    // Climbing
    if ($('#climb-Check').is(':checked') == true) {
      // Repeatability
      var buttons = $('#repeat-Climb .active');
      newData['repeat'] = buttonsToString(buttons);

      // Time
      var buttons = $('#time-Climb .active');
      newData['time'] = buttonsToString(buttons);
    }

    // Gears
    if ($('#gears-Check').is(":checked") == true) {
      // Mechanism
      var buttons = $('#mech-Gears .active');
      newData['mechanism'] = buttonsToString(buttons);

      // Cycle time
      var buttons = $('#cycle-Gears .active');
      newData['cycleTime'] = buttonsToString(buttons);
    }

    // Balls
    if ($('#balls-Check').is(":checked") == true) {
      // Goal
      var buttons = $('#goal-Balls .active');
      newData['ballGoal'] = buttonsToString(buttons);

      // Accuracy
      var buttons = $('#accuracy-Balls .active');
      newData['accuracy'] = buttonsToString(buttons);

      // Speed
      var buttons = $('#speed-Balls .active');
      newData['speed'] = buttonsToString(buttons);
    }

    // Notes
    newData['notes'] = $('#notes').val();

    // Date
    newData['createdAt'] = new Date();

    // Team #
    newData['team'] = Session.get('team');

    // Add data
    TeamData.insert(newData);

    // Reset form
    Session.set('getNumber', true);
  }
});

Template.data.events({
  'click #data thead th': function(event) {
    var sortElement = $(event.target);

    Session.set('sort', sortElement.attr('data-sort'));
    Session.set('sortDirection', sortElement.attr('data-sort-direction'));

    sortElement.attr('data-sort-direction', -1 * sortElement.attr('data-sort-direction'));
  },

  'click #data button': function(event) {
    Session.set('getNumber', false);
    Router.go('/');

    Session.set('editData', this);
  }
});

Template.body.events({
  'click .nav-button': function(event) {
    var href = event.target.getAttribute('data-link');
    if (href == '/') {
      Session.set('getNumber', true);
    }
    Router.go(href);
  }
});

function buttonsToString(buttons) {
  var string = '';
  for (let i = 0; i < buttons.length; ++i) {
    string += $(buttons[i]).val();

    if (i + 1 != buttons.length) {
      string += ' - ';
    }
  }

  return string;
}
