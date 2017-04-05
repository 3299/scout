import { TeamData } from '/shared/collections.js';
import { ReactiveDict } from 'meteor/reactive-dict';

Session.set('getNumber', true);

Template.teamForm.helpers({
  team: function() {
    return Router.current().params.team;
  }
});

Template.data.helpers({
  rows: function() {
    var sort = {sort: {}};
    sort['sort'][Session.get('sort')] = Session.get('sortDirection');

    return TeamData.find({}, sort);
  },

  isData: function() {
    return TeamData.findOne({});
  },

  showAuto: function() {
    return Session.get('showAuto');
  },

  showClimb: function() {
    return Session.get('showClimb');
  },

  showGears: function() {
    return Session.get('showGears');
  },

  showBalls: function() {
    return Session.get('showBalls');
  },
});
