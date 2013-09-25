$(document).ready( function() {

  var View = function (el) {
    this.$el = el;

  }

  View.prototype.step = function() {
    // each game step
    // this.board.snake.move();

    var renderedBoard = this.board.render();
    this.$el.html(renderedBoard);
  }

  View.prototype.start = function () {
    this.board = new Sn.Board();
    // bind key events
    // setinterval for game step every 1/2 second
    this.step();
  }

  var v = new View($('pre'));
  v.start();
});