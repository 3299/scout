Router.route('/', function () {
  this.render('numberForm');
});

Router.route('/data', function () {
  this.render('data');
});

Router.route('/whiteboard', function () {
  this.render('whiteboard');
});

Router.route('/team/:team', function () {
  this.render('teamForm', {team: this.params.team});
});
