Router.route('/', function () {
  this.render('main');
});

Router.route('/data', function () {
  this.render('data');
});

Router.route('/whiteboard', function () {
  this.render('whiteboard');
});
